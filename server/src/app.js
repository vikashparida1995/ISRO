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
const launchesRouters = require('./routes/launches/launches.router')
const historyRouters = require('./routes/historys/history.router')  // require the history router

app.use('/planets-api', planetsRouters)
app.use('/launches-api',launchesRouters)   /// require and use the launches router in single line
app.use('/history-api', historyRouters)  // use the history router
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));           

})



module.exports = app