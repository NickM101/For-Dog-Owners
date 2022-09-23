import {combineReducers, configureStore} from '@reduxjs/toolkit';

import userReducer from './user/userSlice';

const reducers = combineReducers({
   user: userReducer
})

export const store = configureStore({
  reducer: reducers
});
