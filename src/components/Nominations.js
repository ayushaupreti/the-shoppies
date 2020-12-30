import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { MoviesActions } from '../store/actions/MoviesActions';
import "./style.css";

export default function Nominations() {
    const nominations = useSelector(state => state.movies.omdb.nominations)
    const loading = useSelector(state => state.movies.omdb.loading)
    const error = useSelector(state => state.movies.omdb.error)
    const dispatch = useDispatch()

    function NominationsComplete(){
        return (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Congratulations!</strong> You have nominated 5 movies!
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }

    function Nomination() {
        return (
            <div className="list-group list-group-flush">
                {nominations.map((nomination) => {
                    return (
                        <li className="list-group-item d-flex justify-content-between align-items-center nomination">
                            <div className=" row d-flex w-100">
                                <h5 className="mb-1">
                                    <strong>{nomination["Title"]} </strong> <h7>({nomination["Year"]})</h7>
                                </h5>
                            </div>
                            {/* <div className=" row d-flex w-100">
                                <small>{nomination["Year"]}</small>
                            </div> */}
                            <button type="button" className="close" data-dismiss="alert" onClick={() => dispatch(MoviesActions.remove_nomination(nomination["imdbID"]))}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            {/* <button type="button" className="btn btn-secondary">Nominate</button> */}
                        </li>
                    )
                }
                )}
            </div>
        )
    }

    return (
        <div className="card nomination-card h-100">
            {nominations.length === 5 && <NominationsComplete />}
            <div className="card-body">
                <h3>Your Nominations</h3>
                {!loading && error && <p>error</p>}
                {!loading && nominations && nominations[0] && <Nomination />}
            </div>
        </div>
    );
}
