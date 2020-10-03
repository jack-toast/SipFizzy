const mongoose = require('mongoose');

const { Schema, SchemaTypes } = mongoose;

const drinkSchema = new Schema(
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

module.exports = mongoose.model('Drink', drinkSchema);
