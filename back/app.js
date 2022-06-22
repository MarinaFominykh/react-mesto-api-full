const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
const bodyParser = require('body-parser');
require('dotenv').config();
const {
  errors,
} = require('celebrate');
const {
  celebrate,
  Joi,
} = require('celebrate');

const app = express();
const {
  PORT = 3001,
} = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
const cors = require('cors');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const {
  createUser,
  login,
  getCurrentUser,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');

app.use(cors());
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /^(http|https):\/\/(\w+:{0,1}\w*#)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&amp;%#!\-/]))?/,
      ),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

app.use(auth);
app.get('/users/me', getCurrentUser);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('*', () => {
  throw new NotFoundError('Запрашиваемая страница не найдена');
});

app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const {
    statusCode = 500, message,
  } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
