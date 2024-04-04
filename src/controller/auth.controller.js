const user = require("../models/user.model");
const APIError = require("../utils/errors");
const bcrypt = require("bcrypt");
const Response = require("../utils/response");
const { createToken } = require("../middlewares/auth");

const login = async (req, res) => {
  const { email, password } = req.body;
  const newUser = await user.findOne({ email });
  if (!newUser) {
    throw new APIError("Email or password is incorrect!!!", 401);
  }

  const comparePassword = await bcrypt.compare(password, newUser.password);

  if (!comparePassword) {
    throw new APIError("Email or password is incorrect!!!", 401);
  }
  createToken(newUser, res);
};

const register = async (req, res) => {
  const { email, password, name, lastName,userName,userType } = req.body;
  console.log(req.body);
  const userCheck = await user.findOne({ email });

  if (userCheck) {
    throw new APIError("Mail is already in use!!!", 401);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new user({
    name: name,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    userName:userName,
    userType:userType
  });

  await newUser
    .save()
    .then((response) => {
      return new Response(response, "Register Success").created(res);
    })
    .catch((e) => {
      throw new APIError(`Register error:${e}`, 400);
    });
};
const me = async (req, res) => {
  return new Response(req.user).success(res);
};

module.exports = {
  login,
  register,
  me,
};
