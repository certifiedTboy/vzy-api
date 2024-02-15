const User = require("../models/userModel");
const { hashPassword } = require("../utils/passwordHelper");
const UnProcessableError = require("../lib/errorInstances/unProcessableError");
const NotFoundError = require("../lib/errorInstances/notFoundError");
const ConflictError = require("../lib/errorInstances/confictError");

const createNewUser = async (email, firstName, lastName, userPassword) => {
  // check if user exist in database
  const user = await checkThatUserAlreadyExist(email);
  if (!user) {
    const newUser = new User({
      email,
      firstName,
      lastName,
      password: hashPassword(userPassword),
    });

    await newUser.save();

    if (newUser) return newUser;

    throw new UnProcessableError("user creation failed");
  } else {
    // if user exist on db, and is verified, a error response is sent
    throw new ConflictError("This email address is already registered");
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
    throw new NotFoundError("User does not exist");
  } else {
    return user;
  }
};

const updateUserPaymentStatus = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    user.paid = true;
    await user.save();
    return user;
  }

  throw new NotFoundError("User does not exist");
};

module.exports = {
  createNewUser,
  checkThatUserExistById,
  updateUserData,
  checkThatUserAlreadyExist,
  updateUserPaymentStatus,
};
