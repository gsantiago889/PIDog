require("dotenv").config();
const { API_KEY, API } = process.env;
const { Temperament } = require("../src/db");
const axios = require("axios");

const loadTemperaments = async () => {
  var { data } = await axios.get(`${API}?api_key=${API_KEY}`);
  var temperaments = [];
  data.forEach((e) => {
    if (typeof e.temperament === "string") {
      let res = e.temperament.split(",");
      res = res.map((e) => e.trim());
      temperaments = temperaments.concat(res);
    }
  });
  temperaments = Array.from(new Set(temperaments)).sort();
  // Set permite almacenar valores únicos de cualquier tipo
  // Array.from crea una nueva instancia de Array a partir de un objeto iterable
  for await (var temp of temperaments) {
    Temperament.create({ name: temp });
  }
};

module.exports = loadTemperaments;
