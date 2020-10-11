/**
 * Creates an object that stores one update from the MQTT broker. Stores the details of a sensor update
 * including the date, time, location, battery and whether or not motion was detected at the time and date
 * of the update.
 * 
 * @author Teagan Stewart, 300407769
 */
export class SensorObject {

    /**
     * Takes the direct payload from a broker and seperates it into useable data.
     * 
     * @param payload The direct string containing all the updates information.
     */
    constructor(payload) {
        this.payload = payload;
        this.configureSensor();
    }
    
    /**
     * Seperates the payload into useful variables.
     */
    configureSensor() {
        this.date = this.payload.split(" ")[0]
        let sensorDetails = this.payload.split(" ")[1].split(",");
        this.time = sensorDetails[0]
        this.location = sensorDetails[1]
        this.motion = sensorDetails[2]
        this.battery = sensorDetails[3]
    }

    getDate() {
        return this.date;
    }

    getTime() {
        return this.time;
    }

    getLocation() {
        return this.location;
    }
    
    /**
     * Returns whether or not an update sensed motion in a location. Returns true if it did, false if not.
     */
    isMotion() {
        if(this.motion === '0') {
            return false;
        }
        if(this.motion === '1') {
            return true;
        }
    }

    getBattery() {
        return this.battery;
    }

    toString() {
        return this.payload;
    }
    
}