const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Некорректный id: ${req.params.userId}` });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: `Пользователь по указанному id: ${req.params.userId} не найден` });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.card._id } }, { new: true })
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Некорректный id: ${req.params.cardId}` });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: `Карточка по указанному id: ${req.params.cardId} не найдена` });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.card._id } }, { new: true })
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Некорректный id: ${req.params.cardId}` });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: `Карточка по указанному id: ${req.params.cardId} не найдена` });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
