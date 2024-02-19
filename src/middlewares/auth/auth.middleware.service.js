import jwt from "jsonwebtoken";
import { AuthRepository } from "./auth.middleware.repository.js";

export class AuthService {
  authRepository = new AuthRepository();

  checkAuth = async (accessToken, refreshToken) => {
    try {
      let resetAccess = accessToken;
      const refresh = await tokenCheck(refreshToken);

      const isExistToken = await this.authRepository.findToken(refresh);

      // refreshToken은 있지만 accessToken은 없을 경우
      if (isExistToken && !accessToken) {
        const decodedToken = jwt.verify(refresh, process.env.JWT_SECRET_KEY);
        const email = decodedToken.email;
        const user = await this.authRepository.getByUserId(email);
        accessToken = jwt.sign(
          {
            id: user.id,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "12h" }
        );

        // res.cookie("accessToken", `Bearer ${accessToken}`);
        resetAccess = `Bearer ${accessToken}`;
      }

      const access = tokenCheck(resetAccess);
      const decodedToken = jwt.verify(access, process.env.JWT_SECRET_KEY);
      const id = decodedToken.id;

      const authUser = await this.authRepository.authUser(id);

      return { authUser, resetAccess };
    } catch (err) {
      next(err);
    }
  };
}

function tokenCheck(tokenKind) {
  const [tokenType, token] = tokenKind.split(" ");
  if (tokenType !== "Bearer") throw new Error("토큰 타입이 일치하지 않습니다.");
  else return token;
}
