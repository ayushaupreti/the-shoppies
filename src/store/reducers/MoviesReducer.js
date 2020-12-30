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
        const nominatedMovie = draft.list.find((movie) => movie.imdbID === action.imdbID)
        const index = draft.list.indexOf(nominatedMovie)
        if (nominatedMovie) {
          draft.list[index]["Nominated"] = true
        }
        draft.nominations.push(nominatedMovie)
      })
    case MoviesActions.NOMINATION_REMOVAL:
      return produce(state, draft => {
        const removedNomination = draft.nominations.find((movie) => movie.imdbID === action.imdbID)
        const index = draft.nominations.indexOf(removedNomination)
        draft.nominations.splice(index, 1)
        if (removedNomination) {
          draft.list[index]["Nominated"] = false
        }
      })
    default:
      return state
  }
}

const Combined = combineReducers({
  omdb
})

export default Combined
