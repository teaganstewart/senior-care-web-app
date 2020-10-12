import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'

import { LineChart } from 'react-native-chart-kit'
import { Card } from 'react-native-paper'

import { SensorsContextConsumer } from '../data/SensorStorage'
import { batteryStyles } from '../presentation/style'

/**
 * The first way of displaying the motion data. Provides a line graph on the statistic page, which 
 * plots the number of motions detected in a room compared to the other rooms.
 */
class LineGraph extends Component {
    state = {
        // sets the settings for the graphs.
        chartConfig: {
            backgroundGradientFrom: "white",
            backgroundGradientFromOpacity: 1,
            backgroundGradientTo: "lightgrey",
            backgroundGradientToOpacity: "1",
            opacity: 1,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            labelColor: (opacity = 1) => `black`,
            strokeWidth: 2,
            barPercentage: 0.5,
            useShadowColorFromDataset: false,
            yAxisIncrement: 1,
        },
    }

    /**
     * Renders the line graph for the statistics page.
     */
    render() {
        return (
            <View>
                <Card style={batteryStyles.listCard}>
                    <SensorsContextConsumer>
                        {(value) =>
                            <LineChart
                                style={{ fontFamily: 'bebas-neue', marginLeft: '9%', paddingBottom: 30 }}
                                data={
                                    {
                                        labels: ["Living", "Kitchen", "Dining", "Toilet", "Bedroom"],
                                        datasets: [
                                            {
                                                // a list of integers e.g [0,0,0,0] for no motion
                                                data: value.motionData,
                                                color: (opacity = 1) => `black`,
                                                strokeWidth: 2
                                            }
                                        ],
                                        legend: ["Movements by Room"]

                                    }
                                }
                                width={Dimensions.get('window').width * 0.84}
                                height={220}
                                chartConfig={this.state.chartConfig}
                            />
                        }
                    </SensorsContextConsumer>
                </Card>
            </View>
        )
    }
}

export default LineGraph;