const router = require('express').Router();
const {
  getCards, createCard, removeCard, addLike, deleteLike,
} = require('../controllers/card');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', removeCard);
router.put('/:cardId/likes', addLike);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
