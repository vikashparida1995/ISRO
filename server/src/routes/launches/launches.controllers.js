const {getAllLaunches,ScheduleNewLaunch,existslaunchWithId,abortLaunchById,getCountLaunch} = require('./../../models/launches.models');

const {getPagination} = require('../../service/pagination.js')

async function httpGetAllLaunches(req, res){
    let {skip , limit , sort} = getPagination(req.query)
    let launches = await getAllLaunches(skip,limit ,sort);
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


async function httplaunchCount(req, res) {
    try {
        const launchCount = await getCountLaunch();
        
        if (!launchCount) {
            return res.status(404).json({
                status: 'error',
                message: 'Unable to retrieve launch count'
            });
        }

        return res.status(200).json({
            status: 'success',
            data: {
                count: launchCount
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error while fetching launch count',
            error: error.message
        });
    }
}


module.exports = {
    httpGetAllLaunches ,
    httpAddNewLaunch  ,
    httpAbortLaunch ,
    httplaunchCount
}