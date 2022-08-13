import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchDog } from "../actions";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  const [search, setSearch] = useState("Affenpinscher");

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
  const dogers = useSelector((state) => state.allDogs);

  return (
    <div className={style.search}>
      <form>
        <select
          className={style.input}
          type="text"
          value={search}
          onChange={(e) => handleChange(e)}
        >
          {dogers?.map((d) => {
            return <option value={d.name}>{d.name}</option>;
          })}
        </select>
        <button
          className={style.button}
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Search
        </button>
      </form>
    </div>
  );
}

module.export = SearchBar;
