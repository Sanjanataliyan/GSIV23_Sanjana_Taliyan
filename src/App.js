import logo from './logo.svg';
import './App.css';
import {  Route } from 'react-router';
import MoviesDashboard from './Pages/Movies/MoviesDashboard';
import MoviesDetails from './Pages/Movies/MoviesDetails';
import Footer from './Pages/Footer/Footer';
import { useHistory } from 'react-router-dom';
function App() {
  const history = useHistory();
  return (
    <div className="App">
        <Route exact path="/" component={MoviesDashboard} history={history} />
        <Route exact path="/moviedetails" component={MoviesDetails} history={history} />
      <Footer />
    </div>
  );
}

export default App;
