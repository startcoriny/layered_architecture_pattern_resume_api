import { jest, test } from "@jest/globals";
import { AdminRepositories } from "../../../src/repositories/admin.repositories";

let mockPrisma = {
  resumes: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
};

let adminRepositories = new AdminRepositories(mockPrisma);

describe("Admin Repository Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // 관리자 조회
  test("findAllResumes Method", async () => {
    const createValue = {
      orderValue: "desc",
    };
    const mockReturn = "findMany String";
    mockPrisma.resumes.findMany.mockReturnValue(mockReturn);

    const resumes = await adminRepositories.findAllResumes(
      createValue.orderValue
    );
    expect(mockPrisma.resumes.findMany).toHaveBeenCalledTimes(1);
    expect(resumes).toBe(mockReturn);
  });

  // 이력서 상세조회
  test("getResumeById Method", async () => {
    const mockReturn = "getResumeById String";
    mockPrisma.resumes.findFirst.mockReturnValue(mockReturn);

    const resumes = await adminRepositories.getResumeById(1);

    expect(mockPrisma.resumes.findFirst).toHaveBeenCalledTimes(1);
    expect(resumes).toBe(mockReturn);
  });

  // 이력서 상태 업데이트
  test("updateResume Method", async () => {
    const mockReturn = "update String";
    mockPrisma.resumes.update.mockReturnValue(mockReturn);

    const updateValue = {
      resumeId: 1,
      status: "DROP",
    };

    const resumes = await adminRepositories.updateStatus(
      updateValue.resumeId,
      updateValue.status
    );

    expect(mockPrisma.resumes.update).toHaveBeenCalledTimes(1);
    expect(resumes).toBe(mockReturn);
  });
});
