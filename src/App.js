import React from 'react';
import Movie from './Components/Movie';
import { useEffect, useState } from 'react';
function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(()=>{
    const fetchdata = async () => {
      const data = await fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1");
      const json = await data.json();
      setMovies(json.results);
    }
    fetchdata();
    /*fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1")
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data);
      setMovies(data.results);
    })*/
  }, []);


  const handleOnSubmit=(e)=>{
    e.preventDefault();

    fetch("https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=" + searchTerm)
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data);
      setMovies(data.results);
    })
  };

  const handleOnChange =(e)=>{
    setSearchTerm(e.target.value);
  }

  return (<>
    <header>
      <h1 className='page-title'>Netflix</h1>
      <form onSubmit={handleOnSubmit}>
      <input className="search" type='text' placeholder="search" value={searchTerm} onChange={handleOnChange}/>
      </form>

    </header>
    <div className="movie-container">
      {movies.length>0 && movies.map((movie)=> <Movie key ={movie.id} {...movie}/>)}
    </div>
    </>
  );
}

export default App;
