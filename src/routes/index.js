import express from "express";
import UserRouter from "./users.router.js";
// import ResumeRouter from "./resumes.router.js";
// import AdminRouter from "./admin.router.js";

const router = express.Router();

router.use("/users/", UserRouter);
// router.use("/resumes/", ResumeRouter);
// router.use("/admin/", AdminRouter);

export default router;
