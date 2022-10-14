import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { locationPersist, userPersist } from '../utils/persistConfig';
import userReducer from './slice/auth.slice';
import locationReducer from './slice/location.slice';
import friendWaitingReducer from './slice/friendWaiting.slice';
import userRecommendReducer from './slice/userRecommend.slice';
import modalReducer from './slice/modal.slice';
import receiverReducer from './slice/receiver.slice';
const rootReducer = combineReducers({
  auth: persistReducer(userPersist, userReducer),
  location: persistReducer(locationPersist, locationReducer),
  friendWaiting: friendWaitingReducer,
  userRecommend: userRecommendReducer,
  modal: modalReducer,
  receiver: receiverReducer,
});

export default rootReducer;
