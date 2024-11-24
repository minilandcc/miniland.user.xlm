import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/transferReducer';
import networkReducer from '../reducers/networkReducer';

const store = configureStore({
  reducer: {
    transfer: rootReducer,
    network: networkReducer, // Define network slice and its reducer
  },
  // Optionally, you can pass other options such as middleware, devTools, etc.
});

export default store;
