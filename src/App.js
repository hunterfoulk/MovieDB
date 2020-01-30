import React, { useEffect, useState } from "react";
import "./App.css";
import { useStateValue } from "./State";
import Header from "./components/Header";
import Search from "./components/Search";
import axios from "axios";
/* import loader from "./assets/Ajax-Preloader.gif"; */

export default function App() {
  const [{ movies }, dispatch] = useStateValue();

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?s=man&apikey=7305ce7b`)
      .then(jsonResponse => {
        dispatch({
          type: "Movies",
          movies: jsonResponse.data.Search
        });
      });
  }, []);

  const search = searchValue => {
    axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=7305ce7b`).then(
      jsonResponse => {
        if (jsonResponse.data.Response === "True") {
          dispatch({
            type: "Movies",
            movies: jsonResponse.data.Search
          });
        }
      }
    );
  };

  return (
    <>
      <Header />

      <Search search={search} />

      <div className="app-container">
        {movies.map(movie => (
          <li>
            <li>{movie.Title}</li>
            <img className="movie-posters" src={movie.Poster} alt="/"></img>
          </li>
        ))}
      </div>
    </>
  );
}
