import { get } from 'lodash';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

const useHasAccess = ({ waitForError = false } = {}) => {
  const auth = useSelector((state) => state.auth);
  const isAdmin = useMemo(() => get(auth, 'currentUser.isAdmin', false), [auth]);

  useEffect(() => {
    console.log('auth', auth);
    return undefined;
  }, [auth]);

  const loading = useMemo(() => {
    if (isAdmin) return false;
    const { loading: authLoading, error } = auth;
    if (authLoading !== 'idle') return true;
    return waitForError && error === null;
  }, [isAdmin, auth]);

  return {
    hasAccess: isAdmin,
    loading,
  };
};

export default useHasAccess;
