import store from '../redux/store';

export const getToken = () => {
  const { getState } = store;
  return getState().auth.accessToken || '';
};
