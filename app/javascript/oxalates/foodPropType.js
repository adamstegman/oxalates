import PropTypes from 'prop-types';

export const foodPropType = PropTypes.shape({
  id: PropTypes.node,
  name: PropTypes.string.isRequired,
  oxalateMg: PropTypes.number.isRequired,
  serving: PropTypes.string.isRequired,
});
