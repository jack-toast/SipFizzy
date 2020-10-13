/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const qualityDef = require('./qualityDef');

const { Schema, SchemaTypes } = mongoose;

const DrinkSchema = new Schema(
  {
    name: { type: String, required: true },
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
      default: 69,
      min: 0,
      max: 100,
    },
    numRatings: { type: Number, default: 0, min: 0 },
    abv: { type: Number, min: 0, max: 100, default: 5 },
    calories: { type: Number, min: 0, max: 1000, default: 100 },
    flavors: [String],
    createdBy: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
    },
    editedBy: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
    },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

DrinkSchema.set('toJSON', { virtuals: true });

const Drink = mongoose.model('Drink', DrinkSchema);
module.exports = Drink;
