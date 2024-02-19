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
}
