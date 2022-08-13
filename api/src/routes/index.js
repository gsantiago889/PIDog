const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const routeDogs = require("./dogs");
const routeTemperaments = require("./temperament");
const routeDog = require("./dog");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", routeDogs);
router.use("/temperament", routeTemperaments);
router.use("/dog", routeDog);

module.exports = router;
