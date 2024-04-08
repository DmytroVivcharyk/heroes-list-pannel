import { configureStore  } from '@reduxjs/toolkit';
import heroesReducer from './reducers/heroesReducer';

const store = configureStore({
    reducer: heroesReducer
})

export default store