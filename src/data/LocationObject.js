/**
 * An object that stores 1 of 5 locations in a house. Stores motion detected in the room and the battery
 * of the sensor corresponding to that room.
 * 
 * @author Teagan Stewart, 300407769
 */
export class LocationObject {

    motions = [];
    updates = [];
    battery = "??"

    // Constructs a location, with an unknown battery and no previous motions.
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

    getUpdates() {
        return this.updates;
    }

    addUpdate(update) {
        this.updates.push(update);
    }

    getMotions() {
        return this.motions;
    }

    getNoMotions() {
        return this.motions.length;
    }

    toString() {
        return "Latest motion in " + location 
    }
}

/**
 * Sets the initial location objects, for storage of sensor objects.
 */
export function setLocations() {
    let locations = []

    locations.push(new LocationObject("living"))
    locations.push(new LocationObject("kitchen"))
    locations.push(new LocationObject("dining"))
    locations.push(new LocationObject("toilet"))
    locations.push(new LocationObject("bedroom"))

    return locations;
}