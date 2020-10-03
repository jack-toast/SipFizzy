const { isArray } = require('lodash');

module.exports = (reviews) => {
  return reviews && isArray(reviews);
};
