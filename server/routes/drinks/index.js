const drinks = require('express').Router();
const createDrink = require('./createDrink');
const getDrinks = require('./getDrinks');
const getDrink = require('./getDrink');
const updateDrink = require('./updateDrink');
const deleteDrink = require('./deleteDrink');

// In CRUDDY order
drinks.post('/', createDrink);
drinks.get('/', getDrinks);
drinks.get('/:drinkId', getDrink);
drinks.patch('/:drinkId', updateDrink);
drinks.delete('/:drinkId', deleteDrink);

module.exports = drinks;
