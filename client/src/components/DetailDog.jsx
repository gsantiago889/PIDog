import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import style from "./DetailDog.module.css";
import { Link } from "react-router-dom";

export default function DogDetail({ match }) {
  const { id } = match.params;
  const aDog = useSelector((state) => state.dogDetail);
  //console.log(aDog);

  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(getDetail(id));
    },
    // eslint-disable-next-line
    []
  );
  function redirect() {
    window.location.href = "http://localhost:3000/home";
  }
  function renderDog(dog) {
    const url =
      "https://s1.eestatic.com/2021/11/10/actualidad/626198188_214456909_1024x576.jpg";

    if (id.length < 10) {
      return (
        <div className={style.background}>
          <div className={style.contenedor}>
            <button
              className={style.button}
              type="buton"
              name="close"
              onClick={(e) => redirect()}
            >
              X
            </button>
            <p className={style.text}>{aDog?.name}</p>
            <Link to={"/home"}>
              <img
                src={aDog?.image?.url}
                className={style.image}
                alt="Not found"
              />
            </Link>
            <p className={style.text2}>{aDog?.height?.metric}</p>
            <p className={style.text2}>{aDog?.weight?.metric}</p>
            <p className={style.text2}>{aDog?.life_span}</p>
            <p className={style.text2}>{aDog?.temperament}</p>
          </div>
        </div>
      );
    } else {
      if (!aDog.id) {
        <h1>Loading...</h1>;
      }
      aDog?.forEach((e) => {
        e.temperament = "";
        for (let i = 0; i < e.temperaments.length; i++) {
          e.temperament += e.temperaments[i].name.toString() + ", ";
        }
      });
      return (
        <div className={style.background}>
          <div className={style.contenedor}>
            <button
              className={style.button}
              type="buton"
              name="close"
              onClick={(e) => redirect()}
            >
              X
            </button>
            <p className={style.text}>{aDog[0]?.name}</p>
            <Link to={"/home"}>
              <img className={style.image} src={url} alt="Not found" />
            </Link>
            <p className={style.text2}>{aDog[0]?.height}</p>
            <p className={style.text2}>{aDog[0]?.weight}</p>
            <p className={style.text2}>{aDog[0]?.life_span}</p>
            <p className={style.text2}>{aDog[0]?.temperament}</p>
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      {typeof aDog === "undefined" ? <h1>Loading...</h1> : renderDog(aDog)}
    </div>
  );
}

module.export = DogDetail;
