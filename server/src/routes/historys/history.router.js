const express = require('express');
const historyRouter = express.Router();    

const historyControllers = require('.//history.controllers');


historyRouter.get('/history',historyControllers.httpGetAllLaunchesHistory );



module.exports = historyRouter;