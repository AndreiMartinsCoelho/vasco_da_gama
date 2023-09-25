import React, { useState, useEffect } from "react";
import "../assets/CSS/filmes.css";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

function Header() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [musicUrl, setMusicUrl] = useState("");
  const KEY = process.env.REACT_APP_KEY;

  useEffect(() => {
    if (searchTerm) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=pt-BR&query=${searchTerm}`
      )
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.results);
          setShowResults(true); // show the search results
        });
    } else {
      setShowResults(false); // hide the search results
    }
  }, [searchTerm, KEY]);

  useEffect(() => {
    if (searchTerm.toLowerCase() === "mortal kombat") {
      setMusicUrl("https://www.youtube.com/watch?v=Sr1bLLvsbh0&ab_channel=AustinJons%26theImmortals-Topic");
    } else {
      setMusicUrl("");
    }
  }, [searchTerm]);

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const handleClear = () => {
    setSearchTerm("");
    setMovies([]);
    setShowResults(false); // hide the search results
  };

  return (
    <>
      <header className="Header">
        <form onSubmit={handleSearch} className="Pesquisar">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Pesquisar..."
            className="InputPes"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <input type="submit" value="Pesquisar" className="BtnPes" />
          {showResults && (
            <button onClick={handleClear} className="BtnLimpar">
              X
            </button>
          )}
        </form>
      </header>
      {showResults && (
        <div className="ResultadoFilmes">
          <h2 className="ResultadoH1">Resultados da sua Pesquisa:</h2>
          {musicUrl && (
            <ReactPlayer url={musicUrl} playing loop />
          )}
          {movies.map((movie) => (
            <div key={movie.id} className="Filme">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <span className="Titulo">{movie.title}</span>
              <div className="info">
                <span className="Data">
                  Data de lançamento: {movie.release_date}
                </span>
                <span className="Nota">Nota: {movie.vote_average}</span>
                <span className="Idioma">
                  Idioma: {movie.original_language}
                </span>
                <span className="Popularidade">
                  Popularidade: {movie.popularity}
                </span>
              </div>
              <Link to={`/${movie.id}`} className="">
                <button className="btnVer">Saiba mais...</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Header;
