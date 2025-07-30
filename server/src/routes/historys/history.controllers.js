const {getAllLaunches} = require('./../../models/launches.models');



function httpGetAllLaunchesHistory(req, res){  
       return res.status(200).json(getAllLaunches);
}



module.exports = {
    httpGetAllLaunchesHistory     
}