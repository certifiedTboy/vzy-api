const express = require("express");
const {
  userLogin,
  refreshTokenHandler,
  userLogout,
} = require("../controllers/authControllers");
const { checkEmailValidity } = require("../middlewares/dataValidator");

const router = express.Router();

router.post("/login", checkEmailValidity, userLogin);
router.get("/refresh-token", refreshTokenHandler);
router.get("/logout", userLogout);

module.exports = router;
