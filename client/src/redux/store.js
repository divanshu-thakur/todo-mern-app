import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import todoSlice from './slices/todoSlice';
import uiSlice from './slices/uiSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    todos: todoSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;
