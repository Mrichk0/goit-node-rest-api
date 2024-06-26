import HttpError from "../helpers/HttpError.js";
import { verifyToken } from "../helpers/jwt.js";
import { findUser } from "../services/authServices.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Not authorized"));
  }

  const { error, payload } = verifyToken(token);
  if (error) {
    return next(HttpError(401, error.message));
  }

  if (!payload) {
    return next(HttpError(401, "Invalid token"));
  }

  const { id } = payload;

  const user = await findUser({ _id: id });
  if (!user) {
    return next(HttpError(401, "User not found"));
  }

  if (!user.token) {
    return next(HttpError(401, "Not authorized"));
  }

  req.user = user;
  next();
};

export default authenticate;
