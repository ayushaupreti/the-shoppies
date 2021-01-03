import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { MoviesActions } from '../store/actions/MoviesActions';
import "./style.css";

export default function Nominations() {
    const nominations = useSelector(state => state.movies.omdb.nominations)
    const loading = useSelector(state => state.movies.omdb.loading)
    const dispatch = useDispatch()

    // seEffect(() => {
    //     try {
    //         if (nominations !== undefined) {
    //             localStorage.setItem('nominationList', JSON.stringify(nominations));
    //         } 
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [nominations]);

    // useEffect(() => {
    //     const storedNominations = localStorage.getItem('nominationList')
    //     if(storedNominations){
    //         const parsedNominations = JSON.parse(storedNominations)
    //         // eslint-disable-next-line
    //         dispatch(MoviesActions.restore_nominations(parsedNominations))
    //     }
    // }, [dispatch])


    function NominationsComplete(){
        return (
            <div className="alert alert-success alert-dismissible fade show mt-4" role="alert">
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
                        <li key={"nomination"+nomination["imdbID"]} className="list-group-item nomination bg-secondary">
                            <div className="row"> 
                                <div className="col-10 pull-left">
                                    <h6 className="mb-1">
                                        <strong>{nomination["Title"]} </strong> ({nomination["Year"]})
                                    </h6>
                                </div>
                                <div className="col-2 d-flex justify-content-end">
                                    <button type="button" className="close" data-dismiss="alert" onClick={() => dispatch(MoviesActions.remove_nomination(nomination["imdbID"]))}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                        </li>
                    )
                }
                )}
            </div>
        )
    }

    return (
        <div>
            {nominations !== undefined && nominations.length >= 5 && <NominationsComplete />}
            <div className="card nomination-card bg-secondary h-100 my-4">
                <div className="card-body">
                    <h3>Your Nominations</h3>
                    {!loading && nominations !== undefined && <Nomination />}
                </div>
            </div>
        </div>
    );
}
