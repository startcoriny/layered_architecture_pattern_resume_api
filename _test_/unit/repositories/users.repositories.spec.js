import { jest } from "@jest/globals";
import { UsersRepositories } from "../../../src/repositories/users.repositories";

// mockPrisma라는 실제 DB를 Mocking하기 위한 Mock 객체를 생성
// jest.fn()은 특정 메서드를 Mocking하는 Mock Function(모의 함수)
let mockPrisma = {
  users: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

//  mockPrisma를 사용하여 의존성 주입
let usersRepositories = new UsersRepositories(mockPrisma);

// Jest에서 테스트 스위트(Test Suite)를 정의하는데 사용 (특정 기능 또는 모듈에 대한 관련된 테스트들의 집합)
// 즉, 테스트 스위트를 정의한뒤 그 안에 여러개의 테스트 케이스를 작성.
describe("Users Repository Unit Test", () => {
  // 테스트가 실행되기전에 실행되는 hook(훅)중 하나이며각 테스트 케이스가 실행되기 전에 실행되는 코드를 정의 할 떄 사용.
  /* jest.resetAllMocks()를 사용하여 초기화 하는 이유!! */
  // 테스트를 진행하다보면 Mock 함수를 여러 번 사용하게 되는데,
  // 각 테스트 케이스가 독립적으로 실행되어야 하기 때문에 이전 테스트에서 설정한 Mock 함수의 상태가 다음 테스트에 영향을 주지 않도록
  // 각 test가 실행되기 전에 실행하여 모든 Mock을 초기화 합니다..
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("findByEmail Method", async () => {
    const email = "aaa@naver.com";
    const mockReturn = "findByEmail success";

    // findFirst의 mock(가짜 객체)에 값을 지정해줍니다.
    mockPrisma.users.findFirst.mockReturnValue(mockReturn);

    const user = await usersRepositories.findByEmail(email);

    // 해당 메서드가 한번만 호출되었는지 확인하는 이유
    // 메서드가 예상대로 동작하는지 확인하기 위한 테스트의 한 부분이기 때문.
    expect(usersRepositories.prisma.users.findFirst).toHaveBeenCalledTimes(1);

    // mockPrisma의 Return과 출력된 findMany Method의 값이 일치하는지 비교합니다.
    expect(user).toBe(mockReturn);
  });

  test("createUser Method", async () => {
    const mockReturn = "create Return String";
    mockPrisma.users.create.mockReturnValue(mockReturn);

    const createUserParams = {
      email: "create email",
      password: "create hashedPassword",
      userName: "create userName",
    };

    const user = await usersRepositories.createUser(
      createUserParams.email,
      createUserParams.password,
      createUserParams.userName
    );

    expect(usersRepositories.prisma.users.create).toHaveBeenCalledTimes(1);

    expect(user).toBe(mockReturn);

    expect(mockPrisma.users.create).toHaveBeenCalledWith({
      data: createUserParams,
    });
  });

  test("updateToken Method", async () => {
    const mockReturn = "upload refreshToken";
    mockPrisma.users.update.mockReturnValue(mockReturn);

    // id와 토큰 생성및 인자로 넣기
    const createUserParams = {
      id: "create id",
      refreshToken: "create token",
    };

    const user = await usersRepositories.updateToken(
      createUserParams.id,
      createUserParams.refreshToken
    );

    expect(usersRepositories.prisma.users.update).toHaveBeenCalledTimes(1);

    expect(user).toBe(mockReturn);
  });
  test("findById Method", async () => {
    const id = "create id";
    const mockReturn = "findById success";

    mockPrisma.users.findFirst.mockReturnValue(mockReturn);

    const user = await usersRepositories.findById(id);

    expect(usersRepositories.prisma.users.findFirst).toHaveBeenCalledTimes(1);

    expect(user).toBe(mockReturn);
  });
});
