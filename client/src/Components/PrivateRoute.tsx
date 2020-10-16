import React from 'react';
import { Redirect, Route } from 'react-router-dom';
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
}: PrivateRouteProps) => {
  const { hasAccess, loading } = useHasAccess({ waitForError });

  if (loading) return null;
  return <Route {...rest}>{hasAccess ? children : <Redirect to={redirect} />}</Route>;
};

export default PrivateRoute;
