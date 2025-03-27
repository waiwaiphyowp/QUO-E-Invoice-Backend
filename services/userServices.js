const User = require("../models/user");
const bcrypt = require("bcrypt");

const createUser = async (userDetails) => {
  const { username, password } = userDetails;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = await User.create({ username, password: hashedPassword });
  return user;
};

module.exports = { createUser };