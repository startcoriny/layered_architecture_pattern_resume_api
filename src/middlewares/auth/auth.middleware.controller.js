import { AuthService } from "./auth.middleware.service.js";

export class AuthController {
  authService = new AuthService();

  authMiddleWare = async (req, res, next) => {
    try {
      // req.cookies에서 토큰 받아오기
      let { accessToken, refreshToken } = req.cookies;

      // refreshToken없으면 에러던짐
      if (!refreshToken) {
        throw new Error("토큰이 존재하지 않습니다.");
      }

      // 서비스로 데이터 담아서 보내기
      const authUser = await this.authService.checkAuth(
        accessToken,
        refreshToken
      );

      // 인증유저 정보가 없으면 토큰지우고 에러반환.
      if (!authUser.authUser) {
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");
        throw new Error("토큰 사용자가 존재하지 않습니다.");
      }

      // 정보가 있으면 req.user에 담고 next진행
      // accessToken도 쿠키에 담아주기
      res.cookie("accessToken", authUser.resetAccess);
      req.user = authUser.authUser;

      console.log("인증미들웨어 인증끝남!");
      next();
    } catch (err) {
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");

      switch (err.name) {
        case "TokenExpiredError":
          throw new Error("토큰이 만료되었습니다. 다시 로그인 해주세요.");

        case "JsonWebTokenError":
          throw new Error("토큰이 조작되었습니다.");

        default:
          throw new Error("비정상적인 요청입니다.");
      }
    }
  };
}
