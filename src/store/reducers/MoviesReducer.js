import { MoviesActions } from '../actions/MoviesActions';
import { combineReducers } from 'redux';
import produce from 'immer';

const defaultMovieState = {
    list: [], 
    loading: false,
    error: "",
    nominations: undefined,
    previouslyRemovedNominations: []
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
        if (draft.nominations !== undefined) {
          for (let i = 0; i < draft.nominations.length; i++) {
            const nominatedMovie = draft.list.find((movie) => movie.imdbID === draft.nominations[i].imdbID)
            const index = draft.list.indexOf(nominatedMovie)
            if (nominatedMovie) {
              let newList = [...draft.list]
              newList[index]["Nominated"] = true
              draft.list = newList
            }
          }
          for (let i = 0; i < draft.previouslyRemovedNominations.length; i++) {
            const removedNomination = draft.list.find((movie) => movie.imdbID === draft.previouslyRemovedNominations[i].imdbID)
            if (removedNomination) {
              const index = draft.list.indexOf(removedNomination)
              let newList = [...draft.list]
              newList[index]["Nominated"] = false
              draft.list = newList
            }
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
        if (draft.nominations === undefined){
          const newNominations = []
          newNominations.push(nominatedMovie)
          draft.nominations = newNominations
        } else{
          draft.nominations.push(nominatedMovie) 
        }
        let newList = [...draft.list]
        newList[index]["Nominated"] = true
        draft.list = newList
      })
    case MoviesActions.NOMINATION_REMOVAL:
      return produce(state, draft => {
        const removedNomination = draft.nominations.find((movie) => movie.imdbID === action.imdbID)
        const nominationInMovies = draft.list.find((movie) => movie.imdbID === action.imdbID)
        if (nominationInMovies){
          const indexInMovies = draft.list.indexOf(nominationInMovies)
          let newList = [...draft.list]
          newList[indexInMovies]["Nominated"] = false
          draft.list = newList
        } else {
          draft.previouslyRemovedNominations.push(removedNomination)
        }

        let newNominations = [...draft.nominations]
        const indexOfNomination = draft.nominations.indexOf(removedNomination)
        newNominations.splice(indexOfNomination, 1)
        draft.nominations = newNominations
      })
    case MoviesActions.RESTORE_NOMINATIONS:
      return produce(state, draft => {
        draft.nominations = action.nominationList
      })
    default:
      return state
  }
}

const Combined = combineReducers({
  omdb
})

export default Combined
