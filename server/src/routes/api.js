
const express = require('express');
const api = express.Router()

const planetsRouters = require('../routes/planets/planets.router')
const launchesRouters = require('../routes/launches/launches.router')
const historyRouters = require('../routes/historys/history.router') 







api.use('/planets-api', planetsRouters)
api.use('/launches-api',launchesRouters)   /// require and use the launches router in single line
api.use('/history-api', historyRouters) 


module.exports = api;