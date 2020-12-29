import React, {Fragment, useState} from "react";
import { useSelector } from 'react-redux'
import "./style.css";


export default function Results() {
  const movieList = useSelector(state => state.movies.omdb.list)
  const loading = useSelector(state => state.movies.omdb.loading)
  const error = useSelector(state => state.movies.omdb.error)

    function Loader() {
        return (
            <div className="spinner-border m-5" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    function Box() { 
        return(
            <div class="list-group">
                {movieList.map((movie) => {
                    return (
                        // <div className="col col-xs-12 col-md-6 col-lg-4 pb-3">
                        //     <div className="card cards h-100">
                        //         <div className="card-body">
                        //             <h5 className="card-title">{movie["Title"]}</h5>
                        //             <h6 className="card-subtitle mb-2 text-muted">{movie["Year"]}</h6>
                        //             <button type="button" className="btn btn-secondary">Nominate</button>
                        //         </div>
                        //     </div>
                        // </div>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <div className=" row d-flex w-100">
                                <h5 className="mb-1">{movie["Title"]}</h5>
                            </div>
                            <div className=" row d-flex w-100">
                                <small>{movie["Year"]}</small>
                            </div>
                            <button type="button" className="btn btn-secondary">Nominate</button>
                        </li>
                    )
                        }
                    )}
            </div>
        )
    }


      
  return (
    <Fragment>
        <h5>Results</h5>
          { loading && <Loader />}
          { !loading && error && <p>error</p>}
          {!loading && movieList && movieList[0] && <Box />}
          {/* { !loading && movieList && movieList[0] 
            ? <Box />
            : <p>empty</p>
          } */}
    </Fragment>
  );
}
