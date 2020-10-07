import PropTypes from 'prop-types';
import useHasAccess from '../Hooks/useHasAccess';

const AccessControl = ({
  children,
  waitForError,
  childrenLoading,
  childrenNoAccess,
}) => {
  const { hasAccess, loading } = useHasAccess({ waitForError });
  if (loading) return childrenLoading;
  if (!hasAccess) return childrenNoAccess;
  return children;
};

AccessControl.propTypes = {
  children: PropTypes.node.isRequired,
  childrenLoading: PropTypes.node,
  childrenNoAccess: PropTypes.node,
};

AccessControl.defaultProps = {
  childrenLoading: null,
  childrenNoAccess: null,
};

export default AccessControl;
