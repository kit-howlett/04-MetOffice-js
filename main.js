const got = require("got");
const express = require('express');
const app = express();
const apikey = require("./apikey.js");
const Location = require("./locationClass.js");

app.get('/forecast', function (req, res) {
  got
  .get(
    `http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=${apikey}`
  )
  .json()
  .then((body) => {
    const locations = []; 

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
    })
    return locations;
  })
  .then(locations => {
    const urlLocationName = req.query.locationName;
    const urlLocationID = getLocationId(urlLocationName, locations);
    
    return got
    .get(`http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/${urlLocationID}?res=daily&key=${apikey}`)
    .json();
  })
  .then(data => {
    res.send(data.SiteRep.DV);
  })
  .catch(err => {
    res.send(err);
  }) 
});

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});

function getLocationId(locationName, locationsArray) {
  const location = locationsArray.find(location => location.name === locationName);
  return location.id;
}