const router = require("express").Router();

const articles = require("./articles");
const users = require("./users");

const { signIn, signUp } = require("../controllers/users");

const { validateSignUp, validateSignIn } = require("../middlewares/validation");

const { NotFoundError } = require("../utils/errors/NotFound");

router.use("/articles", articles);
router.use("/users", users);

router.post("/signin", validateSignIn, signIn);
router.post("/signup", validateSignUp, signUp);

router.use("*", (req, res, next) => {
  next(new NotFoundError("Page not found"));
});

module.exports = router;
