const { NODE_ENV, JWT_SECRET_KEY } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const InValidDataError = require('../errors/in-valid-data-err');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  // if (!email || !password) {
  //   throw new InValidDataError('Переданы некорректные данные');
  // }
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then(() => {
          res.status(200).send({ name, about, avatar });
        })
        .catch((err) => {
          if (err.code === 11000) {
            const duplicateError = new Error('Пользователь с таким e-mail уже существует');
            duplicateError.statusCode = 409;
            next(duplicateError);
          // eslint-disable-next-line no-underscore-dangle
          } else if (err._message === 'user validation failed') {
            const validateError = new Error('Переданы некорректные данные');
            validateError.statusCode = 400;
            return next(validateError);
          }
          return next(err);
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret', { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такой пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  if (!name || !about) {
    throw new InValidDataError('Переданы некорректные данные');
  }
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((newUser) => res.status(200).send(newUser))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new InValidDataError('Переданы некорректные данные при создании карточки'));
      } else { next(error); }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  if (!avatar) {
    throw new InValidDataError('Переданы некорректные данныe');
  }
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((newAvatar) => res.send(newAvatar))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new InValidDataError('Переданы некорректные данные при создании аватара'));
      } else { next(error); }
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findOne(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такой пользователь не найден');
      }
      res.send(user);
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
  login,
  getCurrentUser,
};
