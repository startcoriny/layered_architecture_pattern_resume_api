export class ResumesRepositories {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // 이력서 생성
  createResume = async (id, title, context) => {
    const createdResume = await this.prisma.resumes.create({
      data: {
        user_id: +id,
        title,
        context,
      },
    });
    return createdResume;
  };

  // 이력서 전체조회
  findAllResumes = async (orderKey, orderValue) => {
    const resumes = this.prisma.resumes.findMany({
      select: {
        id: true,
        title: true,
        context: true,
        user_id: true,
        user: {
          select: {
            userName: true,
          },
        },
        status: true,
        createdAt: true,
      },
      orderBy: {
        [orderKey]: orderValue,
      },
    });
    return resumes;
  };

  // 이력서 상세조회
  getResumeById = async (resumeId) => {
    const detailResume = await this.prisma.resumes.findFirst({
      where: {
        id: +resumeId,
      },
      select: {
        id: true,
        title: true,
        context: true,
        user_id: true,
        user: {
          select: {
            userName: true,
          },
        },
        status: true,
        createdAt: true,
      },
    });
    return detailResume;
  };

  //이력서 업데이트
  updateResume = async (resumeId, title, context, status) => {
    const updatedResume = await this.prisma.resumes.update({
      where: {
        id: +resumeId,
      },
      data: {
        title,
        context,
        status,
      },
    });
    return updatedResume;
  };

  // 이력서 삭제
  deleteResume = async (resumeId) => {
    const deletedResume = await this.prisma.resumes.delete({
      where: {
        id: +resumeId,
      },
    });
    return deletedResume;
  };
}
