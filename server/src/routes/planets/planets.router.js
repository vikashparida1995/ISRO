const express = require('express');
const planetsRouter = express.Router();


const plaentsControllers = require('./planets.controllers');


planetsRouter.get('/plaents',plaentsControllers.getAllPlanets)






module.exports = planetsRouter;













