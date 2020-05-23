import jwt from "jsonwebtoken";

const EXPIRATION_TIME = 86400;

const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.AUTH_SECRET, {
    expiresIn: EXPIRATION_TIME,
  });
  return token;
};

// middleware
const checkTokenCookie = (req, res, next) => {
  const token = req.signedCookies["SESSIONID"];

  if (!token)
    return res.status(401).send({ error: "No token provided" });

  jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).send({ error: "Token invalid" });

    req.userId = decoded.id;
    return next();
  })
}

export { generateToken, checkTokenCookie, EXPIRATION_TIME };
