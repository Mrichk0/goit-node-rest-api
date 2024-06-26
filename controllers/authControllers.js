import bcript from "bcrypt";

import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { createToken } from "../helpers/jwt.js";

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcript.hash(password, 10);
  const newUser = await authServices.signup({
    ...req.body,
    password: hashPassword,
  });
  res.status(201).json(newUser.email);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const isPasswordEqual = await bcript.compare(password, user.password);
  if (!isPasswordEqual) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id: id } = user;
  const payload = { id };
  const token = createToken(payload);
  await authServices.updateUser({ _id: id }, { token });
  res.json({ token });
};

const current = async (req, res) => {
  const { email } = req.user;
  res.json({ email });
};

const logout = async (req, res) => {
  const { _id: id } = req.user;
  await authServices.updateUser({ _id: id }, { token: "" });
  res.json({ message: "Logout success" });
};

const validSubscriptions = ["starter", "pro", "business"];

const updateUserSubscription = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { subscription } = req.body;

  if (!validSubscriptions.includes(subscription)) {
    return next(
      HttpError(
        400,
        `Invalid subscription type. Valid options are: ${validSubscriptions.join(
          ", "
        )}`
      )
    );
  }

  const updatedUser = await authServices.updateSubscription(
    userId,
    subscription
  );

  if (!updatedUser) {
    return next(HttpError(404, "User not found"));
  }

  res.json({
    message: "Subscription updated successfully",
    user: {
      _id: updatedUser._id,
      subscription: updatedUser.subscription,
    },
  });
};

export default {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
};
