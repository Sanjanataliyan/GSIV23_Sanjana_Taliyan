import Interceptor from "../Interceptor/Interceptor";
const api = "&api_key=4db6b13bdcc3d9b30094e6ac5956957b";
//Base URL For Images to display
export const baseImageURL="http://image.tmdb.org/t/p/w154";
//API to get all the movies
export function getAllMoviesList(){
    return Interceptor.get(`movie/upcoming?language=en-US&page=1`)
}
//API to search the movies
export function SearchAMovie(search){
    return Interceptor.get(`search/movie?query=${search}${api}`)
}
//API to get details of the movie which is clicked
export function getMovieDetailsById(movieId){
    return Interceptor.get(`/movie/${movieId}`)
}
//API to get cast of the movie which is clicked
export function getMovieCastDetailsById(movieId){
    return Interceptor.get(`/movie/${movieId}/credits`)
}