const mongoose = require('mongoose');

const { Schema, SchemaTypes } = mongoose;

const reviewSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: { type: String },
    drinkID: {
      type: SchemaTypes.ObjectId,
      ref: 'Drink',
      required: true,
      index: true,
    },
    userID: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    ratings: {
      bubbles: Number,
      sweetness: Number,
      flavorIntensity: Number,
      flavorAuth: Number,
      flavorTruth: Number,
    },
    meta: {
      upvotes: Number,
      downvotes: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
