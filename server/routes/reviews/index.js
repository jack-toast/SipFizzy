const express = require('express');
const createReview = require('./createReview');
const updateReview = require('./updateReview');
const getReviews = require('./getReviews');
const getReview = require('./getReview');
const deleteReview = require('./deleteReview');
const auth = require('../../middlewares/auth');

const reviews = express.Router();

reviews.post('/', auth, createReview);
reviews.get('/', getReviews);
reviews.get('/:reviewId', getReview);
reviews.patch('/:reviewId', updateReview);
reviews.delete('/:reviewId', deleteReview);

module.exports = reviews;
