const express = require("express");
const {
  createUser,
  updateUser,
  getCurrentUser,
} = require("../controllers/userControllers");
// const {
//   checkEmailValidity,
//   checkNameDataLength,
//   checkUserDataInputIsEmpty,
//   checkUserDataInputForUpdateIsEmpty,
// } = require("../middlewares/validators/authDataValidator");
// const {
//   checkUserAccountOwnership,
//   checkUserIsAdmin,
// } = require("../middlewares/authorization/userAuthorization");
// const {
//   checkVerificationDataInputIsEmpty,
// } = require("../middlewares/validators/verificationDataValidator");
const requireSignin = require("../middlewares/requireSignin");

const router = express.Router();

router.post("/create", createUser);

router.put("/user/update", requireSignin, updateUser);

router.get("/me", requireSignin, getCurrentUser);

module.exports = router;
