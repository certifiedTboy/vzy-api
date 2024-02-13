const responseHandler = require("../lib/responseHandler");
const {
  createNewUser,
  updateUserData,
  checkThatUserExistById,
} = require("../services/userServices");

const createUser = async (req, res, next) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    const createdUser = await createNewUser(
      email,
      firstName,
      lastName,
      password
    );
    if (createdUser) {
      responseHandler.created(
        res,
        undefined,
        "user account created successfully"
      );
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName } = req.body;

    const updatedUser = await updateUserData(userId, firstName, lastName);

    if (updatedUser) {
      responseHandler.ok(res, updatedUser, "user update successful");
    }
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const currentUser = await checkThatUserExistById(id);

    if (currentUser) {
      responseHandler.ok(res, currentUser, "success");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  updateUser,
  getCurrentUser,
};
