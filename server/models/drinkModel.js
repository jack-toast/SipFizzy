const mongoose = require('mongoose');

const { Schema } = mongoose;

const Drink = new Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    // reviews: {type: Document}
  },
  { timestamps: true }
);

module.exports = mongoose.model('Drink', Drink);
