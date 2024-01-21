const router = require("express").Router();

const { authorize } = require("../middlewares/auth");
const { validateArticle, validateId } = require("../middlewares/validation");

const {
  getSavedArticles,
  saveArticle,
  unsaveArticle,
} = require("../controllers/articles");

router.get("/", authorize, getSavedArticles);
router.post("/", authorize, validateArticle, saveArticle);
router.delete("/:articleId", authorize, validateId, unsaveArticle);

module.exports = router;
