import express from "express";
import { prisma } from "../utils/prisma/index.js";
import { UsersController } from "../controllers/users.controller.js";
import { UsersServices } from "../services/users.services.js";
import { UsersRepositories } from "../repositories/users.repositories.js";
import { AuthController } from "../middlewares/auth/auth.middleware.controller.js";

const router = express.Router();

// 3계층의 의존성을 모두 주입합니다.
const usersRepository = new UsersRepositories(prisma);
const usersService = new UsersServices(usersRepository);
const usersController = new UsersController(usersService);

// AuthController인스턴스 생성.
const authController = new AuthController();

// 회원가입
router.post("/sign-up", usersController.signUp);

// 로그인
router.post("/sign-in", usersController.signIn);

// 내정보 조회
router.get("/myInfo", authController.authMiddleWare, usersController.myInfo);

export default router;
