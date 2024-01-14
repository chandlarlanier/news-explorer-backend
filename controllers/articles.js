const Article = require("../models/article");
const { BadRequestError } = require("../utils/errors/BadRequest");
const { ForbiddenError } = require("../utils/errors/Forbidden");
const { NotFoundError } = require("../utils/errors/NotFound");

const getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => {
      res.send(articles);
    })
    .catch(next);
};

const saveArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  return Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      res.send(article);
    })
    .catch((error) => {
      if (error.name === "VaidationError") {
        next(new BadRequestError("Validation error"));
      } else {
        next(error);
      }
    });
};

const unsaveArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId)
    .orFail(() => {
      throw new NotFoundError("Invalid article ID");
    })
    .then((article) => {
      if (String(article.owner) !== req.user_id) {
        throw new ForbiddenError("User not authorized to unsave this article");
      }
    })
    .then((article) => {
      article.deleteOne().then(() => {
        res.send({ message: "Article has been unsaved" });
      });
    })
    .catch(next);
};

module.exports = {
  getArticles,
  saveArticle,
  unsaveArticle,
};
