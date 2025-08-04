const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const helmat = require('helmet')

const cors = require('cors')


// app.use(cors({
//     origin:'http://localhost:3000'
// }))
app.use(cors());
app.use(helmat());
app.use(morgan('dev'));
// app.use(morgan('common'));
// app.use(morgan('tiny'));
// app.use(morgan('combined'))
app.use(express.json());
app.use(express.static(path.join(__dirname ,'..', 'public')))

// const planetsRouters = require('./routes/planets/planets.router')
// const launchesRouters = require('./routes/launches/launches.router')
// const historyRouters = require('./routes/historys/history.router')  // require the history router

// app.use('/v1/planets-api', planetsRouters)
// app.use('/v1/launches-api',launchesRouters)   /// require and use the launches router in single line
// app.use('/v1/history-api', historyRouters)  // use the history router


  const api = require('./routes/api')
  app.use('/v1' , api)
  
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));           

})



module.exports = app