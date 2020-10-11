import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'

import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Card } from 'react-native-paper'

import { loadBatteryImage } from '../data/ImageLoader'
import { SensorsContextConsumer } from '../data/SensorStorage'

import { mainStyles, batteryStyles } from './style'

/**
 * Creates the screen and helper methods for the battery status screen. Allows the user to easily see
 * what the battery levels of the sensors in the rooms are like.
 */
class BatteryStatusScreen extends Component {

    /**
     * A method that renders each element in my FlatList. Displays each location and their battery in
     * an easy to read card format.
     * 
     * @param item The current item in the location list that is being displayed.
     */
    renderItem = ({ item }) => {
        return (
            <View>
                <Card style={batteryStyles.listCard}>
                    <Text style={batteryStyles.batteryTitle}> {item.location} </Text>

                    <Image source={loadBatteryImage(item.battery)} style={batteryStyles.batteryImage}/>
                    <Text style={batteryStyles.batteryPercentageText}> {item.battery + "%"} </Text>

                </Card>
            </View>
        );
    };

    /**
     * The render method that displays the battery page, and it's elements.
     */
    render() {
        return (
            <View style={mainStyles.container}>

                <View style={mainStyles.header}>
                    <Text style={mainStyles.title}> Battery Status </Text>
                </View>

                <View style={mainStyles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                <ScrollView style={batteryStyles.listView}>

                    {/* The context consumer accesses the sensor locations and their current battery. */}
                    <SensorsContextConsumer>

                        {(value) =>

                            <FlatList
                                data={value.data}
                                keyExtractor={(item) => item.location}
                                renderItem={this.renderItem}
                            >
                            </FlatList>

                        }

                    </SensorsContextConsumer>

                </ScrollView>
            </View>
        )
    }
}

export default BatteryStatusScreen;