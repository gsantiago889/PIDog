const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const { Dog } = require("../db.js");
require("dotenv").config();
const { Sequelize, UUID, where } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
//const { Where } = require("sequelize/types/utils.js");

router.post("/", async (req, res, next) => {
  const { name, height, weight, life_span, temperaments } = req.body;

  if (!name || !height || !weight || !life_span || temperaments.length === 0) {
    res.status(418).send("Soy una tetera");
    console.log("soy una tetera");
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

//UPDATE
// router.put('put/:id',(req,res)=>{
//   await Dog.update({
//     name,
//     height
//   }
//     where:{
//       id: req.params.id})

//     }).then(result =>{
//       res.json(result)
//     })

module.exports = router;
