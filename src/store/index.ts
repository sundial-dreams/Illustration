import {configureStore} from '@reduxjs/toolkit';
import store from './store';
export default configureStore({
  reducer: store,
});
