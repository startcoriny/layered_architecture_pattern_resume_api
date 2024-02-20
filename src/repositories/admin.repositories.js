export class AdminRepositories {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findAllResumes = async (orderValue) => {
    const allResumes = await this.prisma.resumes.findMany({
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
        createdAt: orderValue.toLowerCase(),
      },
    });
    return allResumes;
  };

  getResumeById = async (resumeId) => {
    const resume = await this.prisma.resumes.findFirst({
      where: {
        id: +resumeId,
      },
    });

    return resume;
  };

  updateStatus = async (resumeId, status) => {
    const updatedResume = await this.prisma.resumes.update({
      where: {
        id: +resumeId,
      },
      data: {
        status,
      },
    });
    return updatedResume;
  };
}
