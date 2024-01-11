const Article = require('../models/article');

const getArticles = (req, res) => {
  Article.find({}).then((articles) => {
    res.send(articles)
  })
    // handle error
}

const saveArticle = (req, res) => {
  const {keyword, title, text, date, source, link, image} = req.body;
  return Article.create({keyword, title, text, date, source, link, image, owner: req.user._id})
    .then((article) => {
      res.send(article);
    })
    .catch((error) => {
      // handle error
    })
}

const unsaveArticle = (req, res) => {
  const {articleId} = req.params;

  Article.findById(articleId)
    .orFail(() => {
      // throw not found error
    })
    .then((article) => {
      return article.deleteOne().then(() => {
        res.send({message: "Article has been unsaved"})
      })
    })
    .catch(() => {
      //handle error
    })
}

module.exports = {
  getArticles,
  saveArticle,
  unsaveArticle
}
