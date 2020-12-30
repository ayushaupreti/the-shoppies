import React, {Fragment} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { MoviesActions } from '../store/actions/MoviesActions';
import "./style.css";


export default function Results() {
  const movieList = useSelector(state => state.movies.omdb.list)
  const loading = useSelector(state => state.movies.omdb.loading)
  const error = useSelector(state => state.movies.omdb.error)
  const dispatch = useDispatch()
  
  function Loader() {
      return (
      <div className="spinner-border m-5" role="status">
          <span className="sr-only">Loading...</span>
      </div>
     );
    }

    function Box() { 
        return(
            <div className="list-group">
                {movieList.map((movie) => {
                    return (
                        <li key={"movie" + movie["imdbID"]} className="list-group-item d-flex justify-content-between align-items-center">
                            <div className=" row d-flex w-100">
                                <h6 className="mb-1">
                                    <strong>{movie["Title"]} </strong> ({movie["Year"]})
                                </h6>
                            </div>
                            <button type="button" className="btn btn-secondary" disabled={movie["Nominated"]} onClick={() => dispatch(MoviesActions.nominate(movie["imdbID"]))} >Nominate</button>
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
