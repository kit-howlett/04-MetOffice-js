const got = require("got");
const readlineSync = require("readline-sync");
const apikey = require("./apikey.js");
const Location = require("./locationClass.js");

const locations = [];

const metOfficeData = got
  .get(
    `http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=${apikey}`
  )
  .json()
  .then((body) => {
    body.Locations.Location.forEach((locationObject) => {
      const elevation = locationObject.elevation;
      const id = locationObject.id;
      const latitude = locationObject.latitude;
      const longitude = locationObject.longitude;
      const name = locationObject.name;
      const region = locationObject.region;
      const unitaryAuthArea = locationObject.unitaryAuthArea;

      locations.push(
        new Location(
          elevation,
          id,
          latitude,
          longitude,
          name,
          region,
          unitaryAuthArea
        )
      );
    });
    // 1) List all locations
    listAllLocations();
    // 2) Ask user for location + 3) Check location is available to search (indexOf)
    const userLocation = getAndCheckUserInput();
    //console.log(userLocation);
    // 4) Call api data for that location
    return got
      .get(`http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/${userLocation.id}?res=daily&key=${apikey}`)
      .json()
  })
  .then((data) => {
    const currentWeatherType = data.SiteRep.DV.Location.Period[0].Rep[0].W;
    const tomorrowWeatherType = data.SiteRep.DV.Location.Period[0].Rep[1].W;
    const weatherCodes = {
      0:	'Clear night',
      1:	'Sunny day',
      2:	'Partly cloudy (night)',
      3:	'Partly cloudy (day)',
      4:	'Not used',
      5:	'Mist',
      6:	'Fog',
      7:	'Cloudy',
      8:	'Overcast',
      9:	'Light rain shower (night)',
      10:	'Light rain shower (day)',
      11:	'Drizzle',
      12:	'Light rain',
      13:	'Heavy rain shower (night)',
      14:	'Heavy rain shower (day)',
      15:	'Heavy rain',
      16:	'Sleet shower (night)',
      17:	'Sleet shower (day)',
      18:	'Sleet',
      19:	'Hail shower (night)',
      20:	'Hail shower (day)',
      21:	'Hail',
      22:	'Light snow shower (night)',
      23:	'Light snow shower (day)',
      24:	'Light snow',
      25:	'Heavy snow shower (night)',
      26:	'Heavy snow shower (day)',
      27:	'Heavy snow',
      28:	'Thunder shower (night)',
      29:	'Thunder shower (day)',
      30:	'Thunder'
    }

    console.log(`The weather today is ${weatherCodes[currentWeatherType].toLowerCase()}.`);
    console.log(`The weather tomorrow is ${weatherCodes[tomorrowWeatherType].toLowerCase()}.`);
  })
  .catch((err) => {
    console.log(err);
  });

function listAllLocations() {
  locations.forEach((location) => {
    console.log(location.name);
  });
}

function getAndCheckUserInput() {
  const userInput = readlineSync.question(
    "What location would you like to see the weather for? "
  );
  let userLocation;

  locations.forEach((location) => {
    if (location.name === userInput) {
      userLocation = location;
      return;
    }
  });

  if (userLocation === undefined) {
    console.log("Please enter a valid location...");
    return getAndCheckUserInput();
  }

  return userLocation;
}