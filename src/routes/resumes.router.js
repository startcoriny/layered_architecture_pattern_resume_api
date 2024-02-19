import express from "express";
import { prisma } from "../utils/prisma/index.js";
import { ResumesController } from "../controllers/resumes.controller.js";
import { ResumesServices } from "../services/resumes.services.js";
import { ResumesRepositories } from "../repositories/resumes.repositories.js";
import { AuthController } from "../middlewares/auth/auth.middleware.controller.js";

const router = express.Router();

// 3계층의 의존성 주입
const resumesRepository = new ResumesRepositories(prisma);
const resumesService = new ResumesServices(resumesRepository);
const resumesController = new ResumesController(resumesService);
const authController = new AuthController();

// 이력서 생성
router.post("/", authController.authMiddleWare, resumesController.createResume);

// 이력서 전체조회
router.get("/", resumesController.getResumes);

// // 이력서 상세조회
// router.get("/:id", resumesController.getResumeById);

// // 이력서 수정
// router.patch(
//   "/:id",
//   authController.authMiddleWare,
//   resumesController.updateResume
// );

// // 이력서 삭제
// router.delete(
//   "/:id",
//   authController.authMiddleWare,
//   resumesController.deleteResume
// );

export default router;
