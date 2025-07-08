const {HabitablePlanets} = require('../../models/planets.models')



function httpGetAllPlanets(req,res){
   return res.status(200).json(HabitablePlanets)
}



module.exports = {
    httpGetAllPlanets
}