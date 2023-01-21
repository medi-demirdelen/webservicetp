const express = require('express');
const router = express.Router();

const enemyController = require('../controllers/enemyController');
const auth = require('../middlewares/auth');

router.get('/', [auth], enemyController.getEnemy);
router.get('/:id', [auth], enemyController.getEnemyById);
router.put('/:id/losehp/:hp', [auth], enemyController.loseHp);

module.exports = router;