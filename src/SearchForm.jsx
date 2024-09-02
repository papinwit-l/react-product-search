import { useState, useEffect } from "react";

function SearchForm(props) {
  const { search, setSearch } = props;
  const submitHdl = (e) => {
    e.preventDefault();
  };
  const inputHdl = (e) => {
    setSearch(e.target.value);
  };
  return (
    <form onSubmit={submitHdl}>
      <input type="text" onChange={(e) => inputHdl(e)} />
    </form>
  );
}

export default SearchForm;
