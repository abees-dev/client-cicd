import { useLogout } from '../redux/slice/auth.slice';
import store from '../redux/store';

export const LogoutTest = () => {
  console.log('first');
  store.dispatch(useLogout());
};
