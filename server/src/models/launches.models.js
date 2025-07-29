const launchSchema = require('../schemas/launches.schema.js');
const mongoose = require('mongoose');

const LaunchModel = mongoose.model('Launch', launchSchema);

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target : 'KPL_452b',
    customer: ['NASA', 'ZTM'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);


function getAllLaunches() {
 return  Array.from(launches.values());     
}

function addNewLaunch(launch) {
    
    let date = new Date(launch.launchDate);
    latestFlightNumber++;
    const newLaunch = Object.assign(launch, {
            success: true,
            upcoming: true,
            customers: ['Zero to Mastery' , 'NASA'],
            flightNumber: latestFlightNumber,
            launchDate: date,})


    launches.set(latestFlightNumber,newLaunch)

    return newLaunch;

    }
    
   function existslaunchWithId(launchId) {
     
         return launches.has(launchId);
    
   }

  function abortLaunchById(launchId) {
   const aborted =  launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted
  }


       
 
 

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existslaunchWithId,
    abortLaunchById,
    LaunchModel
}