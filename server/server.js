require('dotenv').config();
const http = require('http')
const port = process.env.PORT || 8000;
mongoose = require('mongoose');

const app = require('./src/app')

const { loadPlanetsData } = require('./src/models/planets.models');
const { loadLaunchesData } = require('./src/models/launches.models');
// Load planets data before starting the server
const { mongoConnect } = require('./src/service/mongo');

const server = http.createServer(app)

// mongoose.connection.once('open', (err) => {
//   console.error('MongoDB connection Ready state:', mongoose.connection.readyState);  
// });



async function  loadData() {
   mongoConnect()
  .then(() => {   
    console.log('Connected to MongoDB');
  })
  .catch((error) => {   
    console.error('Error connecting to MongoDB:', error);

    process.exit(1); // Exit the process if connection fails

  }); 
  loadPlanetsData()
  .then(() => {
    console.log('Planets data loaded successfully');
  })
  .catch((error) => {
    console.error('Error loading planets data:', error);
  });
 await loadLaunchesData();
server.listen(port,(err)=>{
console.log(`  server is running on port http:/localhost:${port}/ `)
})
}

loadData();

