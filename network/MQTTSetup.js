import { Client } from 'react-native-paho-mqtt'

// Loads internal components I have written
import { setLocations } from '../src/data/LocationObject';
import { SensorObject } from '../src/data/SensorObject';
import { saveSensors } from '../src/data/SensorStorage';

/**  A class to connect, disconnect and store information from an external Broker. This broker provides
 *   imformation from sensors to track the elderly.
 */
export class Broker {

  /** Sets the inital location, date and time of a sensor, this is so that the timer can work  
  *   on the senior status page.
  */
  constructor() {
    //sets the inital locations, so that each
    this.locations = setLocations()
    this.latestActivity = ""
    this.date = "";
    this.time = new Date()
    // the data that is used in the graphs.
    this.dataSet = [0, 0, 0, 0, 0];

    // Connects to the MQTT Broker using websockets
    this.client = new Client({ uri: 'ws://test.mosquitto.org:8080/swen325/a3', clientId: 'clientId' });

    // Methods that allow the application to interact with the MQTT broker.
    this.connect()
    this.recieve();
    this.lost();
  }

  // Triggers when connected to the broker is lost, and explains why it was lost.
  lost() {
    this.client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        alert(responseObject.errorMessage);
      }
    });
  }

  // Triggers when a message is recieved by the broker, filters and stores the accessed information.
  recieve() {
    this.client.on('messageReceived', (message) => {
      console.log(message.payloadString)

      // creates a new sensor object with the update
      let se = new SensorObject(message.payloadString)

      // finds the index of the updates location in the array
      let index = this.locations.indexOf(this.locations.filter(loc => loc.getLocation() === se.getLocation())[0])

      // updates the battery based on the new sensors update
      this.locations[index].setBattery(se.getBattery())

      // records the time and date information for the minutes ago update
      if (se.isMotion()) {
        this.latestActivity = se.getLocation() + "";
        this.locations[index].addMotion(se);
        this.date = se.getDate()
        this.time = se.getTime();
        this.updateData();
      }

      this.locations[index].addUpdate(se);

      // saves the new list of updates to local storage
      saveSensors(this.locations, this.latestActivity, this.date, this.time, this.dataSet)
    });

  }

  updateData() {
    console.log(this.locations[0].getNoMotions())
    this.dataSet = [this.locations[0].getNoMotions(), this.locations[1].getNoMotions(), 
    this.locations[2].getNoMotions(), this.locations[3].getNoMotions(), 
    this.locations[4].getNoMotions()];
         
  }

  // Triggers the connection to the MQTT broker, allows the client to recieve messages and disconnect.
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
