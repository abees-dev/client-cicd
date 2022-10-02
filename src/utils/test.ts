import { useLogout } from '../redux/slice/auth.slice';
import store from '../redux/store';

export const LogoutTest = () => {
  store.dispatch(useLogout());
};
