import PropTypes from 'prop-types';

const review = PropTypes.shape({
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  drinkId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  qualities: PropTypes.shape({
    flavorAccuracy: PropTypes.number.isRequired,
    flavorIntensity: PropTypes.number.isRequired,
    bubbles: PropTypes.number.isRequired,
    body: PropTypes.number.isRequired,
    smell: PropTypes.number.isRequired,
    sweetness: PropTypes.number.isRequired,
    sour: PropTypes.number.isRequired,
    bitter: PropTypes.number.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    upvotes: PropTypes.number.isRequired,
    downvotes: PropTypes.number.isRequired,
  }).isRequired,
});

const drink = PropTypes.shape({
  qualities: PropTypes.shape({
    flavorAccuracy: PropTypes.number.isRequired,
    flavorIntensity: PropTypes.number.isRequired,
    bubbles: PropTypes.number.isRequired,
    body: PropTypes.number.isRequired,
    smell: PropTypes.number.isRequired,
    sweetness: PropTypes.number.isRequired,
    sour: PropTypes.number.isRequired,
    bitter: PropTypes.number.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  numRatings: PropTypes.number.isRequired,
  abv: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  flavors: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
  editedBy: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  __v: PropTypes.number,
  id: PropTypes.string.isRequired,
});

const MyPropTypes = {
  review,
  drink,
};

export default MyPropTypes;
