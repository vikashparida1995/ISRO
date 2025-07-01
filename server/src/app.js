const express = require('express');
const app = express();

const cors = require('cors')

const planetsRouters = require('./routes/planets/planets.router')

app.use('/planets-api', planetsRouters)

app.use(cors())
app.use(express.json());




module.exports = app