import { Client } from 'react-native-paho-mqtt'
import { setLocations } from '../src/data/LocationObject';
import { SensorObject } from '../src/data/SensorObject';
import { saveSensors } from '../src/data/SensorStorage';

export class Broker {

  constructor() {
    this.locations = setLocations()
    this.latestActivity = ""
    this.date = "";
    this.time = new Date()

    // Connects to the MQTT Broker
    this.client = new Client({ uri: 'ws://test.mosquitto.org:8080/swen325/a3', clientId: 'clientId' });

    this.connect()
    this.recieve();
    this.lost();
  }

  lost() {
    // set event handlers
    this.client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        alert(responseObject.errorMessage);
      }
    });
  }

  recieve() {
    this.client.on('messageReceived', (message) => {
      console.log(message.payloadString)
      let se = new SensorObject(message.payloadString)
      let index = this.locations.indexOf(this.locations.filter(loc => loc.getLocation() === se.getLocation())[0])
      
      this.locations[index].setBattery(se.getBattery())

      if(se.isMotion()) {
        this.latestActivity = se.getLocation() + "";
        this.date = se.getDate()
        this.time = se.getTime();
      
      }

      saveSensors(this.locations, this.latestActivity, this.date, this.time)
    });

  }

  // connect the client
  connect() {
    this.client.connect()
      .then(() => {
        // Once a connection has been made, make a subscription and send a message.
        return this.client.subscribe('swen325/a3');
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage);
        }
      })
      ;

  }
}
