const router = require('express').Router();
const { getArticles, saveArticle, unsaveArticle } = require('../controllers/articles');

router.get("/", getArticles);
router.post('/', saveArticle);
router.delete('/:articleId', unsaveArticle)

module.exports = router;
