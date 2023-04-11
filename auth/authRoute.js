const express = require("express");
const { tryCatchWrapper } = require("../utils/tryCatchWrapper");
const {
  register,
  login,
  logout,
  userInfo,
  upSubscription,
  upAvatar,
  verifyEmail,
  repeatVerifyEmail,
} = require("../auth/authControler");
const {
  authUser,
  upUserSubscription,
} = require("../validation/validationSchemasUser");
const { validateAuth } = require("../auth/valideteAuth");
const { validateToken } = require("../auth/validateToken");
const { upload } = require("../middlewares/uploadAvatar");

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
authRouter.patch(
  "avatars",
  tryCatchWrapper(validateToken),
  upload.single("avatar"),
  tryCatchWrapper(upAvatar)
);
authRouter.get("/verify/:verificationToken", tryCatchWrapper(verifyEmail));
authRouter.post("/verify", tryCatchWrapper(repeatVerifyEmail));

module.exports = {
  authRouter,
};
