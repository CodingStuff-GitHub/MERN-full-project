// Genrating a JWT token and cookie
export const jwtCookie = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const options = {
    httpOnly: false,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};
