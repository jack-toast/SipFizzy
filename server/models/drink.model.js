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
      salty: qualityDef,
      umami: qualityDef,
      bitter: qualityDef,
    },
    score: {
      type: Number,
      default: 69,
      min: 0,
      max: 100,
    },
    numRatings: Number,
    abv: { type: Number, min: 0, max: 100 },
    calories: { type: Number, min: 0, max: 1000 },
    flavors: [String],
    createdBy: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
    },
    editedBy: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
    },
    image: String,
  },
  { timestamps: true }
);

DrinkSchema.virtual('id').get(function idVirtual() {
  return this._id.toHexString();
});

DrinkSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Drink', DrinkSchema);
