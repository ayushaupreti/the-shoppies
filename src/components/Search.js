import React, {Fragment, useState} from "react";
import {InputGroup, FormControl} from "react-bootstrap"
import "./style.css";


export default function Search() {

    const movieTitle = "";

    const getMovies = () => {
        const apiUrl = 'http://www.omdbapi.com/?apikey=cd1dfb3a&t=h';
        fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => console.log('This is your data', data));
    }
      
  return (
      <Fragment>
        <InputGroup size="md">
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg">Large</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
                value={movieTitle}
                onChange={(e) => {
                    getMovies();
                  }}
            />
        </InputGroup>
      </Fragment>
  );
}
