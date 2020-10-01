const express = require('express');
const createUser = require('./createUser');
const updateUser = require('./updateUser');
const getUsers = require('./getUsers');
const getUser = require('./getUser');
const deleteUser = require('./deleteUser');

const users = express.Router();

users.post('/', createUser);
users.get('/', getUsers);
users.get('/:userId', getUser);
users.put('/:userId', updateUser);
users.delete('/:userId', deleteUser);

module.exports = users;
