const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema, SchemaTypes } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: [true, 'cant be blank'],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      unique: true,
      uniqueCaseInsensitive: true,
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      unique: true,
      uniqueCaseInsensitive: true,
      index: true,
    },
    reviews: [{ type: SchemaTypes.ObjectId, ref: 'Review' }],
    bio: String,
    image: String,
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
