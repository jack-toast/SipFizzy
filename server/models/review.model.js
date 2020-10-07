const mongoose = require('mongoose');
const qualityDef = require('./qualityDef');

const { Schema, SchemaTypes } = mongoose;

const reviewSchema = new Schema(
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
    qualities: {
      flavorAccuracy: qualityDef,
      flavorIntensity: qualityDef,
      bubbles: qualityDef,
      body: qualityDef,
      smell: qualityDef,
      sweetness: qualityDef,
      sour: qualityDef,
      // salty: qualityDef,
      // umami: qualityDef,
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
      upvotes: Number,
      downvotes: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
