import { createContext, useState, useEffect } from 'react';

import { Plugins } from '@capacitor/core';
import React from 'react';

const { Storage } = Plugins;

let SensorsContext = createContext({});


// saves the sensors data to local storage
export async function saveSensors(es) {
    await Storage.set({
        key: 'current',
        value: JSON.stringify(es)
    });
}

function SensorsContextProvider(props) {

    const [initialSensors, setInitialSensors] = useState([]);

    useEffect(() => {

        // checks the database for they key
        Promise.resolve(Storage.get({ key: 'current'}).then(
            (result) => {
                // if they key exists and has data it sets the list of sensors to the result.
                if (typeof result.value === 'string') {
                    setInitialSensors(JSON.parse(result.value));

                }
            },
            (reason) => console.log("Failed to load Sensors from storage because of: " + reason)
        ));
    }, []);

    return (
        <SensorsContext.Provider value={{ SensorList: initialSensors }}>{props.children}</SensorsContext.Provider>
    )
}

let SensorsContextConsumer = SensorsContext.Consumer;


export { SensorsContext, SensorsContextProvider, SensorsContextConsumer }