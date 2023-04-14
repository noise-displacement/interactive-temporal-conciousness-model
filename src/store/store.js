import { configureStore } from '@reduxjs/toolkit'
import modelReducer from './modelReducers';

export default configureStore({
  reducer: {
    model: modelReducer,
  },
})