import React, {Fragment, useState} from "react";
import { useDispatch } from 'react-redux'
import { debounce } from 'throttle-debounce';
// import { throttle } from 'throttle-debounce';
import { MoviesActions } from '../store/actions/MoviesActions';
import "./style.css";


export default function Search() {

  const [movieTitle, setMovieTitle] = useState("");

  const debounceFunc = debounce(2000, false, (e) => {
    getMovies(e)
  });

  // const throttleFunc = throttle(100, (e) => {
  //   getMovies(e)
  // });
  
  const handleMovieInput = (e) => {
    setMovieTitle(e)
    debounceFunc(e)
    // throttleFunc(e)
    // getMovies(e)
  };

  const dispatch = useDispatch()

  const getMovies = (query) => dispatch(MoviesActions.fetch_movies(query))

      
  return (
    <Fragment>
      <h6>Search for your favourite movie and nominate it!</h6>
      <div className="card cards mb-3">
        <div className="card-body">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search movies..."
              value={movieTitle}
              onChange={(e) => handleMovieInput(e.target.value)} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
