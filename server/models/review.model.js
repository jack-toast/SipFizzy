const mongoose = require('mongoose');
const qualityDef = require('./qualityDef');

const { Schema, SchemaTypes } = mongoose;

const ReviewSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    description: { type: String, required: true, min: 2, max: 1000 },
    drinkId: {
      type: SchemaTypes.ObjectId,
      ref: 'Drink',
      required: true,
      index: true,
    },
    userId: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
    },
    qualities: {
      flavorAccuracy: qualityDef,
      flavorIntensity: qualityDef,
      bubbles: qualityDef,
      body: qualityDef,
      smell: qualityDef,
      sweetness: qualityDef,
      sour: qualityDef,
      bitter: qualityDef,
    },
    score: {
      type: Number,
      required: true,
      default: 69,
      min: 0,
      max: 100,
    },
    meta: {
      upvotes: { type: Number, default: 0 },
      downvotes: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

ReviewSchema.set('toJSON', { virtuals: true });

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
