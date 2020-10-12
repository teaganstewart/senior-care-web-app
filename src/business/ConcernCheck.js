import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { Card } from 'react-native-paper'
import { FlatList } from 'react-native-gesture-handler'

import { SensorsContextConsumer } from '../data/SensorStorage'

import { batteryStyles } from '../presentation/style'

/**
 * A class that records potentional concerns with the sensor readings, e.g. when two sensors go off
 * at the same time when only the senior is at home.
 */
class ConcernCheck extends Component {

    /**
     * A method that renders each element in my FlatList. It checks for conflicts and will display these
     * using a card for each location.
     * 
     * @param item The current item in the location list that is being displayed.
     */
    renderItem = ({ item }) => {
        return (
            <View>
                <Card style={batteryStyles.listCard}>
                    <Text style={batteryStyles.batteryTitle}> {item.location} </Text>
                    <SensorsContextConsumer>
                        {(value) =>
                            <View>
                                <Text> {this.getConflicts(value.data, item, item.location)}</Text>
                            </View>

                        }

                    </SensorsContextConsumer>
                </Card>
            </View>
        );
    };

    /**
     * Finds and returns all the conflicts in the sensor data. Will return a conflict if two locations have
     * a positive motion sensor update at the same time.
     * 
     * @param data The sensor data. 
     * @param item The current item that is being check for conflicts.
     * @param location The location of the current sensor.
     */
    getConflicts(data, item, location) {
        let finalString = ""
        console.log(item.motions.length)
        // loops through current items motion updates
        for (let i = 0; i < item.motions.length; i++) {

            let time = item.motions[i].time;

            //loops through other locations
            for (let j = 0; j < data.length; j++) {

                let currMotions = data[j].motions;

                // compares each motion update to every other motion update, as long as the location is different.
                for (let k = 0; k < currMotions.length; k++) {
                    if (currMotions[k].time === time && currMotions[k].location != location) {
                        
                        // if the times do match, record a conflict.
                        finalString += "Conflict with " + data[j].location + " at " + time + "\n "

                    }
                }
            }
        }

        return finalString;
    }

    /**
     * Render the concerned check section, for use on the statistics page.
     */
    render() {
        return (
            <View>
                <SensorsContextConsumer>
                    {(value) =>
                        <View>
                            <Card style={batteryStyles.listCard3}>
                                <FlatList
                                    data={value.data}
                                    keyExtractor={(item) => item.location}
                                    renderItem={this.renderItem}
                                >
                                </FlatList>
                            </Card>
                        </View>

                    }

                </SensorsContextConsumer>


            </View >
        )
    }
}

export default ConcernCheck;