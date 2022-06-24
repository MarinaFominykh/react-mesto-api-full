const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const InValidDataError = require('../errors/in-valid-data-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    // eslint-disable-next-line consistent-return
    .catch((error) => {
      if (error.name === 'ValidationError') {
        const inValidDataError = new InValidDataError('Переданы некорректные данные');
        return next(inValidDataError);
      }
      next(error);
    });
};

const deleteCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      return card;
    })
    .then((card) => {
      if (String(card.owner) === owner) {
        return Card.findByIdAndRemove(req.params.id);
      }
      throw new ForbiddenError('Вы не можете удалять чужие карточки');
    })
    .then(() => res.status(200).send({ message: 'Карточка удалена' }))
    // eslint-disable-next-line consistent-return
    .catch((error) => {
      if (error.kind === 'ObjectId') {
        const inValidDataError = new InValidDataError('Переданы некорректные данные');
        return next(inValidDataError);
      }
      next(error);
    });
};

const likecard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      res.send(card);
    })
    // eslint-disable-next-line consistent-return
    .catch((error) => {
      if (error.kind === 'ObjectId') {
        const inValidDataError = new InValidDataError('Переданы некорректные данные');
        return next(inValidDataError);
      }
      next(error);
    });
};

const disLikecard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      res.send(card);
    })
    // eslint-disable-next-line consistent-return
    .catch((error) => {
      if (error.kind === 'ObjectId') {
        const inValidDataError = new InValidDataError('Переданы некорректные данные');
        return next(inValidDataError);
      }
      next(error);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likecard,
  disLikecard,
};
