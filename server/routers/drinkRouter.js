const express = require('express');
const DrinkCtrl = require('../controllers/drinkCtrl');

const router = express.Router();

// In CRUDDY order
router.post('/drink', DrinkCtrl.createDrink);
router.get('/drinks', DrinkCtrl.getDrinks);
router.get('/drink/:id', DrinkCtrl.getDrinkByID);
router.put('/drink/:id', DrinkCtrl.updateDrink);
router.delete('/drink/:id', DrinkCtrl.deleteDrinkByID);

module.exports = router;
