import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

import headerSlice from '../redux/slices/headerSlice';
import modalSlice from '../redux/slices/modalSlice';
import customerSlice from '../redux/slices/customerSlice';

const rootReducer = combineReducers({
  header: headerSlice,
  modal: modalSlice,
  customer: customerSlice
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['customer']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
