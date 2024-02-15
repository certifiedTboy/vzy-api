const express = require("express");
const {
  createUser,
  updateUser,
  getCurrentUser,
  updatePaymentStatus,
} = require("../controllers/userControllers");

// const { validateUserData } = require("../middlewares/dataValidator");

const {
  checkEmailValidity,
  checkNameDataLength,
  checkUserDataInputIsEmpty,
  checkUserDataInputForUpdateIsEmpty,
} = require("../middlewares/dataValidator");
const {
  checkUserAccountOwnership,
} = require("../middlewares/userAuthorization");

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
  checkUserAccountOwnership,
  updateUser
);

router.post("/payment-status", updatePaymentStatus);

router.get("/me", requireSignin, getCurrentUser);

module.exports = router;
