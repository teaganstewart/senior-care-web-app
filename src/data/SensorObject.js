// Stores all the information for the sensor data so that they can be put into storage in JSON form.
export class SensorObject {

    constructor(payload) {
        this.payload = payload;
        this.configureSensor();
    }

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