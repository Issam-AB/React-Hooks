import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from './Header'
import Movie from './Movie'
import Search from './Search'

const MOVIE_API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=86b5d464"

function App() {
  const [loding, setLoding] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoding(false);
      });
  }, []);
  const search = searchValue => {
    setLoding(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoding(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoding(false);
        }
      });
  	};
 
  return (
    <div className="App">
     <Header text="HOOKED" />
     <Search search={search} />
     <p className="App-intro">Sharing a few of our favourite movies</p>
     <div className="movies">
       {loding && !errorMessage ? (
        <span>loading...</span>
        ) : errorMessage ? (
         <div className="errorMessage">{errorMessage}</div>
       ) : (movies) ?
         movies.map((movie, index) => (
           <Movie key={`${index}-${movie.Title}`} movie={movie.Poster}  />
         )): null
       }
     </div>
   </div>
 );
}

export default App;
