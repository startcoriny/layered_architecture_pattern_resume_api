export class UsersRepositories {
  // 프리즈마 생성자 생성
  constructor(prisma) {
    this.prisma = prisma;
  }

  // 유저 찾기
  findByEmail = async (email) => {
    const findUser = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    return findUser;
  };

  // 유저 생성
  createUser = async (email, hashedPassword, userName) => {
    const createdUser = await this.prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        userName,
      },
    });
    return createdUser;
  };

  // 토큰 업로드
  updateToken = async (id, refreshToken) => {
    const token = await this.prisma.users.update({
      where: {
        id: id,
      },
      data: {
        token: refreshToken,
      },
    });
    return token;
  };

  findById = async (id) => {
    const user = await this.prisma.users.findFirst({
      where: { id: +id },
    });
    return user;
  };
}
