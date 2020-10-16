import { get } from 'lodash';
import { useMemo } from 'react';
import { useTypedSelector } from '../Redux/store';

type UseHasAccessArgs = {
  waitForError?: boolean;
};

type UseHasAccess = {
  hasAccess: boolean;
  loading: boolean;
};

const useHasAccess = ({ waitForError = false }: UseHasAccessArgs = {}): UseHasAccess => {
  const auth = useTypedSelector((state) => state.auth);
  const isAdmin = useMemo(() => get(auth, 'currentUser.isAdmin', false), [auth]);

  const loading = useMemo(() => {
    if (isAdmin) return false;
    const { loading: authLoading, error } = auth;
    if (authLoading !== 'idle') return true;
    return waitForError && error === null;
  }, [isAdmin, auth, waitForError]);

  return {
    hasAccess: isAdmin,
    loading,
  };
};

export default useHasAccess;
