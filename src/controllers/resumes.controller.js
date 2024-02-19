export class ResumesController {
  constructor(ResumesServices) {
    this.ResumesServices = ResumesServices;
  }

  createResume = async (req, res, next) => {
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

    return res.status(201).json({ data: createdResume });
  };

  getResumes = async (req, res, next) => {
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

    return res.status(200).json({ data: resumes });
  };
}
