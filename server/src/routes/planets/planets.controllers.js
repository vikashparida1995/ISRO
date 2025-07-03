const {HabitablePlanets} = require('../../models/planets.models')



function getAllPlanets(req,res){
   return res.status(200).json(HabitablePlanets)
}



module.exports = {
    getAllPlanets
}