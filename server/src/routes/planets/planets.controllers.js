const plaents = require('../../models/planets.models')



function getAllPlanets(req,res){
   return res.status(200).json(plaents)
}



module.exports = {
    getAllPlanets
}