export class ResumesServices {
  constructor(ResumesRepositories) {
    this.ResumesRepositories = ResumesRepositories;
  }

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

  findAllResumes = async (orderKey, orderValue) => {
    const resumes = await this.ResumesRepositories.findAllResumes(
      orderKey,
      orderValue
    );

    return resumes.map((resume) => {
      return {
        id: resume.id,
        user_id: resume.user_id,
        userName: resume.userName,
        title: resume.title,
        context: resume.context,
        status: resume.status,
        createdAt: resume.createdAt,
      };
    });
  };
}
