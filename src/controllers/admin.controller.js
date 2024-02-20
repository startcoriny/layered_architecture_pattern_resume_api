export class AdminController {
  constructor(adminServices) {
    this.adminServices = adminServices;
  }

  // 관리자 조회
  getResumes = async (req, res, next) => {
    try {
      let { orderValue } = req.query;
      const role = req.user.role;

      if (!(role === "ADMIN")) {
        throw new Error("관리자만 조회할 수 있습니다.");
      }

      if (
        !orderValue ||
        (orderValue.toLowerCase() !== "asc" &&
          orderValue.toLowerCase() !== "desc")
      ) {
        orderValue = "desc";
      }

      const allResumes = await this.adminServices.findAllResumes(orderValue);

      return res.status(200).json({
        successMessage: "이력서 조회가 완료되었습니다.",
        data: allResumes,
      });
    } catch (err) {
      next(err);
    }
  };

  // 관리자 이력서 상태 수정
  updateResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const { status } = req.body;
      const role = req.user.role;

      if (!(role === "ADMIN")) {
        throw new Error("관리자만 수정할 수 있습니다.");
      }

      if (
        !(
          status === "APPLY" ||
          status === "DROP" ||
          status === "PASS" ||
          status === "INTERVIEW1" ||
          status === "INTERVIEW2" ||
          status === "FINAL_PASS"
        )
      ) {
        throw new Error("비정상적인 요청입니다.");
      }

      const updateResume = await this.adminServices.updateStatus(
        resumeId,
        status
      );

      return res.status(201).json({
        successMessage: "이력서 상태 수정이 완료되었습니다.",
        data: updateResume,
      });
    } catch (err) {
      next(err);
    }
  };
}
