export class AdminServices {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  // 게시물 전체 조회
  findAllResumes = async (orderValue) => {
    const allResumes = await this.adminRepository.findAllResumes(orderValue);
    return allResumes.map((resume) => {
      return {
        id: resume.id,
        user_id: resume.user_id,
        userName: resume.userName,
        title: resume.title,
        context: resume.context,
        status: resume.status,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      };
    });
  };

  // 이력서 상태 수정
  updateStatus = async (resumeId, status) => {
    const resume = await this.adminRepository.getResumeById(resumeId);

    if (!resume) {
      throw new Error("존재하지 않는 이력서 입니다.");
    }

    const updatedResume = await this.adminRepository.updateStatus(
      resumeId,
      status
    );
    return {
      id: updatedResume.id,
      user_id: updatedResume.user_id,
      userName: updatedResume.userName,
      title: updatedResume.title,
      context: updatedResume.context,
      status: updatedResume.status,
      createdAt: updatedResume.createdAt,
      updatedAt: resume.updatedAt,
    };
  };
}
