const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const {
  getCards,
  createCard,
  deleteCard,
  likecard,
  disLikecard,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new Error('Неправильный формат ссылки');
      }
      return value;
    }),
  }),
}), createCard);

router.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), likecard);

router.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), disLikecard);

module.exports = router;
