import { useMemo } from 'react';

import { useTypedSelector } from '../Redux/store';

const useHasAccess = ({ waitForError = false } = {}) => {
  const {
    currentUser: { isAdmin },
    loading: authLoading,
    error,
  } = useTypedSelector((state) => state.auth);

  const loading = useMemo(() => {
    if (isAdmin) return false;
    if (authLoading !== 'idle') return true;
    return waitForError && error === null;
  }, [isAdmin, authLoading, error, waitForError]);

  return {
    hasAccess: !!isAdmin,
    loading,
  };
};

export default useHasAccess;
