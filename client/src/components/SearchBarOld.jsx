import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDog } from "../actions";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  // async await me trae el estado actualizado, si no me trae "Houn" en vez de "Hound"
  const handleChange = async (e) => {
    await setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchDog(search));
    setSearch("");
  };

  return (
    <div className={style.search}>
      <form>
        <input
          className={style.input}
          type="text"
          placeholder="Insert a breed..."
          value={search}
          onChange={(e) => handleChange(e)}
        />
        <button
          className={style.btn}
          type="submit"
          onClick={(e) => handleSubmit(e)}
        ></button>
      </form>
    </div>
  );
}

module.export = SearchBar;
