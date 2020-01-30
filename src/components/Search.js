import React, { useState } from "react";

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
    <form className="search">
      <input value={searchValue} onChange={handleSearchValue} type="text" />

      <input onClick={callSearchValue} type="submit" value="SEARCH" />
    </form>
  );
};

export default Search;
