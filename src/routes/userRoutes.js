const express = require("express");
const {
  createUser,
  updateUser,
  getCurrentUser,
} = require("../controllers/userControllers");

// const { validateUserData } = require("../middlewares/dataValidator");

const {
  checkEmailValidity,
  checkNameDataLength,
  checkUserDataInputIsEmpty,
  checkUserDataInputForUpdateIsEmpty,
} = require("../middlewares/dataValidator");
// const {
//   checkUserAccountOwnership,
//   checkUserIsAdmin,
// } = require("../middlewares/authorization/userAuthorization");

const requireSignin = require("../middlewares/requireSignin");

const router = express.Router();

router.post(
  "/create",
  checkEmailValidity,
  checkNameDataLength,
  checkUserDataInputIsEmpty,
  createUser
);

router.put(
  "/user/update",
  checkUserDataInputForUpdateIsEmpty,
  requireSignin,

  updateUser
);

router.get("/me", requireSignin, getCurrentUser);

module.exports = router;
