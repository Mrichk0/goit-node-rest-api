import jwt from "jsonwebtoken";
import "dotenv/config";
const { JWT_SECRET } = process.env;

export const createToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  return token;
};

export const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    console.log("verifyToken", payload);
    return { error: null, payload };
  } catch (error) {
    return { error, payload: null };
  }
};
