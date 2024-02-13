const unProcessableError = require("../lib/errorInstances/unProcessableError");

const checkUserDataInputIsEmpty = async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      firstName.trim().length === 0 ||
      lastName.trim().length === 0 ||
      email.trim().length === 0
    ) {
      throw new unProcessableError("all input fields are required");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkEmailValidity = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email || email.trim().length === 0) {
      throw new unProcessableError("email field is required");
    }
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(regex)) {
      throw new unProcessableError("Invalid email address");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkPasswordInputIsEmpty = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;
    if (
      !password ||
      !confirmPassword ||
      password.trim().length === 0 ||
      confirmPassword.trim().length === 0
    ) {
      throw new unProcessableError("all input fields are required");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkPasswordValidity = async (req, res, next) => {
  const { password } = req.body;
  try {
    const passcodeLengthIsValid = password?.trim().length < 8;
    const valid = {
      hasUpper: /[A-Z]/,
      hasLower: /[a-z]/,
      hasNumber: /[0-9]/,
      hasSpclChr: /[@,#,$,%,&]/,
    };
    if (
      passcodeLengthIsValid ||
      !password.match(valid.hasUpper) ||
      !password.match(valid.hasLower) ||
      !password.match(valid.hasNumber) ||
      !password.match(valid.hasSpclChr)
    ) {
      throw new unProcessableError("invalid password format");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkPasswordMatch = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;
    if (password.trim() !== confirmPassword.trim()) {
      throw new unProcessableError("password does not match");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkNameDataLength = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const num = /\d/g;

    if (
      firstName.match(format) ||
      lastName.match(format) ||
      firstName.match(num) ||
      lastName.match(num)
    ) {
      throw new unProcessableError(
        "Names should not contain special characters or numbers"
      );
    }

    if (firstName.length > 40 || lastName.length > 40) {
      throw new unProcessableError(
        "name should not be longer than 40 characters"
      );
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkUserDataInputForUpdateIsEmpty = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
      throw new unProcessableError("all input fields are required");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkUserDataInputIsEmpty,
  checkEmailValidity,
  checkPasswordValidity,
  checkPasswordMatch,
  checkNameDataLength,
  checkUserDataInputForUpdateIsEmpty,
  checkPasswordInputIsEmpty,
};
