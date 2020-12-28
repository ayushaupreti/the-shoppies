import { combineReducers } from 'redux';

import MoviesReducer from './MoviesReducer';

const createRootReducer = () => combineReducers({
    movies: MoviesReducer
})

export default createRootReducer