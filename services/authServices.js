import User from "../models/User.js";

function findUser(filter) {
  return User.findOne(filter);
}

function updateUser(filter, data) {
  return User.findOneAndUpdate(filter, data);
}

function signup(data) {
  return User.create(data);
}

const updateSubscription = async (userId, subscription) => {
  return await User.findByIdAndUpdate(userId, { subscription }, { new: true });
};

export { signup, findUser, updateUser, updateSubscription };
