const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const { Dog } = require("../db.js");
require("dotenv").config();
const { Sequelize, UUID } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

// async function idDog() {
//   const dogFromDb = await Dog.findAll({ attributes: ["id"] });
//   var id = "baseDatos0";
//   if (dogFromDb.length) {
//     const ids = dogFromDb.map((g) => {
//       return g.dataValues.id;
//     });
//     const intIds = ids?.map((id) => {
//       return parseInt(id.slice(8));
//     });
//     const max = Math.max(...intIds);
//     id = "baseDatos" + (max + 1);
//   }

//   return id;
// }

router.post("/", async (req, res, next) => {
  const { name, height, weight, life_span, temperaments } = req.body;
  console.log(temperaments);

  if (!name || !height || !weight || !life_span || temperaments.length === 0) {
    console.log(
      "no se cargaron todos los campos, verifique, no se guardo en la base de datos"
    );
    res
      .status(500)
      .send(
        "no se cargaron todos los campos, verifique, no se guardo en la base de datos"
      );

    return;
  }

  try {
    let id = uuidv4(); //await idDog();
    createNewDog = await Dog.create({
      name,
      height,
      weight,
      life_span,
      id: id,
    });
    await createNewDog.setTemperaments(temperaments); //setTemperaments
    res.json(createNewDog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
