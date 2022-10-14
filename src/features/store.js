import {combineReducers, configureStore} from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import userReducer from '../features/user/userSlice';
import postReducer from '../features/posts/postSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const reducer = combineReducers({user: userReducer, post: postReducer});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
