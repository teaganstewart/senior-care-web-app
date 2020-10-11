import React, { Component } from 'react'
import { View, Text, Image, Dimensions } from 'react-native'
import { Card } from 'react-native-paper'
import addNotification from 'react-push-notification';

import { loadHouseImage } from '../data/ImageLoader'
import { SensorsContextConsumer } from '../data/SensorStorage'
import { LineChart, BarChart } from "react-native-chart-kit";

import { mainStyles, homeStyles, batteryStyles } from './style'
import { ScrollView } from 'react-native-gesture-handler';


class SeniorStatusScreen extends Component {

    state = {
        trigger: true,
        chartConfig: {
            backgroundGradientFrom: "white",
            backgroundGradientFromOpacity: "1",
            backgroundGradientTo: "lightgrey",
            backgroundGradientToOpacity: 1,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            labelColor: (opacity = 1) => `black`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false, // optional
        },
        data: {
            labels: ["Living", "Kitchen", "Dining", "Toilet", "Bedroom"],
            datasets: [
                {
                    data: [20, 45, 28, 80, 99],
                    color: (opacity = 1) => `black`, // optional
                    strokeWidth: 2 // optional
                }
            ],
            legend: ["Movements by Room"] // optional
        }
    }

    triggerNotification() {
        if (this.state.trigger) {
            addNotification({
                title: 'Smart Eldercare',
                message: 'No motion has been detected for 5 minutes.',
                theme: 'darkblue',
                duration: 10000,
                native: true, // when using native, your OS will handle theming.
                onClick: e => this.props.navigation.navigate('Home')

            });

            this.setState({ trigger: false })
        }
    }


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
                                    {(value.activityLocation === "") ? <> </> :

                                        <Text> {"Last Motion in " + value.activityLocation + " at " +
                                            value.activityDate + " " + value.activityTime}</Text>

                                    }

                                    <Text> {"Minutes since last motion: " + Math.floor(((Math.floor(new Date().getTime() / 1000) -
                                        Math.floor(Date.parse(value.activityDate + "T" + value.activityTime) / 1000))) / 60)}</Text>

                                    {(Math.floor(((Math.floor(new Date().getTime() / 1000) - Math.floor(Date.parse(value.activityDate +
                                        "T" + value.activityTime) / 1000))) / 60) === 5) ? this.triggerNotification() : <> </>}

                                </Card>

                                <Card style={batteryStyles.listCard}>
                                    <Image source={loadHouseImage(value.activityLocation)} style={homeStyles.houseImage} />

                                </Card>
                            </View>
                        }

                    </SensorsContextConsumer>


                    <Card style={batteryStyles.listCard}>
                        <LineChart
                            title="Hello"
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