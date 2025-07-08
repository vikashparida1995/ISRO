const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

const cors = require('cors')

app.use(cors({
    origin:'http://localhost:3000'
}))

app.use(morgan('dev'));
app.use(morgan('common'));
app.use(morgan('tiny'));
app.use(morgan('combined'))
app.use(express.json());
app.use(express.static(path.join(__dirname ,'..', 'public')))

const planetsRouters = require('./routes/planets/planets.router')


app.use('/planets-api', planetsRouters)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));           

})



module.exports = app