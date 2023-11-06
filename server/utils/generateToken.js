import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return new Promise((resolve, reject) => {
    const secret = process.env.JWT_SECRET_KEY;
    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };
    const options = {
      expiresIn: "30d",
    };

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(err);
      }

      resolve(token);
    });
  });
};

export default generateToken;
