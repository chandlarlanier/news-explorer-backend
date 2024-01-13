const router = require('express').Router();

const {authorize} = require('../middlewares/auth');
const {validateArticle, validateId} = require('../middlewares/validation');

const { getArticles, saveArticle, unsaveArticle } = require('../controllers/articles');

router.get("/", authorize, getArticles);
router.post('/', authorize, validateArticle, saveArticle);
router.delete('/:articleId', authorize, validateId, unsaveArticle)

module.exports = router;
