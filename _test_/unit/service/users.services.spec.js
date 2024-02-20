import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { UsersServices } from "../../../src/services/users.services";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// UsersRepositories를 대신하기 위한 가짜 객체 정의
let mockUsersRepository = {
  findByEmail: jest.fn(),
  createUser: jest.fn(),
  updateToken: jest.fn(),
  findById: jest.fn(),
};

// UserService의 repositories를 가짜 객체로 의존성 주입
let usersServices = new UsersServices(mockUsersRepository);

describe("User Service Unit test", () => {
  // 테스트 초기화
  beforeEach(() => {
    jest.resetAllMocks();
  });

  //회원가입 테스트
  test("createUser Method", async () => {
    const sampleUser = {
      id: 1,
      email: "hong@naver.com",
      userName: "홍길동",
    };

    // 실제코드에서 반환되는 return값에 맞춰야함.
    mockUsersRepository.createUser.mockReturnValue(sampleUser);

    const createdUser = await usersServices.createUser(
      "hong@naver.com",
      "1234",
      "홍길동"
    );

    // 해당하는 이메일이 있는지 확인
    expect(mockUsersRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(
      sampleUser.email
    );

    // 없다면 유저 생성
    expect(mockUsersRepository.createUser).toHaveBeenCalledTimes(1);
    expect(createdUser).toEqual(sampleUser);
  });

  // 로그인 테스트
  test("logInUser Method", async () => {
    const hashedPassword = await bcrypt.hash("123456", 10);
    //샘플데이터
    const sampleUser = {
      id: 1,
      email: "hong@naver.com",
      password: hashedPassword,
      userName: "홍길동",
      role: "USER",
    };
    // 샘플데이터 리턴값 저장
    mockUsersRepository.findByEmail.mockReturnValue(sampleUser);

    const user = await usersServices.logInUser("hong@naver.com", "123456");

    // 유저가 있는지 확인
    expect(mockUsersRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(mockUsersRepository.findByEmail).toBeCalledWith(sampleUser.email);

    // 데이터베이스에 토큰 업데이트
    expect(mockUsersRepository.updateToken).toHaveBeenCalledTimes(1);
    expect(mockUsersRepository.updateToken).toHaveReturned();

    // user가 정의되어있는지 확인
    expect(user).toBeDefined();
  });

  // 내정보 조회 테스트
  test("getUserById", async () => {
    const sampleUser = {
      id: "1",
      email: "hong@naver.com",
      userName: "홍길동",
      role: "USER",
      token: "created token",
    };
    mockUsersRepository.findById.mockReturnValue(sampleUser);

    const user = await usersServices.getUserById(1);

    expect(mockUsersRepository.findById).toBeCalledTimes(1);
    expect(user).toStrictEqual(sampleUser);
  });
});
