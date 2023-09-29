import { configureStore } from '@reduxjs/toolkit';
import conceptAi from './concept-ai.js';

export default configureStore({
  reducer: {
    conceptAi
  }
});