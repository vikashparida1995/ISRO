const http = require('http')
const port = process.env.PORT || 8000;

const app = require('./app')

const { loadPlanetsData } = require('./models/planets.models');
// Load planets data before starting the server


const server = http.createServer(app)



async function  loadData() {
    loadPlanetsData()
  .then(() => {
    console.log('Planets data loaded successfully');
  })
  .catch((error) => {
    console.error('Error loading planets data:', error);
  });

server.listen(port,(err)=>{
console.log(`  server is running on port http:/localhost:${port}/ `)
})
}

loadData();

