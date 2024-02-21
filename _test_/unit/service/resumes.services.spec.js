import { beforeEach, describe, expect, jest } from "@jest/globals";
import { ResumesServices } from "../../../src/services/resumes.services";

const mockRepository = {
  createResume: jest.fn(),
  findAllResumes: jest.fn(),
  getResumeById: jest.fn(),
  updateResume: jest.fn(),
  deleteResume: jest.fn(),
};

const resumesServices = new ResumesServices(mockRepository);

describe("Resumes Service Unit Test", () => {
  // mock 초기화
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // 이력서 생성
  test("createResume Method", async () => {
    const testReturnResume = {
      id: 4,
      user_id: 1,
      userName: "홍길동",
      title: "나는 홍길동",
      context: "동에번쩍 서에번쩍",
      status: "APPLY",
      createdAt: "2024-02-20T02:46:19.707Z",
    };

    mockRepository.createResume.mockReturnValue(testReturnResume);

    const createdResume = await resumesServices.createResume(
      1,
      "나는 홍길동",
      "동에번쩍 서에번쩍"
    );

    expect(mockRepository.createResume).toHaveBeenCalledTimes(1);
    expect(mockRepository.createResume).toHaveBeenCalledWith(
      testReturnResume.user_id,
      testReturnResume.title,
      testReturnResume.context
    );
    expect(createdResume).toStrictEqual(testReturnResume);
  });

  // 이력서 전체조회
  test("findAllResumes Method", async () => {
    const returnAllResumes = [
      {
        id: 1,
        user_id: 1,
        title: "이순신 vs 홍길동",
        status: "APPLY",
        createdAt: "2024-02-20T02:44:57.490Z",
      },
      {
        id: 2,
        user_id: 1,
        title: "이순신",
        status: "APPLY",
        createdAt: "2024-02-20T02:45:06.947Z",
      },
    ];

    mockRepository.findAllResumes.mockReturnValue(returnAllResumes);

    const allResume = await resumesServices.findAllResumes("user_id", "desc");

    expect(mockRepository.findAllResumes).toHaveBeenCalledTimes(1);
    expect(allResume).toEqual(returnAllResumes);
  });

  // 이력서 상세조회
  test("getResumeById", async () => {
    const returnIdResume = {
      id: 3,
      user_id: 1,
      userName: "홍길동",
      title: "내가바로 이순신",
      context: "짐에게는 12척의 배가 남아있다#@@@!@!@!",
      status: "APPLY",
      createdAt: "2024-02-20T02:45:23.189Z",
    };

    mockRepository.getResumeById.mockReturnValue(returnIdResume);

    const detailResume = await resumesServices.getResumeById(3);

    expect(mockRepository.getResumeById).toHaveBeenCalledTimes(1);
    expect(detailResume).toMatchObject(returnIdResume);
  });

  // 이력서 수정
  test("updateResume Method", async () => {
    const getResumeIdReturnValue = {
      id: 3,
      user_id: 1,
      userName: "홍길동",
      title: "내가바로 이순신",
      context: "짐에게는 12척의 배가 남아있다#@@@!@!@!",
      status: "APPLY",
      createdAt: "2024-02-20T02:45:23.189Z",
    };

    mockRepository.getResumeById.mockReturnValue(getResumeIdReturnValue);

    const updateData = {
      id: 1,
      resumeId: 3,
      title: "이순신",
      context: "짐에게는 12척의 배가 남아있다",
      status: "APPLY",
    };

    const updateResumeReturnValue = {
      id: 3,
      user_id: 1,
      userName: "홍길동",
      title: "이순신",
      context: "짐에게는 12척의 배가 남아있다",
      status: "APPLY",
      createdAt: "2024-02-20T02:45:23.189Z",
      updatedAt: "2024-02-20T02:50:23.189Z",
    };

    mockRepository.updateResume.mockReturnValue(updateResumeReturnValue);
    const updateResume = await resumesServices.updateResume(
      updateData.id,
      updateData.resumeId,
      updateData.title,
      updateData.context,
      updateData.status
    );

    expect(mockRepository.getResumeById).toHaveBeenCalledTimes(1);
    expect(mockRepository.getResumeById).toHaveBeenCalledWith(
      updateData.resumeId
    );

    expect(mockRepository.updateResume).toHaveBeenCalledTimes(1);
    expect(mockRepository.updateResume).toHaveBeenCalledWith(
      updateData.resumeId,
      updateData.title,
      updateData.context,
      updateData.status
    );

    expect(updateResume).toEqual(updateResumeReturnValue);
  });

  // 이력서 삭제
  test("deleteResume Method", async () => {
    const deleteReturnData = {
      id: 1,
      user_id: 1,
      userName: "deleted userName",
      title: "deleted title",
      context: "deleted context",
      status: "deleted status",
      createdAt: "deleted createdAt",
      updatedAt: "deleted updatedAt",
    };

    mockRepository.getResumeById.mockReturnValue(deleteReturnData);
    mockRepository.deleteResume.mockReturnValue(deleteReturnData);

    const deleteResume = await resumesServices.deleteResume(1, 1);

    expect(mockRepository.getResumeById).toHaveBeenCalledTimes(1);
    expect(mockRepository.getResumeById).toHaveBeenCalledWith(
      deleteReturnData.id
    );

    expect(mockRepository.deleteResume).toHaveBeenCalledTimes(1);
    expect(mockRepository.deleteResume).toHaveBeenCalledWith(
      deleteReturnData.id
    );

    expect(deleteResume).toEqual(deleteReturnData);
  });
});
