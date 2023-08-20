import axios from "axios";

const Interceptor = axios.create({
    baseURL:"https://api.themoviedb.org/3/"
});
Interceptor.interceptors.request.use(async config=>{
    config.headers["Content-Type"]="application/json"
    config.headers["Authorization"]="Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGI2YjEzYmRjYzNkOWIzMDA5NGU2YWM1OTU2OTU3YiIsInN1YiI6IjY0ZTFjZjhjMjQ5NWFiMDExZGQ0OTcxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HUqCAV3OSVJ2sjskS9dgULHeQDIBINyXbw9XUZNlUkA";
    return config;
});
export default Interceptor;