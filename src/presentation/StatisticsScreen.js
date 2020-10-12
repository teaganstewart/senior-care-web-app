import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { ScrollView } from 'react-native-gesture-handler';

import LineGraph from '../business/LineGraph'
import BarGraph from '../business/BarGraph'
import ConcernCheck from '../business/ConcernCheck'
import LowBatteryCheck from '../business/LowBatteryCheck'

import { mainStyles, homeStyles, batteryStyles } from './style'

/**
 * Creates the screen and the helper methods for the statistics page. Provides secondary information about
 * the sensors. 
 */
class StatisticsScreen extends Component {

    /**
     * Renders the whole statistics screen, uses external components for the graphs and check sections.
     */
    render() {
        return (
            <View style={mainStyles.container}>

                <View style={mainStyles.header}>
                    <Text style={mainStyles.title}> Statistics </Text>
                </View>

                <View style={mainStyles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                <ScrollView showsVerticalScrollIndicator={false} style={homeStyles.viewStyle}>

                    <Text style={mainStyles.statisticsSubTitle}> Comparison of Movement in the Rooms </Text>
                    {/* Displays the graphs which represents the number of detected motions in each of the 5 rooms. */}

                    <BarGraph />

                    <LineGraph />

                    <Text style={mainStyles.statisticsSubTitle}> Low Battery </Text>
                    <Text style={batteryStyles.cardSmallText, { alignSelf: 'center', paddingBottom: 10 }}>
                        {"The following sensors will probably need replacing soon."} 
                    </Text>

                    <LowBatteryCheck/>

                    <Text style={mainStyles.statisticsSubTitle}> Concerning Activity </Text>
                    <Text style={batteryStyles.cardSmallText, { alignSelf: 'center', paddingBottom: 10 }}>
                        {"Areas of two or more motions detected at once. Could be a concern if the elder is home " + 
                        "alone, possibly a sensor malfunction or intruder."}
                    </Text>

                    <ConcernCheck />

                </ScrollView>

            </View>
        )
    }
}

export default StatisticsScreen;