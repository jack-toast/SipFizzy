import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import useHasAccess from '../Hooks/useHasAccess';

type PrivateRouteProps = {
  waitForError?: boolean;
  children: React.ReactNode;
  redirect?: string;
  path: string;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  waitForError,
  redirect = '/',
  children,
  ...rest
}) => {
  const { hasAccess, loading } = useHasAccess({ waitForError });

  if (loading) return null;
  return <Route {...rest}>{hasAccess ? children : <Redirect to={redirect} />}</Route>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirect: PropTypes.string,
  waitForError: PropTypes.bool,
};

PrivateRoute.defaultProps = {
  redirect: '/',
  waitForError: false,
};

export default PrivateRoute;
