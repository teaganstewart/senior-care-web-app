import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { ScrollView } from 'react-native-gesture-handler';

import LineGraph from '../business/LineGraph'
import BarGraph from '../business/BarGraph'

import { mainStyles, homeStyles, batteryStyles } from './style'

class StatisticsScreen extends Component {
    render() {
        return (
            <View style={mainStyles.container}>

                <View style={mainStyles.header}>
                    <Text style={mainStyles.title}> Statistics </Text>
                </View>

                <View style={mainStyles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                <ScrollView  showsVerticalScrollIndicator={false}  style={homeStyles.viewStyle}>
                    {/* Displays the graph which represents the number of detected motions in each of the 5 rooms. */}

                        <BarGraph />

                        <LineGraph />

                       
                 
                </ScrollView>

            </View>
        )
    }
}

export default StatisticsScreen;