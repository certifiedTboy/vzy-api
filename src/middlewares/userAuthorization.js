const User = require("../models/userModel");
const unAuthorizedError = require("../lib/errorInstances/unAuthorizedError");

const checkUserAccountOwnership = async (req, res, next) => {
  try {
    if (req.user) {
      const currentUser = await User.findById(req.user.id);

      if (currentUser._id.toString() !== req.user.id) {
        throw new unAuthorizedError("you do not have permission to do this");
      } else {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { checkUserAccountOwnership };
