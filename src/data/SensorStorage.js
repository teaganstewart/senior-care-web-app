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

// saves the sensors data to local storage
export async function saveSensors(sensors, loc, sDate, sTime) {
    location = loc;
    date = sDate;
    time = sTime;

    await Storage.set({
        key: 'key',
        value: JSON.stringify(sensors)
    });
}

function SensorsContextProvider(props) {
    if(start === 1) {
        saveSensors(setLocations(), location, date, time) 
    }
    start = 0;
    const [initialSensors, setInitialSensors] = useState(setLocations());
   
    useEffect(() => {

        // checks the database for they key
        Promise.resolve(Storage.get({ key: 'key' }).then(
            (result) => {
                // if they key exists and has data it sets the list of sensors to the result.
                if (typeof result.value === 'string') {

                    setInitialSensors(JSON.parse(result.value));
                } 
            },
            (reason) => console.log("Failed to load from storage because of: " + reason)
        ));


    });

    return (
        <SensorsContext.Provider value={{ data: initialSensors, activityLocation : location, activityDate: date, activityTime: time}}>{props.children}</SensorsContext.Provider>
    )
}

let SensorsContextConsumer = SensorsContext.Consumer;

export { SensorsContext, SensorsContextProvider, SensorsContextConsumer }