const ResponseHandler = require("../lib/responseHandler");
const {
  createNewUser,
  updateUserData,
  checkThatUserExistById,
} = require("../services/userServices");

const { verifyPayment } = require("../services/paymentServices");

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
      ResponseHandler.created(
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
    const { userId } = req.user;
    const { firstName, lastName } = req.body;

    const updatedUser = await updateUserData(userId, firstName, lastName);

    if (updatedUser) {
      ResponseHandler.ok(res, updatedUser, "user update successful");
    }
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const currentUser = await checkThatUserExistById(userId);

    if (currentUser) {
      ResponseHandler.ok(res, currentUser, "success");
    }
  } catch (error) {
    next(error);
  }
};

const updatePaymentStatus = async (req, res, next) => {
  try {
    const result = await verifyPayment(req.body);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  updateUser,
  getCurrentUser,
  updatePaymentStatus,
};
