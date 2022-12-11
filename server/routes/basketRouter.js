const Router = require('express');
const router = new Router();

const basketController = require('../controllers/basketController');

const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, basketController.getBasketUser);
router.post('/', authMiddleware, basketController.addToBasket);
router.post('/delete', basketController.deleteBasket);
router.post('/deleteAll', basketController.deleteAllBasket);

module.exports = router;
