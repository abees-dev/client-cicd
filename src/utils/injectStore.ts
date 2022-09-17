import store from '../redux/store';

export const injectStore = () => {
  const { dispatch, getState, replaceReducer, subscribe } = store;
  return {
    dispatch,
    getState,
    replaceReducer,
    subscribe,
  };
};
