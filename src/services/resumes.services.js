export class ResumesServices {
  constructor(ResumesRepositories) {
    this.ResumesRepositories = ResumesRepositories;
  }

  // 이력서 생성
  createResume = async (id, title, context) => {
    const createdResume = await this.ResumesRepositories.createResume(
      id,
      title,
      context
    );
    return {
      id: createdResume.id,
      user_id: createdResume.user_id,
      userName: createdResume.userName,
      title: createdResume.title,
      context: createdResume.context,
      status: createdResume.status,
      createdAt: createdResume.createdAt,
    };
  };

  // 이력서 전체 조회
  findAllResumes = async (orderKey, orderValue) => {
    const resumes = await this.ResumesRepositories.findAllResumes(
      orderKey,
      orderValue
    );

    return resumes.map((resume) => {
      return {
        id: resume.id,
        user_id: resume.user_id,
        title: resume.title,
        status: resume.status,
        createdAt: resume.createdAt,
      };
    });
  };

  // 이력서 id 조회
  getResumeById = async (resumeId) => {
    const detailResume = await this.ResumesRepositories.getResumeById(resumeId);

    return {
      id: detailResume.id,
      user_id: detailResume.user_id,
      userName: detailResume.userName,
      title: detailResume.title,
      context: detailResume.context,
      status: detailResume.status,
      createdAt: detailResume.createdAt,
    };
  };

  // 이력서 수정
  updateResume = async (id, resumeId, title, context, status) => {
    const resume = await this.ResumesRepositories.getResumeById(resumeId);

    if (!resume) {
      throw new Error("존재하지 않는 이력서 입니다.");
    }

    if (resume.user_id !== id) {
      throw new Error("이력서를 수정할 권한이 없습니다.");
    }

    const updatedResume = await this.ResumesRepositories.updateResume(
      resumeId,
      title,
      context,
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
      updatedAt: updatedResume.updatedAt,
    };
  };

  // 이력서 삭제
  deleteResume = async (resumeId, id) => {
    const resume = await this.ResumesRepositories.getResumeById(resumeId);

    if (!resume) {
      throw new Error("존재하지 않는 이력서 입니다.");
    }

    if (resume.user_id !== id) {
      throw new Error("이력서를 삭제할 권한이 없습니다.");
    }

    const deletedResume = await this.ResumesRepositories.deleteResume(resumeId);

    return {
      id: deletedResume.id,
      user_id: deletedResume.user_id,
      userName: deletedResume.userName,
      title: deletedResume.title,
      context: deletedResume.context,
      status: deletedResume.status,
      createdAt: deletedResume.createdAt,
      updatedAt: deletedResume.updatedAt,
    };
  };
}
