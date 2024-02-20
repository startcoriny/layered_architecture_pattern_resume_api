import cookieParser from "cookie-parser";
import { beforeEach, describe, expect, jest } from "@jest/globals";
import { UsersController } from "../../../src/controllers/users.controller";
const mockUsersService = {
  createUser: jest.fn(),
  logInUser: jest.fn(),
  getUserById: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
  user: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  cookie: jest.fn(), // res.cookie를 스파이로 사용, 스파이는 메서드 호출 추적 및 호출에 대한 정보 제공
};

const mockNext = jest.fn();

const usersController = new UsersController(mockUsersService);

describe("Users Controller unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockResponse.status.mockReturnValue(mockResponse);
  });

  // 회원가입 테스트
  test("signUp Method by success", async () => {
    const createUserRequestBody = {
      email: "email_Success",
      password: "123456",
      passwordCheck: "123456",
      userName: "userName_Success",
    };

    mockRequest.body = createUserRequestBody;

    const createUserReturnValue = {
      id: 1,
      email: "email_Success",
      userName: "userName_Success",
    };

    mockUsersService.createUser.mockReturnValue(createUserReturnValue);

    await usersController.signUp(mockRequest, mockResponse, mockNext);

    expect(mockUsersService.createUser).toHaveBeenCalledWith(
      createUserRequestBody.email,
      createUserRequestBody.password,
      createUserRequestBody.userName
    );

    expect(mockUsersService.createUser).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: createUserReturnValue,
    });
  });

  // 로그인 테스트
  test("signIn Method success", async () => {
    const signInRequestBody = {
      email: "hong@naver.com",
      password: "123456",
    };
    mockRequest.body = signInRequestBody;

    const signInReturnValue = {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
      id: "8",
      email: "hong@naver.com",
      userName: "홍길동",
      role: "USER",
    };

    mockUsersService.logInUser.mockReturnValue(signInReturnValue);

    await usersController.signIn(mockRequest, mockResponse, mockNext);

    expect(mockUsersService.logInUser).toHaveBeenCalledTimes(1);
    expect(mockResponse.cookie).toHaveBeenCalled(); // 전달된 인수를 검증하여 올바른 쿠키 값이 설정되었는지를 확인
    expect(mockResponse.cookie).toHaveBeenCalledWith(
      "accessToken",
      signInReturnValue.accessToken
    );
    expect(mockResponse.cookie).toHaveBeenCalledWith(
      "refreshToken",
      signInReturnValue.refreshToken
    );
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: signInReturnValue,
    });
  });

  // 내정보 조회 테스트
  test("myInfo Method success", async () => {
    const myInfoRequestUser = {
      id: "1",
    };

    mockRequest.user = myInfoRequestUser;

    const MyInfoReturnValue = {
      id: "1",
      email: "hong@naver.com",
      userName: "홍길동",
      role: "USER",
      token: "CREATED TOKEN",
    };

    mockUsersService.getUserById.mockReturnValue(MyInfoReturnValue);

    await usersController.myInfo(mockRequest, mockResponse, mockNext);

    expect(mockUsersService.getUserById).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: MyInfoReturnValue,
    });
  });
});
