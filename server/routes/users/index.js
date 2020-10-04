const express = require('express');
const createUser = require('./createUser');
const updateUser = require('./updateUser');
const getUsers = require('./getUsers');
const getUser = require('./getUser');
const deleteUser = require('./deleteUser');
const syncUserReviews = require('./syncUserReviews');

// Look to github API for reference
// https://docs.github.com/en/free-pro-team@latest/rest/reference/users
// Look at the status codes they return for the patch actions

const users = express.Router();

// Auth actions
users.post('/signup', createUser);
// users.post('/login', userLogin);
// users.get('/user', getAuthedUser);
// users.patch('/user', updateAuthedUser);
// users.ost

// List users
users.get('/users', getUsers);
// Get public user info
// Should change to "/users/{username}" bc usernames are human-readable and indexed
users.get('/users/:userId', getUser);
users.patch('/users/:userId', updateUser); // should delete
users.delete('/users/:userId', deleteUser); // admin only
users.patch('/users/:userId/reviewsync', syncUserReviews); // shouldnt be necessary...

module.exports = users;
