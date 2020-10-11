import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Card } from 'react-native-paper'
import { loadBatteryImage } from '../data/ImageLoader'
import { SensorsContextConsumer } from '../data/SensorStorage'

import { mainStyles, batteryStyles } from './style'

class BatteryStatusScreen extends Component {
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


    render() {
        return (
            <View style={mainStyles.container}>

                <View style={mainStyles.header}>
                    <Text style={mainStyles.title}> Battery Status </Text>
                </View>

                <View style={mainStyles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                <ScrollView style={batteryStyles.listView}>

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