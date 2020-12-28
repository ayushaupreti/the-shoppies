import React, {Fragment, useState} from "react";
import { useDispatch } from 'react-redux'
import { MoviesActions } from '../store/actions/MoviesActions';
import "./style.css";


export default function Search() {

    const [movieTitle, setMovieTitle] = useState("");
  
    const handleMovieInput = (e) => {
      setMovieTitle(e)
      getMovies(e) //debouncer here
    };

    const dispatch = useDispatch()

    const getMovies = (query) => dispatch(MoviesActions.fetch_movies(query))

      
  return (
      <Fragment>
        <div className="input-group mb-3 mt-5 pt-5">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Movie Title" 
            value={movieTitle} 
            onChange={(e) => handleMovieInput(e.target.value)}/>
        </div>
      </Fragment>
  );
}
