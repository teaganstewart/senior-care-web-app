## Senior Care Application - Internet of Things

This repository is a senior care web application I created for my Mobile Development course at Victoria University of Wellington. It is mainly web-based but can be deployed on mobile phones also. During development, I  worked with React Native and Javascript. <br>

The assignment aimed to teach us about the 'Internet of Things' (IoT). Our University set up fake 'sensors' that tracked a fake senior's movements. Each sensor supplied us information every 10 seconds: containing the room, time, battery life and if any motion was detected. <br>

In my application, I used these movements to analyse the activity of the senior. I used the sensor information to track motion in rooms over time, displaying where the senior was last detected, and where they had been previously. A tab displays the battery life of the sensors. The final page analysed the information into simple graphs: tracking comparisons of total movements in each room, possible concerns with the sensors and more. 

<b>My project no longer works as the socket we were using for the simulated sensor is closed now. There are screenshots of the working application below. If you would like to view my project (code or running it), here are the steps: </b> <br>

 0. You will need Node.js to run using npm
 1. Download my project
 2. Place it into a minimal ionic react project
 3. Navigate to the project location in command line
 4. Run The following commands:     <br/>  
    $ npm install react-native-paho-mqtt <br/>
    $ npm install react-navigation <br/>
    $ npm install react-navigation-stack <br/>
    $ npm install react-navigation-tabs <br/>
    $ npm install @react-native-community/masked-view <br/>
    $ npm install react-native-paper <br/>
    $ npm install react-native-reanimated <br/>
    $ npm install react-native-vector-icons <br/>
    $ npm install react-native-gesture-handler <br/>
    $ npm install @capacitor/core <br/>
    $ npm i react-push-notification <br/>
    $ npm install react-native-chart-kit <br/>
    $ npm install react-native-svg <br/>
    $ npm install react-native-progress --save <br/>
    $ npm install react-native-svg-charts <br/>
    $ npm install react-native-tab-view <br/>

The app should be running. <br>

<b>The latest motion shown on a house map.</b>
![Alt text](/photos/lastMotion.jpg?raw=true "Latest Motion House Map") <br>

<b>Shows where the senior spends most of their time. Contained on the statistics page.</b>
![Alt text](/photos/mostSpent.jpg?raw=true "Most Time Spent Room") <br>

<b>Shows the difference in total movements in different rooms.</b>
![Alt text](/photos/movementsByRoom.jpg?raw=true "Comparison of Total Movements by Room") <br>

<b>Shows movements in a room over time.</b>
![Alt text](/photos/roomTime.jpg?raw=true "Motions over Time in a Room") <br>
