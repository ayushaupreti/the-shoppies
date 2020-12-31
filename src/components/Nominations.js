import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { MoviesActions } from '../store/actions/MoviesActions';
import "./style.css";

export default function Nominations() {
    const nominations = useSelector(state => state.movies.omdb.nominations)
    const loading = useSelector(state => state.movies.omdb.loading)
    const dispatch = useDispatch()

    function NominationsComplete(){
        return (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                <h5>Congratulations!</h5> 
                <h6>You have nominated 5 movies!</h6>
            </div>
        )
    }

    function Nomination() {
        return (
            <div className="list-group list-group-flush">
                {nominations.map((nomination) => {
                    return (
                        <li key={"nomination"+nomination["imdbID"]} className="list-group-item d-flex justify-content-between align-items-center nomination bg-secondary">
                            <div className=" row d-flex w-100">
                                <h6 className="mb-1">
                                    <strong>{nomination["Title"]} </strong> ({nomination["Year"]})
                                </h6>
                            </div>
                            <button type="button" className="close" data-dismiss="alert" onClick={() => dispatch(MoviesActions.remove_nomination(nomination["imdbID"]))}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </li>
                    )
                }
                )}
            </div>
        )
    }

    return (
        <div className="card nomination-card bg-secondary h-100 my-4">
            {nominations.length >= 5 && <NominationsComplete />}
            <div className="card-body">
                <h3>Your Nominations</h3>
                {!loading && nominations && <Nomination />}
            </div>
        </div>
    );
}
