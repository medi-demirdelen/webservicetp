const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');
const auth = require('../middlewares/auth');

router.get('/', [auth], itemController.getItem);
router.get('/:id', [auth], itemController.getItemById);

module.exports = router;