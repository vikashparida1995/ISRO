// const API_URL = 'http://localhost:8000'

 async function httpGetPlanets() {
  // TODO: Once API is ready.
  // const response = await fetch(`${API_URL}/planets-api/planets`);
  const response = await fetch('http://localhost:8000/planets-api/planets');
  if(!response.ok) {
    return [];
  }
  return await response.json();
 
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
  const response = await fetch('http://localhost:8000/launches-api/launches');
  let flightLaunches  = await response.json();
  if (!flightLaunches.length) {
    return [];
  }
  return flightLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
  // return await response.json();
}

async function httpSubmitLaunch(launch) {
  console.log('launch', launch);
  try{
   return await fetch('http://localhost:8000/launches-api/launches', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(launch),
  });
  
  }catch (error) {
    console.error('Error submitting launch:', error);
    return {
      ok: false,
    }; 
  }
 
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
try{  return await fetch(`http://localhost:8000/launches-api/launches/${id}`, {
    method: 'DELETE',
  })}catch (error) {
    console.error('Error aborting launch:', error);
    return {
      ok: false,
    };
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};