const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const { Schema, SchemaTypes } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'cant be blank'],
      match: [
        /^[a-zA-Z0-9_-]+$/,
        'Invalid username. Only a-z, A-Z, 0-9, _, or - allowed ',
      ],
      unique: true,
      uniqueCaseInsensitive: true,
      index: true,
      minlength: 2,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      unique: true,
      uniqueCaseInsensitive: true,
      index: true,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
    hash: {
      type: String,
      select: false,
    },
    reviews: [{ type: SchemaTypes.ObjectId, ref: 'Review' }],
    bio: String,
    image: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      visibleFields: 'username reviews isAdmin image bio',
    },
    toObject: {
      visibleFields: 'username reviews isAdmin image bio',
    },
  }
);

// JY TODO - Think about adding methods to UserSchema to make udpating fields easier.
// This would reduce boilerplate elsewhere.
// Ex: two endpoints both update the user's bio field.

// how to generate JWT_PRIVATE_KEY
// crypto.randomBytes(64).toString('hex'))

UserSchema.methods.generateAuthToken = () => {
  return jwt.sign(
    // eslint-disable-next-line no-underscore-dangle
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_PRIVATE_KEY
  );
};

const generateHash = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.setPassword = function setPassword(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = generateHash(password, this.salt);
};

UserSchema.methods.checkPassword = function checkPassword(password) {
  return this.hash === generateHash(password, this.salt);
};

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
