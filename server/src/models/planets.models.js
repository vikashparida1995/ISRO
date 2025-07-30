const planetModel = require('../schemas/planets.mongo.js');
const {parse} = require('csv-parse');
const fs = require('fs');
const path = require('path');
const { httpGetAllPlanets } = require('../routes/planets/planets.controllers.js');
let HabitablePlanets = []

let config = {
    comment:'#',
    columns: true,  
  }

function isHabitablePlanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED' 
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 
    &&  planet['koi_prad'] < 1.6 ;
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kapler_data.csv'))
.pipe(parse(config))
.on('data',async (data)=>{
   if(isHabitablePlanet(data)){
   await savePlanets(data);   
   }
   
})
.on('error',(error)=>{
  console.log(error)
    reject(error);
})
.on('end',async ()=>{
    let countPlanets = (await planetModel.find({},{keplerName: 1, _id: 0})).length;
    resolve(countPlanets);
    console.log(`${countPlanets} habitable planets found!`);
 })
})

}

async function savePlanets(planets) {
    try{
        await  planetModel.updateOne({
        keplerName: planets.kepler_name
       },{ keplerName: planets.kepler_name},{upsert: true})
    }catch(error){
        console.error('Error saving planet:', error);
    }
}


async function  getAllPlanets(){
    // return HabitablePlanets;
    let data = await planetModel.find({},{_id: 0, __v: 0});
    if(!data || data.length === 0){
        throw new Error('No planets found');
    }
    return data;
        
}



module.exports = {
    getAllPlanets,
    loadPlanetsData
};