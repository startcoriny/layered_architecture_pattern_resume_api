import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
// import swaggerUi from "swagger-ui-express";
// import swaggerFile from "./swagger-output.json" assert { type: "json" };
import router from "./src/routes/index.js";
import LogMiddleware from "./src/middlewares/log.middleware.js";
import ErrorHandlingMiddleware from "./src/middlewares/error-handling.middleware.js";
import typeOrmConnection from "./src/utils/index.js";

dotenv.config();

const app = express();
const port = 3005;

app.get("/", (req, res) => {
  return res.status(200).json({ message: "안녕" });
});

app.use(LogMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
// app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(ErrorHandlingMiddleware);

app.listen(port, async () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
