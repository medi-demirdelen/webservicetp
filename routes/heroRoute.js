const express = require('express');
const router = express.Router();

const heroController = require('../controllers/heroController');
const auth = require('../middlewares/auth');

router.get('/', [auth], heroController.getHero);
router.get('/:id', [auth], heroController.getHeroById);
router.put('/:id/losehp/:hp', [auth], heroController.loseHp);
router.put('/:id/gainhp/:hp', [auth], heroController.gainHp);
router.put('/:id/gainxp/:xp', [auth], heroController.gainXp);

module.exports = router;