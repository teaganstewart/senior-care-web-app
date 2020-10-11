export class LocationObject {

    motions = [];
    latestMotion = ""
    battery = "??"

    constructor(location) {
        this.location = location;
    }

    getLocation() {
        return this.location;
    }

    setBattery(sBattery) {
        this.battery = sBattery;
    }
    
    getBattery() {
        return this.battery;
    }

    addMotion(motion) {
        this.motions.push(motion)
    }

    getMotions() {
        return this.motions;
    }

    setLatestMotion(sLatestMotion) {
        this.latestMotion = sLatestMotion;
    }

    getLatestMotion() {
        return this.latestMotion;
    }

    toString() {
        return "Latest motion in " + location 
    }
}

export function setLocations() {
    let locations = []

    locations.push(new LocationObject("living"))
    locations.push(new LocationObject("kitchen"))
    locations.push(new LocationObject("dining"))
    locations.push(new LocationObject("toilet"))
    locations.push(new LocationObject("bedroom"))

    return locations;
}