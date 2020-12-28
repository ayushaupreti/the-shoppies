import React, {Fragment, useState} from "react";
import { debounce } from 'throttle-debounce';
import "./style.css";


export default function Search() {

    const [movieTitle, setMovieTitle] = useState("");
  
    const handleMovieInput = (e) => {
      setMovieTitle(e)
      console.log(movieTitle)

      const apiUrl = 'http://www.omdbapi.com/?apikey=cd1dfb3a&s='+movieTitle;
        fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => console.log('This is your data', data));
    };

    // const handleMovieInput = debounce(500, (e) => {
    //   setMovieTitle(e)
    //   console.log(movieTitle)

    //   const apiUrl = 'http://www.omdbapi.com/?apikey=cd1dfb3a&s='+movieTitle;
    //     fetch(apiUrl)
    //   .then((response) => response.json())
    //   .then((data) => console.log('This is your data', data));
    // });

      
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
