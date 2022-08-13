import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./CreateDog.module.css";
import { getTemperaments } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  }
  if (!input.height) {
    errors.height = "Height is required";
  } else if (!/\d{1,2}-\d{1,2}/g.test(input.height)) {
    errors.height = "Add a height range. Example: '10-12'";
  }
  if (!input.weight) {
    errors.weight = "Weight is required";
  } else if (!/\d{1,2}-\d{1,2}/g.test(input.weight)) {
    errors.weight = "Add a weight range. Example: '10-12'";
  }
  if (!input.life_span) {
    errors.life_span = "Life Span is required";
  }
  if (!input.temperaments) {
    errors.temperaments = "Add at least one temperament";
  }
  return errors;
}
/*Estado local del componte*/
export default function CreateDog() {
  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    temperaments: [],
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  /*al renderizar despacho la action getTemperament una sola vez, lo indican los corchetes*/
  useEffect(
    () => {
      dispatch(getTemperaments());
    },
    // eslint-disable-next-line
    []
  );

  /*me traigo el estado de los temperamentos de reducers*/
  const tempss = useSelector((state) => state.allTemps);

  /*con cada cambio en el input seteo el input*/
  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  };

  /*boton para enviar los cambios*/
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(input);
    if (!errors.name && !errors.weight && !errors.height && !errors.life_span) {
      axios
        .post("http://localhost:3001/dog", input)
        .then(
          setInput({
            name: "",
            height: "",
            weight: "",
            life_span: "",
            temperaments: [],
          })
        )
        .catch((error) =>
          alert("no se guardo en la base de datos!!, faltaron datos controle!!")
        );
      alert("Your breed has been created successfully");
    } else {
      return alert("Something went wrong. Please try again.");
    }
  };

  /*Controlo que se seleccione un temperament, hago una copia de los seleccionado y agrego uno nuevo*/
  function handleSelect(e) {
    if (input.temperaments.includes(parseInt(e.target.value))) {
      alert("You already selected this temperament. Try again.");
    } else {
      setInput((prev) => ({
        ...prev,
        temperaments: [...prev.temperaments, parseInt(e.target.value)],
      }));
    }
  }

  /*pusheo a names, los nombres de temperament donde tempss.id === select.id*/
  const tempsNames = (array) => {
    let names = [];
    tempss?.forEach((e) =>
      array.forEach((id) => {
        if (parseInt(id) === e.id) {
          names.push(e.name);
        }
      })
    );
    return names;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.background}>
        <ul>
          <div className={style.label}>
            <li>
              <label>Name:</label>
            </li>
          </div>
          <input
            className={style.input}
            key="name"
            type="text"
            name="name"
            placeholder="Insert name..."
            onChange={handleInputChange}
            value={input.name}
          />
          {errors.name && <p className={style.danger}>{errors.name}</p>}
          <br />
          <div className={style.label}>
            <li>
              <label>Height:</label>
            </li>
          </div>
          <input
            className={style.input}
            key="height"
            type="text"
            name="height"
            placeholder="Insert height..."
            onChange={handleInputChange}
            value={input.height}
          />
          {errors.height && <p className={style.danger}>{errors.height}</p>}
          <br />
          <div className={style.label}>
            <li>
              <label>Weight:</label>
            </li>
          </div>
          <input
            className={style.input}
            key="weight"
            type="text"
            name="weight"
            placeholder="Insert weight..."
            onChange={handleInputChange}
            value={input.weight}
          />
          {errors.weight && <p className={style.danger}>{errors.weight}</p>}
          <br />
          <div className={style.label}>
            <li>
              <label>Life Span:</label>
            </li>
          </div>
          <input
            className={style.input}
            key="life_span"
            type="text"
            name="life_span"
            placeholder="Insert life span..."
            onChange={handleInputChange}
            value={input.life_span}
          />
          {errors.life_span && (
            <p className={style.danger}>{errors.life_span}</p>
          )}
          <br />
          <div className={style.label}>
            <li>
              <label>Temperaments:</label>
            </li>
          </div>
          <select
            className={style.select}
            key="temperaments"
            name="temperaments"
            onChange={(e) => handleSelect(e)}
            required
            value={input.temperaments}
          >
            {/* Cargo mi select */}
            {tempss?.map((e) => (
              <option value={e.id} key={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          {errors.temperaments && (
            <p className={style.danger}>{errors.temperaments}</p>
          )}
          <br />

          {/*cada temperament que selecciono lo agrego abajo y puedo seleccionar uno nuevo*/}
          {input.temperaments.map((e) => (
            <p id={e}>{tempsNames([e])}</p>
          ))}
          <button
            className={style.button}
            type="submit"
            name="submit"
            onClick={handleSubmit}
          >
            Create
          </button>
        </ul>
        <Link to={"/home"}>
          <button className={style.btn}>Home</button>
        </Link>
      </div>
    </form>
  );
}

module.export = CreateDog;
