export class ResumesController {
  constructor(ResumesServices) {
    this.ResumesServices = ResumesServices;
  }

  // 이력서 생성
  createResume = async (req, res, next) => {
    try {
      const { id } = req.user;
      const { title, context } = req.body;

      if (!title || !context) {
        throw new Error("필수 항목이 누락되었습니다.");
      }

      const createdResume = await this.ResumesServices.createResume(
        id,
        title,
        context
      );

      return res.status(201).json({
        successMessage: "이력서 생성이 완료되었습니다.",
        data: createdResume,
      });
    } catch (err) {
      next(err);
    }
  };

  // 이력서 조회
  getResumes = async (req, res, next) => {
    try {
      let { orderKey, orderValue } = req.query;

      if (!orderValue || orderKey === "" || orderKey !== "user_id") {
        orderKey = "user_id";
      }

      if (
        !orderValue ||
        (orderValue.toLowerCase() !== "asc" &&
          orderValue.toLowerCase() !== "desc")
      ) {
        orderValue = "desc";
      }

      const resumes = await this.ResumesServices.findAllResumes(
        orderKey,
        orderValue
      );

      return res.status(200).json({
        successMessage: "이력서 조회가 완료되었습니다.",
        data: resumes,
      });
    } catch (err) {
      next(err);
    }
  };

  // 이력서 상세조회
  getResumeById = async (req, res, next) => {
    try {
      const { resumeId } = req.params;

      const detailResume = await this.ResumesServices.getResumeById(resumeId);
      return res.status(200).json({
        successMessage: "이력서 상세조회가 완료되었습니다.",
        data: detailResume,
      });
    } catch (err) {
      next(err);
    }
  };

  // 이력서 수정
  updateResume = async (req, res, next) => {
    try {
      const { id } = req.user;
      const { resumeId } = req.params;
      const { title, context, status } = req.body;

      if (!title || !context || !status) {
        throw new Error("필수 항목이 누락되었습니다.");
      }

      const updatedResume = await this.ResumesServices.updateResume(
        id,
        resumeId,
        title,
        context,
        status
      );

      return res.status(200).json({
        successMessage: "이력서 수정이 완료되었습니다.",
        data: updatedResume,
      });
    } catch (err) {
      next(err);
    }
  };

  //이력서 삭제
  deleteResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const { id } = req.user;

      const deletedResume = await this.ResumesServices.deleteResume(
        resumeId,
        id
      );

      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  };
}
