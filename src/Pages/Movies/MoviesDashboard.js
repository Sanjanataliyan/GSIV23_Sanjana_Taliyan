import React, { useEffect, useState } from 'react'
import { baseImageURL, getAllMoviesList } from '../../Services/MoviesDashboardService'
import { Tooltip } from 'react-tooltip';
import Header from '../Header/Header';
const description = (text) => {
    <Tooltip>
        <p>text</p>
    </Tooltip>
}
export default function MoviesDashboard(props) {
    const [moviesList, setMoviesList] = useState([]);
    const [moviesListSafe, setMoviesListSafe] = useState([]);
    useEffect(() => {
        // calling the method when page is rendered
        GetAllMoviesList();
    }, [])
    const GetAllMoviesList = () => {
        // getting all the movie details
        getAllMoviesList().then((response) => {
            let movies = [...response.data.results]
            const moviesList = movies.sort((a, b) => a.release_date > b.release_date ? -1 : 1);
            setMoviesList(moviesList);
            setMoviesListSafe(moviesList);
        }).catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser 
              // and an instance of http.ClientRequest in node.js
            } else {
              // Something happened in setting up the request that triggered an Error
              alert(error.message)
            }
           
          })
    }
    const getMovieDetails=(id)=>{
        // redirecting to the detail page when clicked
        props.history.push({
            pathname:"/moviedetails",
            movieId:id
        })
    }
    return (
        <div>
            <Header parentCallback={(movies) => movies===""?setMoviesList(moviesListSafe):setMoviesList(movies)} history={props.history}/>
            <div className='container movieDiv'>
                <div className='row '>
                    {moviesList.map((movie,index) => {
                        return (
                            <div className='col-3' data-testid="movie" key={index}>
                                <div class="card" onClick={e=>getMovieDetails(movie.id)}>
                                    <img src={baseImageURL + movie.poster_path} class="card-img-top" />
                                    <div class="card-body">
                                        <div className='d-flex col-12'>
                                            <p class="card-title col-6 movieTitle" >{movie.original_title}</p>
                                            <p class="card-text col-6 rating">({movie.vote_average})</p>
                                        </div>
                                        <p class="card-text">{movie.overview}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
