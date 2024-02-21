import { expect, jest, test } from "@jest/globals";
import { ResumesController } from "../../../src/controllers/resumes.controller";

const mockResumesService = {
  createResume: jest.fn(),
  findAllResumes: jest.fn(),
  getResumeById: jest.fn(),
  updateResume: jest.fn(),
  deleteResume: jest.fn(),
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
  end: jest.fn(),
};

const mockNext = jest.fn();

const resumesController = new ResumesController(mockResumesService);

describe("Resumes Controller unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockResponse.status.mockReturnValue(mockResponse);
  });

  // 이력서 생성
  test("createResume Method by success", async () => {
    const createResumeRequestBody = {
      title: "test title",
      context: "test context",
    };
    mockRequest.body = createResumeRequestBody;

    const RequestUser = {
      id: "2",
    };
    mockRequest.user = RequestUser;

    const createReturnResume = {
      id: 4,
      user_id: 2,
      title: "나는 세종대왕",
      context: "가갸거겨고교구규그기",
      status: "APPLY",
      createdAt: "2024-02-20T02:46:19.707Z",
    };
    mockResumesService.createResume.mockReturnValue(createReturnResume);

    await resumesController.createResume(mockRequest, mockResponse, mockNext);

    expect(mockResumesService.createResume).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      successMessage: "이력서 생성이 완료되었습니다.",
      data: createReturnResume,
    });
  });
  // 이력서 조회
  test("getResumes", async () => {
    const getResumesQuery = {
      orderKey: "user_id",
      orderValue: "desc",
    };

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

    mockRequest.query = getResumesQuery;

    mockResumesService.findAllResumes.mockReturnValue(getResumesReturnData);

    await resumesController.getResumes(mockRequest, mockResponse, mockNext);

    expect(mockResumesService.findAllResumes).toHaveBeenCalledTimes(1);
    expect(mockResumesService.findAllResumes).toHaveBeenLastCalledWith(
      getResumesQuery.orderKey,
      getResumesQuery.orderValue
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      successMessage: "이력서 조회가 완료되었습니다.",
      data: getResumesReturnData,
    });
  });

  // 이력서 상세조회
  test("getResumeById Method", async () => {
    const getResumeByIdRequestParams = {
      resumeId: 3,
    };
    mockRequest.params = getResumeByIdRequestParams;
    const returnGetResumeById = {
      id: 3,
      user_id: 1,
      userName: "홍길동",
      title: "내가바로 이순신",
      context: "짐에게는 12척의 배가 남아있다#@@@!@!@!",
      status: "APPLY",
      createdAt: "2024-02-20T02:45:23.189Z",
    };

    mockResumesService.getResumeById.mockReturnValue(returnGetResumeById);

    await resumesController.getResumeById(mockRequest, mockResponse, mockNext);

    expect(mockResumesService.getResumeById).toHaveBeenCalledTimes(1);
    expect(mockResumesService.getResumeById).toHaveBeenCalledWith(
      returnGetResumeById.id
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      successMessage: "이력서 상세조회가 완료되었습니다.",
      data: returnGetResumeById,
    });
  });
  // 이력서 수정
  test("updateResume Method", async () => {
    const updateResumeRequestUser = {
      id: 1,
    };
    const updateResumeRequestParams = {
      resumeId: 3,
    };
    const updateResumeRequestBody = {
      title: "세종대왕 수정함",
      context: "짐에게는 12척의 배가 남아있다#@@@!@!@!",
      status: "APPLY",
    };

    mockRequest.user = updateResumeRequestUser;
    mockRequest.params = updateResumeRequestParams;
    mockRequest.body = updateResumeRequestBody;

    const updateResumeReturnData = {
      id: 3,
      user_id: 1,
      userName: "홍길동",
      title: "내가바로 이순신",
      context: "짐에게는 12척의 배가 남아있다#@@@!@!@!",
      status: "APPLY",
      createdAt: "2024-02-20T02:45:23.189Z",
    };

    mockResumesService.updateResume.mockReturnValue(updateResumeReturnData);

    await resumesController.updateResume(mockRequest, mockResponse, mockNext);

    expect(mockResumesService.updateResume).toHaveBeenCalledTimes(1);
    expect(mockResumesService.updateResume).toHaveBeenCalledWith(
      updateResumeRequestUser.id,
      updateResumeRequestParams.resumeId,
      updateResumeRequestBody.title,
      updateResumeRequestBody.context,
      updateResumeRequestBody.status
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      successMessage: "이력서 수정이 완료되었습니다.",
      data: updateResumeReturnData,
    });
  });

  //이력서 삭제
  test("deleteResume Method", async () => {
    const deleteResumeRequestParams = {
      resumeId: 3,
    };
    const deleteResumeRequestUser = {
      id: 1,
    };

    mockRequest.params = deleteResumeRequestParams;
    mockRequest.user = deleteResumeRequestUser;

    await resumesController.deleteResume(mockRequest, mockResponse, mockNext);

    expect(mockResumesService.deleteResume).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(204);
    expect(mockResponse.end).toHaveBeenCalled(); // 끝마치는 함수 end가 호출되었는지 확인
    expect(mockNext).not.toHaveBeenCalled(); // 에러처리하는 next가 호출안되었는지 확인
  });
});
