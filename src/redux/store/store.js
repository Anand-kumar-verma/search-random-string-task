import { configureStore } from '@reduxjs/toolkit';
import alphabetTaskReducer from '../slices/counterSlice';

export default configureStore({
  reducer: {
    alphabetTask:alphabetTaskReducer,
  },
});
