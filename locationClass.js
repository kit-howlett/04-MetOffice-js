class Location {
    constructor (elevation, id, latitude, longitude, name, region, unitaryAuthArea){
        this.elevation = elevation;
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.region = region;
        this.unitaryAuthArea = unitaryAuthArea;
    }
}

module.exports = Location;