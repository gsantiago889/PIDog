import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs } from "../actions/index";
import style from "./Home.module.css";

const Home = () => {
  //me traigo el estado de mi action con useSelector
  const dogs = useSelector((state) => state.allDogs);
  const filter = useSelector((state) => state.filter);
  // me asigno en el dispatch el useDispatch para poder despachar lo que quiera con esa variable
  // declaro un nuevo estado currentPage = 1 referido a la pag en la que estoy
  const [currentPage, setCurrentPage] = useState(1);
  // declaro un nuevo estado itemsPerPage = 8 renderizo 8 dogs por pagina
  // eslint-disable-next-line
  const [itemsPerPage, setItemsPerPage] = useState(8);
  // pagino de a 10
  // eslint-disable-next-line
  const [limitPage, setLimitPage] = useState(10);
  // declaro en el estado que el maximo de paginacion es 10
  const [maxPageLimit, setMaxPageLimit] = useState(10);
  // declaro que el minimo de paginacion es 0
  const [minPageLimit, setMinPageLimit] = useState(0);
  // en seteo mi current page en la pag que este por id
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  // creo un array pages que va a contener la cantidad de perros dividido 8 (perros a renderizar x pag)
  const pages = [];
  for (let i = 1; i <= Math.ceil(dogs?.length / itemsPerPage); i++) {
    pages.push(i);
  }
  // en lastItem guardo el ultimo item que estoy renderizando
  const lastItem = currentPage * itemsPerPage;
  // en firstItem guardo el primer item que estoy renderizando
  const firstItem = lastItem - itemsPerPage;
  //en currentItem guardo los items que estoy renderizando (por ej: del 0 al 10)
  const currentItems = dogs?.slice(firstItem, lastItem);

  // si el numero esta dentro de mi limite maximo y minimo, renderizo los numbers pages
  const renderPages = pages.map((number) => {
    if (number < maxPageLimit + 1 && number > minPageLimit) {
      return (
        <li key={number} id={number} onClick={handleClick}>
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  const dispatch = useDispatch();
  // el useEffect es como el componentDidMount, va a traer mi action creator getDogs al renderizar
  useEffect(
    () => {
      dispatch(getDogs());
    },
    // eslint-disable-next-line
    []
  );

  // hago una funcion handle next que maneje el estado de currentPage, en el if digo que si es mayor
  // a la paginacion paso a tener 20 pags.
  // si me paso del maxPageLimit tengo del 11 al 20
  // 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9 || 10 || ...
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + limitPage);
      setMinPageLimit(minPageLimit + limitPage);
    }
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % limitPage === 0) {
      setMaxPageLimit(maxPageLimit - limitPage);
      setMinPageLimit(minPageLimit - limitPage);
    }
  };

  const url =
    "https://s1.eestatic.com/2021/11/10/actualidad/626198188_214456909_1024x576.jpg";
  // eslint-disable-next-line
  dogs?.map((e) => {
    if (e.id.length > 4) {
      e.image = { url };
      e.temperament = "";
      for (let i = 0; i < e.temperaments.length; i++) {
        e.temperament += e.temperaments[i].name.toString() + ", ";
      }
    }
  });

  function redirect() {
    window.location.href = "http://localhost:3000/home";
  }

  function renderData(dogs) {
    return (
      <div className={style.direccion}>
        {dogs?.map((theDogs) => {
          //console.log(theDogs);
          return (
            <div className={style.contenedor}>
              <button
                className={style.button}
                type="buton"
                name="close"
                onClick={(e) => redirect()}
              >
                X
              </button>
              <p className={style.text}>{theDogs.name}</p>
              <Link to={`/dog/${theDogs.id}`}>
                <img
                  className={style.image}
                  src={theDogs.image.url}
                  alt="Not found"
                />
              </Link>
              <p className={style.text2}>{theDogs.temperament}</p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={style.background}>
      {filter?.length > 0 ? renderData(filter) : renderData(currentItems)}
      <ul className={style.pagination}>
        <li>
          <button
            onClick={handlePrev}
            disabled={currentPage === pages[0] ? true : false}
          >
            ←
          </button>
        </li>
        {renderPages}
        <li>
          <button
            onClick={handleNext}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            →
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Home;
