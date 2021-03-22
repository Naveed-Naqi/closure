const express = require("express");
const router = express.Router();

// Subrouters;
const userRouter = require("./user");
const placeRouter = require("./place");
const commentRouter = require("./comment");
const profileRouter = require("./profile");

// Mount our subrouters to assemble our apiRouter;
router.use("/users", userRouter);
router.use("/places", placeRouter);
router.use("/comments", commentRouter);
router.use("/profile", profileRouter);

// Error handling middleware;
router.use((req, res, next) => {
  const error = new Error("Not Found, Please Check URL!");
  error.status = 404;
  next(error);
});

// Export our apiRouter, so that it can be used by our main app in app.js;
module.exports = router;
