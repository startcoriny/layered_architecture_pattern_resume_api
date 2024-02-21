import { expect, jest } from "@jest/globals";
import { AdminController } from "../../../src/controllers/admin.controller";

const mockAdminService = {
  findAllResumes: jest.fn(),
  updateStatus: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
  query: jest.fn(),
  params: jest.fn(),
  user: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const mockNext = jest.fn();

const adminController = new AdminController(mockAdminService);

describe("Resumes Controller unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockResponse.status.mockReturnValue(mockResponse);
  });

  // 관리자 조회
  test("getResumes", async () => {
    const getResumesRequestQuery = {
      orderValue: "desc",
    };
    const getResumesRequestUser = {
      role: "ADMIN",
    };

    mockRequest.query = getResumesRequestQuery;
    mockRequest.user = getResumesRequestUser;

    const getResumesReturnData = [
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
    mockAdminService.findAllResumes.mockReturnValue(getResumesReturnData);

    await adminController.getResumes(mockRequest, mockResponse, mockNext);

    expect(mockAdminService.findAllResumes).toHaveBeenCalledTimes(1);
    expect(mockAdminService.findAllResumes).toHaveBeenCalledWith(
      getResumesRequestQuery.orderValue
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toBeCalledWith({
      successMessage: "이력서 조회가 완료되었습니다.",
      data: getResumesReturnData,
    });
  });

  // 이력서 상태 수정
  test("updateResume Method", async () => {
    const getResumesRequestParams = {
      resumeId: 99,
    };
    const getResumesRequestBody = {
      status: "PASS",
    };
    const getResumesRequestUser = {
      role: "ADMIN",
    };

    mockRequest.params = getResumesRequestParams;
    mockRequest.body = getResumesRequestBody;
    mockRequest.user = getResumesRequestUser;

    const returnUpdateResume = {
      id: 99,
      user_id: 2,
      title: "세종대왕 수정함",
      context: "나냐너녀노뇨누뉴느니",
      status: "PASS",
      createdAt: "2024-02-20T02:44:57.490Z",
      updatedAt: "2024-02-21T05:55:12.686Z",
    };

    mockAdminService.updateStatus.mockReturnValue(returnUpdateResume);

    await adminController.updateResume(mockRequest, mockResponse, mockNext);

    expect(mockAdminService.updateStatus).toHaveBeenCalledTimes(1);
    expect(mockAdminService.updateStatus).toHaveBeenCalledWith(
      getResumesRequestParams.resumeId,
      getResumesRequestBody.status
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toBeCalledWith({
      successMessage: "이력서 상태 수정이 완료되었습니다.",
      data: returnUpdateResume,
    });
  });
});
