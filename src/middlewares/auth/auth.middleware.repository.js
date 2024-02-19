import { prisma } from "../../utils/prisma/index.js";
export class AuthRepository {
  // 토큰 찾기
  findToken = async (refresh) => {
    const token = await prisma.users.findFirst({
      where: {
        token: refresh,
      },
    });

    return token;
  };

  // 유저id가져오기
  getByUserId = async (email) => {
    const userId = await prisma.users.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });
    return userId;
  };

  // 유저 찾기
  authUser = async (id) => {
    const user = await prisma.users.findFirst({
      where: { id: +id },
    });
    return user;
  };
}
