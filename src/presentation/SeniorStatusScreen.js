import React, { Component } from 'react'
import { View, Text, Image, Dimensions } from 'react-native'

import { Card } from 'react-native-paper'
import addNotification from 'react-push-notification';
import { ScrollView } from 'react-native-gesture-handler';
import { LineChart } from "react-native-chart-kit";

import { loadHouseImage } from '../data/ImageLoader'
import { SensorsContextConsumer } from '../data/SensorStorage'

import { mainStyles, homeStyles, batteryStyles } from './style'

/**
 * Creates the screen and the helper methods for the senior status page. Allows the user to see the latest
 * sensor updates, along with all movements in each location. Provides graphs and information of all motion 
 * detected.
 */
class SeniorStatusScreen extends Component {

    state = {
        trigger: true,
        // sets the settings for the graphs.
        chartConfig: {
            backgroundGradientFrom: "white",
            backgroundGradientFromOpacity: "1",
            backgroundGradientTo: "lightgrey",
            backgroundGradientToOpacity: 1,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            labelColor: (opacity = 1) => `black`,
            strokeWidth: 2, 
            barPercentage: 0.5,
            useShadowColorFromDataset: false, 
        },
        // the data that is used in the graphs.
        data: {
            labels: ["Living", "Kitchen", "Dining", "Toilet", "Bedroom"],
            datasets: [
                {
                    data: [20, 45, 28, 80, 99],
                    color: (opacity = 1) => `black`, 
                    strokeWidth: 2 
                }
            ],
            legend: ["Movements by Room"] 
        }
    }

    /**
     * A method to create and display a notifcation message that alerts the user if there has been no 
     * motion for 5 minutes. 
     */
    triggerNotification() {
        if (this.state.trigger) {
            addNotification({
                title: 'Smart Eldercare',
                message: 'No motion has been detected for 5 minutes.',
                duration: 10000,
                native: true, 
                onClick: e => this.props.navigation.navigate('Home')

            });

            this.setState({ trigger: false }) // makes sure the notification is only triggered once.
        }
    }

    /**
     * The render method that displays the senior status page, and it's elements.
     */
    render() {
        return (
            <View style={mainStyles.container}>

                <View style={mainStyles.header}>
                    <Text style={mainStyles.title}> Recent Activity </Text>
                </View>

                <View style={mainStyles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                <ScrollView style={homeStyles.viewStyle}>
                    <SensorsContextConsumer>

                        {(value) =>
                            <View >

                                <Card style={batteryStyles.listCard}>
                                    {/* If there is no latest motion location then there has been no detected motion, so don't 
                                    display the latest motions information. */}
                                    {(value.activityLocation === "") ? <> </> :

                                        <Text> {"Last Motion in " + value.activityLocation + " at " +
                                            value.activityDate + " " + value.activityTime}</Text>

                                    }

                                    <Text> {"Minutes since last motion: " + Math.floor(((Math.floor(new Date().getTime() / 1000) -
                                        Math.floor(Date.parse(value.activityDate + "T" + value.activityTime) / 1000))) / 60)}</Text>

                                    {/* If the number of minutes since the last motion is equal to 5, trigger the warning notification. */}
                                    {(Math.floor(((Math.floor(new Date().getTime() / 1000) - Math.floor(Date.parse(value.activityDate +
                                        "T" + value.activityTime) / 1000))) / 60) === 5) ? this.triggerNotification() : <> </>}

                                </Card>
                                
                                <Card style={batteryStyles.listCard}>
                                    {/* The display for the location of the latest motion. */}
                                    <Image source={loadHouseImage(value.activityLocation)} style={homeStyles.houseImage} />

                                </Card>
                            </View>
                        }

                    </SensorsContextConsumer>
                    
                    {/* Displays the graph which represents the number of detected motions in each of the 5 rooms. */}
                    <Card style={batteryStyles.listCard}>
                        <LineChart
                            style={{ fontFamily: 'bebas-neue'}}
                            data={this.state.data}
                            width={Dimensions.get('window').width/2.5}
                            height={220}
                            chartConfig={this.state.chartConfig}
                        />
                    </Card>
                </ScrollView>
            </View>
        )
    }
}

export default SeniorStatusScreen;