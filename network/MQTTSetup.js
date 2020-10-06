import { Client } from 'react-native-paho-mqtt'
import { SensorObject } from '../src/data/SensorObject';
import { addToStorage } from '../src/data/SensorStorage';

export class Broker {

  constructor() {
    
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
        console.log(responseObject.errorMessage);
      }
    });
  }

  recieve() {
    this.client.on('messageReceived', (message) => {
      console.log(message.payloadString)
      addToStorage(new SensorObject(message.payloadString))
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
