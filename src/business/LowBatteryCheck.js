import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { Card } from 'react-native-paper'
import { FlatList } from 'react-native-gesture-handler'

import { SensorsContextConsumer } from '../data/SensorStorage'

import { batteryStyles } from '../presentation/style'

/**
 * A class that records the sensors that currently have a low battery (<15), and alerts the user of
 * this.
 */
class LowBatteryCheck extends Component {

    /**
     * A method that renders each element in my FlatList. Displays the location and battery of 
     * every sensor that has a low battery.
     * 
     * @param item The current item in the location list that is being displayed.
     */
    renderItem = ({ item }) => {
        return (
            <View>
                {/* Only displays locations with low battery sensor. */}
                {(item.battery <= 15) ?
                    <Card style={batteryStyles.listCard}>

                        <Text style={batteryStyles.cardTitle}> {item.location} </Text>
                        <Text style={batteryStyles.cardSmallText}> {"The sensor only has " +
                            item.battery + "% battery remaining."}</Text>

                    </Card>
                    : <> </>}
            </View>
        );
    };

    /**
     * Renders the low battery alert for the statistics page.
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

export default LowBatteryCheck;