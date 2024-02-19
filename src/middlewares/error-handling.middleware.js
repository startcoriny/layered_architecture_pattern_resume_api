export default function (err, req, res, next) {
  // 에러처리하기
  console.log("에러핸들러진입");

  switch (true) {
    case err.message.includes("존재하지 않는 이메일"):
      return res.status(404).json({ errorMessage: err.message });

    case err.message.includes("비밀번호가 일치하지 않"):
      return res.status(401).json({ errorMessage: err.message });

    case err.message.includes("이미 존재하는 이메일"):
      return res.status(409).json({ errorMessage: err.message });

    case err.message.includes("토큰이 존재하지 않"):
      return res.status(401).json({ errorMessage: err.message });

    case err.message.includes("토큰 사용자가 존재하지 않"):
      return res.status(401).json({ errorMessage: err.message });

    case err.message.includes("토큰이 만료되었습니다. 다시 로그인 해주세요."):
      return res.status(401).json({ errorMessage: err.message });

    case err.message.includes("토큰이 조작되었습니다."):
      return res.status(401).json({ errorMessage: err.message });

    case err.message.includes("비정상적인 요청입니다."):
      return res.status(401).json({ errorMessage: err.message });

    case err.message.includes("토큰 타입이 일치하지 않습니다."):
      return res.status(401).json({ errorMessage: err.message });

    default:
      return res
        .status(500)
        .json({ errorMessage: "서버 내부 에러가 발생했습니다." });
  }
}
