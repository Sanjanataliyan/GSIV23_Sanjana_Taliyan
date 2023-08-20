import React, { useEffect, useState } from 'react'
import { baseImageURL, getMovieCastDetailsById, getMovieDetailsById } from '../../Services/MoviesDashboardService'
import Header from '../Header/Header';

export default function MoviesDetails(props) {
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState("");
  useEffect(() => {
    //If condition to redirect if page is reloaded
    if (window.performance.getEntriesByType("navigation")[0].type === "reload" && props.location.movieId==undefined) {
      props.history.push({
        pathname:"/"
    })
    } else {
      // getting the movie details based on movie id sent through props
      getMovieDetailsById(props.location.movieId).then((response) => {
        setMovie(response.data)
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
      // getting the movie cast details based on movie id sent through props
      getMovieCastDetailsById(props.location.movieId).then((response) => {
        setCast(response.data.cast)
        let crew = []
        crew = response.data.crew
        crew.forEach(element => {
          if (element.department != "") {
            setDirector(element.department);
          }
        });
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
  }, [])
  return (
    <>
      <Header history={props.history}/>
      <div className='movieDiv'>
        <div class="container">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-5 col-md-5 col-sm-6">
                  <div class="white-box text-center"><img src={baseImageURL + movie.poster_path} class="img-responsive" /></div>
                </div>
                <div class="col-lg-7 col-md-7 col-sm-6 movieDetails">
                  <h3 class="">{movie.original_title} ({movie.vote_average})</h3>
                  <h6 class="">{movie.release_date} | {movie.runtime?new Date(movie.runtime * 60 * 1000).toISOString().substr(11, 8):0} | {director}</h6>
                  <h4 class="box-title mt-5">Movie description</h4>
                  <p>{movie.overview}</p>
                  <h3 class="box-title">Cast</h3>
                  <ul class="list-unstyled">
                    <li>
                      {cast.map((persons, index) => {
                        return ((persons.character!==""?persons.character:"No Name") +  ((index + 1) == cast.length ? ". " : ", "))
                      })}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
