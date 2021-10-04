const got = require('got');
const apikey = require('./apikey.js');

const metOfficeData = got
    .get(`http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=${apikey}`)
    .json()
    .then(body => {
        body.Locations.Location.forEach(elem => {
            console.log(elem);
        })
    })
    .catch(err => {
        console.log(err);
    });
