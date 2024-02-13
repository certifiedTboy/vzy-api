const User = require("../models/userModel");
const unProcessableError = require("../lib/errorInstances/unProcessableError");
const notFoundError = require("../lib/errorInstances/notFoundError");
const conflictError = require("../lib/errorInstances/confictError");

const createNewUser = async (email, firstName, lastName) => {
  // check if user exist to avoid multiple creation of unverified accounts on multiple request
  const user = await checkThatUserAlreadyExist(email);
  if (!user) {
    const newUser = new User({ email, firstName, lastName });

    await newUser.save();
  } else {
    // if user exist on db, and is verified, a error response is sent
    throw new unProcessableError("This email address is already registered");
  }
};

const updateUserData = async (userId, firstName, lastName) => {
  const user = await checkThatUserExistById(userId);
  if (user) {
    user.firstName = firstName;
    user.lastName = lastName;

    await user.save();
    return user;
  }
};

const checkThatUserAlreadyExist = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const checkThatUserExistById = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new notFoundError("User does not exist");
  } else {
    return user;
  }
};

module.exports = {
  createNewUser,
  checkThatUserExistById,
  updateUserData,
};
