const mongoose = require('mongoose');
const PlanetsSchema = require('../schemas/planets.schema.js');

const PlanetsModel = mongoose.model('Planet', PlanetsSchema);

const {parse} = require('csv-parse');
const fs = require('fs');
const path = require('path');
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
.on('data',(data)=>{
   if(isHabitablePlanet(data)){
     HabitablePlanets.push(data)
   }
   
})
.on('error',(error)=>{
  console.log(error)
    reject(error);
})
.on('end',()=>{
    if(HabitablePlanets){
        resolve(HabitablePlanets);
        console.log(HabitablePlanets.map((planet)=>{
            return planet['kepler_name'] ;
        }))
    }
    console.log(`${HabitablePlanets.length}  Habitable Planets found ! `)   
     
})
    })

}




module.exports = {
    HabitablePlanets,
    loadPlanetsData,
    PlanetsModel
};