import React, { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { SearchAMovie } from '../../Services/MoviesDashboardService'

export default function Header(props) {
    const [search, setSearch] = useState("");
    const handleSearchMovie = (event) => {
        setSearch(event.target.value)
        if (event.target.value !== "") {
            // searching the movie by the user
            SearchAMovie(event.target.value).then((response) => {
                //calling callback method to set the property in parent component
                props.parentCallback(response.data.results);
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
        else {
            props.parentCallback("");
        }
    }

    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    {window.location.pathname !== "/moviedetails" ?
                        <form class="d-flex wrapper" role="search">
                            <span class="material-icons searchIcon">
                                search
                            </span>
                            <input class="form-control me-2" data-testid="search" value={search} type="search" placeholder="Search" aria-label="Search" onChange={e => handleSearchMovie(e)} />
                        </form> : null}
                </div>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <Link class="nav-link" aria-current="page" to={"/"}><span class="material-icons">
                            home
                        </span></Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
