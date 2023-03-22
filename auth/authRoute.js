const express = require("express");
const { tryCatchWrapper } = require("../utils/tryCatchWrapper");
const {
  register,
  login,
  logout,
  userInfo,
  upSubscription,
} = require("../auth/authControler");
const {
  authUser,
  upUserSubscription,
} = require("../validation/validationSchemasUser");
const { validateAuth } = require("../auth/valideteAuth");
const { validateToken } = require("../auth/validateToken");

const authRouter = express.Router();

authRouter.post("/register", validateAuth(authUser), tryCatchWrapper(register));
authRouter.get("/login", validateAuth(authUser), tryCatchWrapper(login));
authRouter.post(
  "/logout",
  tryCatchWrapper(validateToken),
  tryCatchWrapper(logout)
);
authRouter.get(
  "/current",
  tryCatchWrapper(validateToken),
  tryCatchWrapper(userInfo)
);
authRouter.patch(
  "/",
  tryCatchWrapper(validateToken),
  validateAuth(upUserSubscription),
  tryCatchWrapper(upSubscription)
);

module.exports = {
  authRouter,
};
