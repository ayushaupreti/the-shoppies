import { MoviesActions } from '../actions/MoviesActions';
import { combineReducers } from 'redux';
import produce from 'immer';

const defaultMovieState = {
    list: [], 
    loading: false,
    error: "",
    nominations: []
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
        draft.list = action.response.Search;
        for (let i = 0; i < draft.nominations.length; i++){
          const nominatedMovie = draft.list.find((movie) => movie.imdbID === draft.nominations[i].imdbID)
          const index = draft.list.indexOf(nominatedMovie)
          if(nominatedMovie){
            draft.list[index]["Nominated"] = true
          }
        }
        draft.error = "";
      })
    case MoviesActions.MOVIE_ERROR:
      return produce(state, draft => {
        draft.loading = false;
        draft.list = [];
        draft.error = action.error;
      })
    case MoviesActions.NOMINATE:
      return produce(state, draft => {
        // find movie in movies.list by imdbID
        // put it in nominatedID's
        // for the item clicked, set flag enabled/disabled
        const nominatedMovie = draft.list.find((movie) => movie.imdbID === action.imdbID)
        const index = draft.list.indexOf(nominatedMovie)
        if (nominatedMovie) {
          draft.list[index]["Nominated"] = true
        }
        draft.nominations.push(nominatedMovie)
      })
    default:
      return state
  }
}

const Combined = combineReducers({
  omdb
})

export default Combined
