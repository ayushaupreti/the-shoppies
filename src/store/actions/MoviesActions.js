const MOVIE_REQUEST = 'MOVIE::REQUEST'
const MOVIE_CLEAR = 'MOVIE::CLEAR'
const MOVIE_SUCCESS = 'MOVIE::SUCCESS'
const MOVIE_ERROR = 'MOVIE::ERROR'

const NOMINATE = 'NOMINATE'


const clear_movies = () => {
    return { type: MOVIE_CLEAR }
}

const fetch_movies = (query) => {
    return dispatch => {
        dispatch(request())
        const apiUrl = 'http://www.omdbapi.com/?apikey=cd1dfb3a&s='+query;
        fetch(apiUrl).then((response) => response.json())
        .then((data) => dispatch(success(data)))
        .catch(err => {
            dispatch(failure(err));
        })
    };

    function request() { return { type: MOVIE_REQUEST } }
    function success(response) { return { type: MOVIE_SUCCESS, response } }
    function failure(error) { return { type: MOVIE_ERROR, error } }
}

const nominate = (imdbID) => {
    return { type: NOMINATE, imdbID } 
}


export const MoviesActions = {
    clear_movies,
    fetch_movies,
    nominate,

    MOVIE_REQUEST,
    MOVIE_CLEAR,
    MOVIE_SUCCESS,
    MOVIE_ERROR,
    NOMINATE
};

