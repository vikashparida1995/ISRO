
const {getAllLaunches,ScheduleNewLaunch,existslaunchWithId,abortLaunchById} = require('./../../models/launches.models');



async function httpGetAllLaunches(req, res){
    let launches = await getAllLaunches();
    if(launches === 'No launches found') {     
        return res.status(404).json({error: 'No launches found'});
    }
    return res.status(200).json(launches);
}


async function httpAddNewLaunch(req, res){
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property'
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) return res.status(400).json({ error: 'Invalid launch date'}); 
    let response =  ScheduleNewLaunch(launch);
    response.ok = true
    return res.status(201).json(response);
}

async function httpAbortLaunch(req, res){
    const launchId = Number(req.params.id);  
    
    let launchExists = await existslaunchWithId(launchId);
    if(!launchExists) {
        return res.status(404).json({error: 'Launch not found'});
    }

   const  aborted = abortLaunchById(launchId);
   
  return res.status(200).json(aborted);

}


module.exports = {
    httpGetAllLaunches ,
    httpAddNewLaunch  ,
    httpAbortLaunch
}