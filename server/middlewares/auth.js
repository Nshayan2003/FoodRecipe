import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Please Login for access this resource" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }

    req.user = payload;
    next();
  });
};
