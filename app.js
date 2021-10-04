const got = require('got');
const apikey = require('./apikey.js');
const Location = require('./locationClass.js');

const locations = [];

const metOfficeData = got
    .get(`http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=${apikey}`)
    .json()
    .then(body => {
        body.Locations.Location.forEach(locationObject => {
            const elevation = locationObject.elevation;
            const id = locationObject.id;
            const latitude = locationObject.latitude;
            const longitude = locationObject.longitude;
            const name = locationObject.name;
            const region = locationObject.region;
            const unitaryAuthArea = locationObject.unitaryAuthArea;

            locations.push(new Location(elevation, id, latitude, longitude, name, region, unitaryAuthArea));
        })
        return locations;
    })
    .catch(err => {
        console.log(err);
    });

/* 
    Location {
        elevation: 56,
        id: 72,
        latitude: 87,
        longitude: 678,
        name: 'Surrey',
        region: 'UK',
        unitaryAuthArea: 'Red'
      }
*/
    