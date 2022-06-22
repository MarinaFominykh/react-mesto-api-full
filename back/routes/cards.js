const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

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
    id: Joi.string().alphanum().length(24),
  }),
}), deleteCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/(http|https):\/\/(\w+:{0,1}\w*#)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&amp;%#!\-/]))?/),
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
