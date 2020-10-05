import { Client } from 'react-native-paho-mqtt'

// Connects to the MQTT Broker
export const client = new Client({ uri: 'ws://test.mosquitto.org:8080/swen325/a3', clientId: 'clientId'});

// set event handlers
client.on('connectionLost', (responseObject) => {
  if (responseObject.errorCode !== 0) {
    console.log(responseObject.errorMessage);
  }
});

client.on('messageReceived', (message) => {
  console.log(message.payloadString);
});

// connect the client
client.connect()
  .then(() => {
    // Once a connection has been made, make a subscription and send a message.
    return client.subscribe('swen325/a3');
  })
  .catch((responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
    }
  })
;

