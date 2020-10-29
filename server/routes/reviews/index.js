const express = require('express');
const createReview = require('./createReview');
const updateReview = require('./updateReview');
const getReviews = require('./getReviews');
const getReview = require('./getReview');
const deleteReview = require('./deleteReview');
const auth = require('../../middlewares/auth');
const deleteFakeReviews = require('./deleteFakeReviews');

const reviews = express.Router();

reviews.get('/', getReviews);
reviews.get('/:reviewId', getReview);
reviews.patch('/:reviewId', auth, updateReview);
reviews.post('/', auth, createReview);

// admin only
reviews.delete('/deleteFakes', auth, deleteFakeReviews);
reviews.delete('/:reviewId', auth, deleteReview);

module.exports = reviews;
