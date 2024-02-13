const bcrypt = require("bcryptjs");
const unAuthenticatedError = require("../lib/errorInstances/unAuthenticatedError");

const hashPassword = (plainTextPassword) => {
  if (!plainTextPassword) {
    throw new Error("Invalid plain-text password");
  }
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainTextPassword, salt);
};

const verifyPassword = (plainTextPassword, hashedPassword) => {
  if (!bcrypt.compareSync(plainTextPassword, hashedPassword)) {
    throw new unAuthenticatedError("Incorrect login credentials");
  }
};

module.exports = { hashPassword, verifyPassword };
