const apiRouter = require("express").Router();
const userController = require("./controllers/userController");
const postController = require("./controllers/postController");
const followController = require("./controllers/followController");
const cors = require("cors");

apiRouter.use(cors());

apiRouter.get("/api/", (req, res) =>
  res.json(
    "Hello, if you see this message that means your backend is up and running successfully. Congrats! Now let's continue learning React!"
  )
);

// check token to log out front-end if expired
apiRouter.post("/checkToken", userController.checkToken);

apiRouter.post(
  "/api/getHomeFeed",
  userController.apiMustBeLoggedIn,
  userController.apiGetHomeFeed
);
apiRouter.post("/api/register", userController.apiRegister);
apiRouter.post("/api/login", userController.apiLogin);
apiRouter.get("/api/post/:id", postController.reactApiViewSingle);
apiRouter.post(
  "/api/post/:id/edit",
  userController.apiMustBeLoggedIn,
  postController.apiUpdate
);
apiRouter.delete(
  "/api/post/:id",
  userController.apiMustBeLoggedIn,
  postController.apiDelete
);
apiRouter.post(
  "/api/create-post",
  userController.apiMustBeLoggedIn,
  postController.apiCreate
);
apiRouter.post("/api/search", postController.search);

apiRouter.post("/api/doesUsernameExist", userController.doesUsernameExist);
apiRouter.post("/api/doesEmailExist", userController.doesEmailExist);

// profile related routes
apiRouter.post(
  "/api/profile/:username",
  userController.ifUserExists,
  userController.sharedProfileData,
  userController.profileBasicData
);
apiRouter.get(
  "/api/profile/:username/posts",
  userController.ifUserExists,
  userController.apiGetPostsByUsername
);
apiRouter.get(
  "/api/profile/:username/followers",
  userController.ifUserExists,
  userController.profileFollowers
);
apiRouter.get(
  "/api/profile/:username/following",
  userController.ifUserExists,
  userController.profileFollowing
);

// follow routes
apiRouter.post(
  "/api/addFollow/:username",
  userController.apiMustBeLoggedIn,
  followController.apiAddFollow
);
apiRouter.post(
  "/api/removeFollow/:username",
  userController.apiMustBeLoggedIn,
  followController.apiRemoveFollow
);

module.exports = apiRouter;
