const express = require("express");
const router = express.Router();
const user = require("../controllers/users");
const {validateBody} = require("../middlewares");

const validation = require("../utils/validation");

router.post(
  "/register",
  validateBody(validation.registerSchema), 
  user.register
);

router.post(
  "/login",
  validateBody(validation.loginSchema), 
  user.login
);


module.exports = router;
