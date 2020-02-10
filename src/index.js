import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StateProvider } from "./State";

function Index() {
  let initialState = {
    movies: []
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "Movies":
        return {
          ...state,
          movies: action.movies
        };
        break;
      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
