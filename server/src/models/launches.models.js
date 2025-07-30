'use strict';
const LaunchModel = require('../schemas/launches.mongo.js');
const planetModel = require('../schemas/planets.mongo.js');


let DEFAULT_FLIGHT_NUMBER = 100;

async function getlatestFlightNumber() {
 const LatesLaunch =  await LaunchModel.findOne({}).sort('-flightNumber');

 if(!LatesLaunch) {
    return DEFAULT_FLIGHT_NUMBER;   
    }

    return LatesLaunch.flightNumber;
}

async function getAllLaunches() {
    let data = await LaunchModel.find({}, {_id: 0,__v :0}).sort({flightNumber: 1});
    if(!data || data.length === 0){ 
         return 'No launches found';
    }
    return data;
}


async function ScheduleNewLaunch(launch) {
    const newFlightNumber = await getlatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero to Mastery' , 'NASA'],
        flightNumber: newFlightNumber,
    }); 

 return await saveLaunch(newLaunch);                      
}

 async function saveLaunch(launch) {
        try {
            let planet  = await planetModel.findOne({keplerName: launch.target});
            if(!planet) {
             throw new Error('No matching planet found for the launch target');
            }
             await LaunchModel.updateOne({flightNumber:launch.flightNumber},launch,{upsert: true});
        } catch (error) {
            console.error('Error saving launch:', error);
            throw error;
        }
    }
    
   function existslaunchWithId(launchId) {
    return LaunchModel.findOne({flightNumber: launchId})
    .then(launch => {
        return !!launch;
    }); 
   }

  async function abortLaunchById(launchId) {
   const aborted = await LaunchModel.updateOne(        
        { flightNumber: launchId },
        { upcoming: false, success: false }
    );  
    return aborted; 
  }


       
 
 

module.exports = {
    getAllLaunches,
    ScheduleNewLaunch,
    existslaunchWithId,
    abortLaunchById,
    LaunchModel
}