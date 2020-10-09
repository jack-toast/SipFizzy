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
  meta: PropTypes.shape({
    upvotes: PropTypes.number.isRequired,
    downvotes: PropTypes.number.isRequired,
  }).isRequired,
});

const MyPropTypes = {
  review,
};

export default MyPropTypes;
