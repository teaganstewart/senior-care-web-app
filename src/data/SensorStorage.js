import React, { createContext, useEffect } from 'react';

import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

let SensorsContext = createContext({});
let initialSensors = []

// saves the sensors data to local storage
export async function saveSensors(sensors) {
    await Storage.set({
        key: 'current',
        value: JSON.stringify(sensors)
    });
}

export function addToStorage(sensor) {
    initialSensors.push(sensor)
    saveSensors(initialSensors)
}

function SensorsContextProvider(props) {

    saveSensors([]);

    useEffect(() => {

        // checks the database for they key
        Promise.resolve(Storage.get({ key: 'current' }).then(
            (result) => {
                // if they key exists and has data it sets the list of sensors to the result.
                if (typeof result.value === 'string') {
                    initialSensors = JSON.parse(result.value);
                }
            },
            (reason) => console.log("Failed to load from storage because of: " + reason)
        ));
    });

    return (
        <SensorsContext.Provider value={{ SensorList: initialSensors }}>{props.children}</SensorsContext.Provider>
    )
}

let SensorsContextConsumer = SensorsContext.Consumer;


export { SensorsContext, SensorsContextProvider, SensorsContextConsumer }