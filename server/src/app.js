const express = require('express');
const app = express();

const cors = require('cors')

app.use(cors({
    origin:'http://localhost:3000'
}))
app.use(express.json());

const planetsRouters = require('./routes/planets/planets.router')

app.use('/planets-api', planetsRouters)






module.exports = app