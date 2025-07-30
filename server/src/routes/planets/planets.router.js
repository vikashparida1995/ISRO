const express = require('express');
const planetsRouter = express.Router();


const plaentsControllers = require('./planets.controllers');


planetsRouter.get('/planets',plaentsControllers.httpGetAllPlanets );




module.exports = planetsRouter;













