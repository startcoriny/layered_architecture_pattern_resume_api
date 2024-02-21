import { expect, jest, test } from "@jest/globals";
import { AdminServices } from "../../../src/services/admin.services";

let mockAdminRepository = {
  findAllResumes: jest.fn(),
  getResumeById: jest.fn(),
  updateStatus: jest.fn(),
};
const adminServices = new AdminServices(mockAdminRepository);

describe("AdminServices Unit test", () => {
  // 테스트 초기화
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // 게시물 전체 조회 테스트
  test("findAllResumes Method", async () => {
    const returnResumes = [
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

    mockAdminRepository.findAllResumes.mockReturnValue(returnResumes);

    const resumes = await adminServices.findAllResumes("desc");

    expect(mockAdminRepository.findAllResumes).toHaveBeenCalledTimes(1);
    expect(mockAdminRepository.findAllResumes).toHaveBeenCalledWith("desc");

    expect(resumes).toEqual(returnResumes);
  });

  // 이력서 상태 수정 테스트
  test("updateStatus Method", async () => {
    const updateValues = {
      resumeId: 1,
      status: "DROP",
    };

    const returnGetResumeByIdResume = {
      id: 4,
      user_id: 2,
      title: "세종대왕 수정함",
      context: "나냐너녀노뇨누뉴느니",
      status: "APPLY",
      createdAt: "2024-02-20T02:44:57.490Z",
      updatedAt: "2024-02-21T05:55:12.686Z",
    };

    const returnUpdateResume = {
      id: 4,
      user_id: 2,
      title: "세종대왕 수정함",
      context: "나냐너녀노뇨누뉴느니",
      status: "DROP",
      createdAt: "2024-02-20T02:44:57.490Z",
      updatedAt: "2024-02-21T05:55:12.686Z",
    };

    mockAdminRepository.getResumeById.mockReturnValue(
      returnGetResumeByIdResume
    );
    mockAdminRepository.updateStatus.mockReturnValue(returnUpdateResume);

    const updateResume = await adminServices.updateStatus(
      updateValues.resumeId,
      updateValues.status
    );

    expect(mockAdminRepository.getResumeById).toHaveBeenCalledTimes(1);
    expect(mockAdminRepository.getResumeById).toHaveBeenCalledWith(
      updateValues.resumeId
    );

    expect(mockAdminRepository.updateStatus).toHaveBeenCalledTimes(1);
    expect(mockAdminRepository.updateStatus).toHaveBeenCalledWith(
      updateValues.resumeId,
      updateValues.status
    );

    expect(updateResume).toEqual(updateResume);
  });
});
