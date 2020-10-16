import React from 'react';
import useHasAccess from '../Hooks/useHasAccess';

type Props = {
  children: React.ReactElement;
  childrenLoading?: React.ReactElement;
  childrenNoAccess?: React.ReactElement;
  waitForError?: boolean;
};

const AccessControl: React.FC<Props> = ({
  children = null,
  childrenLoading = null,
  childrenNoAccess = null,
  waitForError = false,
}) => {
  const { hasAccess, loading } = useHasAccess({ waitForError });

  if (loading) return childrenLoading || null;
  if (!hasAccess) return childrenNoAccess;
  return children;
};

export default AccessControl;
