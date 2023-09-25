const express = require("express");
const router = express.Router();
const user = require("../controllers/users");
const {validateBody, authenticate} = require("../middlewares");

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

router.post(
  "/logout",
  authenticate,
  user.logout
);
router.post(
  "/current",
  authenticate,
  user.current
);

router.patch("/", authenticate, validateBody(validation.subscriptionSchema), user.updateSubscription);






module.exports = router;
