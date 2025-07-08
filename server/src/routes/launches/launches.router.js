const express = require('express');
const launchesRouter = express.Router();    

const launchesControllers = require('./launches.controllers');


launchesRouter.get('/launches',launchesControllers.httpGetAllLaunches );



module.exports = launchesRouter;