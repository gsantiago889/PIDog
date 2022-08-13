import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Order } from "./Order";
import style from "./Nav.module.css";

export function Nav() {
  return (
    <div className={style.navbar}>
      <div>
        <Link to="/">
          <button className={style.btn}>EXIT</button>
        </Link>
      </div>
      <div>
        <Link to="/home">
          <button className={style.btn}>Home</button>
        </Link>
      </div>
      <div>
        <Link to="/dog">
          <button className={style.btn}>Create a dog</button>
        </Link>
      </div>
      <SearchBar />
      <Order />
    </div>
  );
}

export default Nav;
