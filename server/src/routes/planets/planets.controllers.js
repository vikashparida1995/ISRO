const {getAllPlanets} = require('../../models/planets.models')



async function httpGetAllPlanets(req,res){
   return await res.status(200).json(await getAllPlanets())
}



module.exports = {
    httpGetAllPlanets
}