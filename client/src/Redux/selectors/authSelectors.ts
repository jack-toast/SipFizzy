import { CurrentUser } from '../../MyTypes/user';
import { RootState } from '../store';

const selectCurrentUser = (state: RootState): CurrentUser | null => state.auth.currentUser;

export { selectCurrentUser };
