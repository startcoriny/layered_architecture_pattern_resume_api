import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UsersServices {
  // 레포지토리 생성자
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  // 회원가입
  createUser = async (email, password, userName) => {
    const isExistUser = await this.usersRepository.findByEmail(email);

    if (isExistUser) {
      throw new Error("이미 존재하는 이메일 입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.usersRepository.createUser(
      email,
      hashedPassword,
      userName
    );

    return {
      id: createdUser.id,
      email: createdUser.email,
      userName: createdUser.userName,
    };
  };

  // 로그인
  logInUser = async (email, password) => {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new Error("존재하지 않는 이메일 입니다.");
    } else if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    // 액세스토큰 생성
    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "12h" }
    );

    // 리프레시 토큰 생성
    const refreshToken = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "168h" }
    );

    // 리프레시토큰 저장
    await this.usersRepository.updateToken(user.id, refreshToken);

    return {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
      id: user.id,
      email: user.email,
      userName: user.userName,
      role: user.role,
    };
  };

  // 내 정보 조회
  getUserById = async (id) => {
    const user = await this.usersRepository.findById(id);
    return {
      id: user.id,
      email: user.email,
      userName: user.userName,
      role: user.role,
      token: user.token,
    };
  };
}
