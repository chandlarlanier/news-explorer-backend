const {Joi, celebrate} = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.email");
};

const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      "string.empty": "Article must have a keyword"
    }),
    title: Joi.string().required().messages({
      "string.empty": "Article must have a title"
    }),
    text: Joi.string().required().messages({
      "string.empty": "Article must have text"
    }),
    date: Joi.string().required().messages({
      "string.empty": "Article must have a date"
    }),
    source: Joi.string().required().messages({
      "string.empty": "Article must have a source"
    }),
    link: Joi.string().required().custom(validateURL).messages({
      "string.empty": "Article must have a link",
      "string.uri": "Article link must be a valid URL"
    }),
    image: Joi.string().required().custom(validateURL).messages({
      "string.empty": "Article must have an image URL",
      "string.uri": "Article image must be a valid URL"
    })
  })
});

const validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "The minimum length of the 'username' field is 2",
      "string.max": "The maximum length of the 'username' field is 30",
      "string.empty": "The 'username' field is required"
    }),
    email: Joi.string().required().custom(validateEmail).messages({
      "string.email": "The 'email' field must be a valid email",
      "string.empty": "The 'email' field is required"
    }),
    password: Joi.string().required().messages({
      "string.empty": "The 'password' field is required"
    })
  })
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail).messages({
      "string.email": "The 'email' field must be a valid email",
      "string.empty": "The 'email' field is required",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The 'password' field is required",
    }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24).messages({
      "string.hex": "_id does not use hexadecimal values",
      "string.length": "_id length is not equal to 24"
    })
  })
})

module.exports = {
  validateArticle,
  validateSignUp,
  validateSignIn,
  validateId
}
