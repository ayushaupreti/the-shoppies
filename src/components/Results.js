import React, {Fragment, useState} from "react";
import { useSelector } from 'react-redux'
import "./style.css";


export default function Results() {

    const omdb = useSelector(state => state.movies.omd)
      
  return (
      <Fragment>
          <div className="card cards" >
              <div className="card-body">
                  <h5 className="card-title">Movie Title</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Year of Release</h6>
                  <p className="card-text">This will be the short plot of the movie returned.</p>
                  <button className="btn btn-outline-secondary" type="button">Nominate</button>
              </div>
          </div>
      </Fragment>
  );
}
