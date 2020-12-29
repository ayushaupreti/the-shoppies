import { MoviesActions } from '../actions/MoviesActions';
import { combineReducers } from 'redux';
import produce from 'immer';

const defaultMovieState = {
    list: [], 
    loading: false,
    error: "",
    nominated: false
}

const omdb = (state = defaultMovieState, action) => {
  switch (action.type) {
    case MoviesActions.MOVIE_CLEAR:
      return defaultMovieState
    case MoviesActions.MOVIE_REQUEST:
      return produce(state, draft => {
        draft.loading = true;
      })
    case MoviesActions.MOVIE_SUCCESS:
      return produce(state, draft => {
        draft.loading = false;
        if(action.response.Search){
          draft.list = action.response.Search;
        }
        draft.error = "";
      })
    case MoviesActions.MOVIE_ERROR:
      return produce(state, draft => {
        draft.loading = false;
        draft.list = [];
        draft.error = action.error;
      })
    default:
      return state
  }
}

const Combined = combineReducers({
  omdb
})

export default Combined
