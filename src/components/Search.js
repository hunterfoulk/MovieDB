import React, { useState } from "react";
import "./Search.css";
const Search = ({ search }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValue = e => {
    setSearchValue(e.target.value);
  };

  const callSearchValue = e => {
    e.preventDefault();
    search(searchValue);
    setSearchValue("");
  };

  return (
    <div className="flexbox">
      <form className="searchbox">
        <input
          placeholder="search a movie!"
          className="inputbox"
          value={searchValue}
          onChange={handleSearchValue}
          type="text"
        />

        <input
          className="searchbutton"
          onClick={callSearchValue}
          type="submit"
          value="Search"
        />
      </form>
    </div>
  );
};

export default Search;
