import express from "express";
import { prisma } from "../utils/prisma/index.js";
import { AdminController } from "../controllers/admin.controller.js";
import { AdminServices } from "../services/admin.services.js";
import { AdminRepositories } from "../repositories/admin.repositories.js";
import { AuthController } from "../middlewares/auth/auth.middleware.controller.js";

const router = express.Router();

// 3계층의 의존성을 모두 주입합니다.
const adminRepository = new AdminRepositories(prisma);
const adminService = new AdminServices(adminRepository);
const adminController = new AdminController(adminService);
const authController = new AuthController();

/*
관리자 정보
관리자 이메일 : 0000
관리자 비밀번호 : 121212
*/

// 관리자 이력서 조회
router.get(
  "/resumes",
  authController.authMiddleWare,
  adminController.getResumes
);

// 관리자 수정
router.patch(
  "/resumes/:resumeId",
  authController.authMiddleWare,
  adminController.updateResume
);

export default router;
