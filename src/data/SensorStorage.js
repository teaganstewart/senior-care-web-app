import React, { createContext, useState, useEffect } from 'react';

import { Plugins } from '@capacitor/core';
import { setLocations } from './LocationObject';

const { Storage } = Plugins;

let start = 1;
let location = ""
let date = "";
let time = new Date();

let SensorsContext = createContext({
    data: []
});

/**
 * Saves the sensors data, along with other useful data for the minutes since motion update.
 * 
 * @param sensors The locations and their sensor updates.
 * @param loc The location of the latest motion.
 * @param sDate The date of the latest motion.
 * @param sTime The time of the latest motion.
 */
export async function saveSensors(sensors, loc, sDate, sTime) {
    location = loc;
    date = sDate;
    time = sTime;

    await Storage.set({
        key: 'key',
        value: JSON.stringify(sensors)
    });
}

/**
 * Collects the sensor data from local storage, returns a context provider so that these values
 * can be used throughout the application.
 */
function SensorsContextProvider(props) {
    // stores the initial sensors, so the display and storage update.
    if(start === 1) {
        saveSensors(setLocations(), location, date, time) 
    }

    // makes sure that the storage doesn't update each time the provider/consumer is used.
    start = 0;
    const [initialSensors, setInitialSensors] = useState(setLocations());
   
    useEffect(() => {

        // checks local storage for they key
        Promise.resolve(Storage.get({ key: 'key' }).then(
            (result) => {
                // if the key exists and has data it sets the list of sensors to the result.
                if (typeof result.value === 'string') {
                    setInitialSensors(JSON.parse(result.value));
                } 
            },
            (reason) => console.log("Failed to load from storage because of: " + reason)
        ));


    });

    return (
        <SensorsContext.Provider value={{ data: initialSensors, activityLocation : location,
             activityDate: date, activityTime: time}}>{props.children}</SensorsContext.Provider>
    )
}

let SensorsContextConsumer = SensorsContext.Consumer;

export { SensorsContext, SensorsContextProvider, SensorsContextConsumer }