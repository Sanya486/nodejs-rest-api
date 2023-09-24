const User = require("../models/users");
const bcrypt = require("bcrypt");
const ctrlWrapper = require("../utils/ctrlWrapper");
const errorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = process.env


const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    errorHandler(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
};

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email });
  if (!user) {
     errorHandler(401, 'Email or password is wrong')
  }
  const passwordCompare = await bcrypt.compare(password, user.password)
  if (!passwordCompare) {
     errorHandler(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, {token})
  
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription
    }
  })
}

const logout = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: "" })
  res.status(204).json()
}

const current = async (req, res) => {
  const { email, subscription } = req.user
  res.status(200).json({
    email,
    subscription
  })
}

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const {subscription} = req.body
  await User.findByIdAndUpdate(_id, { subscription });
  res.status(200).json({
    message: "Subscription has changed",
    subscription
  })
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  updateSubscription: ctrlWrapper(updateSubscription),
};
