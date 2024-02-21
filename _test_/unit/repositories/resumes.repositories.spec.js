import { expect, jest, test } from "@jest/globals";
import { ResumesRepositories } from "../../../src/repositories/resumes.repositories";

let mockPrisma = {
  resumes: {
    create: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

let resumesRepositories = new ResumesRepositories(mockPrisma);

describe("Resumes Repository Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // 이력서 생성
  test("createResume Method", async () => {
    const createValue = {
      user_id: 9,
      title: "나는 세종대왕",
      context: "가갸거겨고교구규그기",
    };

    const mockReturn = "createResume success";
    mockPrisma.resumes.create.mockReturnValue(mockReturn);

    const resume = await resumesRepositories.createResume(
      createValue.user_id,
      createValue.title,
      createValue.context
    );

    expect(mockPrisma.resumes.create).toHaveBeenCalledTimes(1);

    expect(resume).toBe(mockReturn);
    expect(mockPrisma.resumes.create).toHaveBeenCalledWith({
      data: createValue,
    });
  });

  // 이력서 전체조회
  test("findAllResumes Method", async () => {
    const mockReturn = "findMany String";
    mockPrisma.resumes.findMany.mockReturnValue(mockReturn);

    const resumes = await resumesRepositories.findAllResumes();

    expect(mockPrisma.resumes.findMany).toHaveBeenCalledTimes(1);
    expect(resumes).toBe(mockReturn);
  });

  // 이력서 상세조회
  test("getResumeById Method", async () => {
    const mockReturn = "findFirst String";
    mockPrisma.resumes.findFirst.mockReturnValue(mockReturn);

    const resumes = await resumesRepositories.getResumeById(1);

    expect(mockPrisma.resumes.findFirst).toHaveBeenCalledTimes(1);
    expect(resumes).toBe(mockReturn);
  });

  // 이력서 업데이트
  test("updateResume Method", async () => {
    const mockReturn = "update String";
    mockPrisma.resumes.update.mockReturnValue(mockReturn);

    const updateValue = {
      resumeId: 1,
      title: "update title",
      context: "update context",
      status: "USER",
    };

    const resumes = await resumesRepositories.updateResume(
      updateValue.resumeId,
      updateValue.title,
      updateValue.context,
      updateValue.status
    );

    expect(mockPrisma.resumes.update).toHaveBeenCalledTimes(1);
    expect(resumes).toBe(mockReturn);
  });

  // 이력서 삭제
  test("deleteResume Method", async () => {
    const mockReturn = "delete String";
    mockPrisma.resumes.delete.mockReturnValue(mockReturn);

    const resumes = await resumesRepositories.deleteResume(1);

    expect(mockPrisma.resumes.delete).toHaveBeenCalledTimes(1);
    expect(resumes).toBe(mockReturn);
  });
});
