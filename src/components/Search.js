import React, {Fragment, useState} from "react";
import { useDispatch } from 'react-redux'
import { MoviesActions } from '../store/actions/MoviesActions';
import "./style.css";


export default function Search() {

  const [movieTitle, setMovieTitle] = useState("");
  const [timer, setTimer] = useState()

  var debounce = function (title, delay) {
    clearTimeout(timer);
    const newtimer = setTimeout(() => {
      getMovies(title)
    }, delay)
    setTimer(newtimer)
  };

  const handleMovieInput = (e) => {
    setMovieTitle(e)
    debounce(e, 200)
  };

  const dispatch = useDispatch()

  const getMovies = (query) => dispatch(MoviesActions.fetch_movies(query))
      
  return (
    <Fragment>
      <h6>Search for your favourite movie and nominate it!</h6>
      <div className="card bg-secondary mb-3">
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
