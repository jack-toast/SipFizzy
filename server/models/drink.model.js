/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema, SchemaTypes } = mongoose;

const DrinkSchema = new Schema(
  {
    name: { type: String, required: true },
    ratings: {
      bubbles: Number,
      sweetness: Number,
      flavorIntensity: Number,
      flavorAccuracy: Number,
      overall: Number,
    },
    numRatings: Number,
    abv: Number,
    calories: Number,
    flavors: [String],
    createdBy: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
    },
    editedBy: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

DrinkSchema.virtual('id').get(function idVirtual() {
  return this._id.toHexString();
});

DrinkSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Drink', DrinkSchema);
