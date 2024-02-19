export class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  // 회원가입 컨트롤러
  signUp = async (req, res, next) => {
    try {
      // req데이터 꺼내기
      const { email, password, passwordCheck, userName } = req.body;

      //유효성검사
      if (password !== passwordCheck || password.length < 6) {
        return res.status(400).json({
          message: "비밀번호의 길이가 짧거나 두 비밀번호가 일치하지 않습니다.",
        });
      }

      // 데이터 같이 보내기 + 유저 있는지 검색
      const createUser = await this.usersService.createUser(
        email,
        password,
        userName
      );

      // return값 받기
      return res.status(201).json({ data: createUser });
    } catch (err) {
      next(err);
    }
  };

  // 로그인 컨트롤러
  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "비밀번호와 이메일을 작성해주세요" });
      }

      const logInUser = await this.usersService.logInUser(email, password);
      res.cookie("accessToken", logInUser.accessToken);
      res.cookie("refreshToken", logInUser.refreshToken);
      return res.status(201).json({ data: logInUser });
    } catch (err) {
      console.log("여기로 오는거임");
      next(err);
    }
  };

  // 내정보 조회 컨트롤러
  myInfo = async (req, res, next) => {
    const { id } = req.user;

    const user = await this.usersService.getUserById(id);

    return res.status(200).json({ data: user });
  };
}
