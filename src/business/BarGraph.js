import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'

import { BarChart } from 'react-native-chart-kit'
import { Card } from 'react-native-paper'

import { SensorsContextConsumer } from '../data/SensorStorage'

import { batteryStyles } from '../presentation/style'

class BarGraph extends Component {
    state = {
        // sets the settings for the graphs.
        chartConfig: {
            backgroundGradientFrom: "white",
            backgroundGradientFromOpacity: 0.1,
            backgroundGradientTo: "lightgrey",
            backgroundGradientToOpacity: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `black`,
            strokeWidth: 4,
            barPercentage: 0.5,
            useShadowColorFromDataset: false,
            yAxisIncrement: 1,
        },
    }

    render() {
        return (
            <View>
                <Card style={batteryStyles.listCard2}>
                    <SensorsContextConsumer>
                        {(value) =>
                            <BarChart
                                style={{ fontFamily: 'bebas-neue', marginLeft: '9%' }}
                                data={
                                    {
                                        labels: ["Living", "Kitchen", "Dining", "Toilet", "Bedroom"],
                                        datasets: [
                                            {
                                                data: value.motionData,
                                                color: (opacity = 1) => `black`,
                                                strokeWidth: 4,
                                            }
                                        ],
                                        legend: ["Movements by Room"]

                                    }
                                }
                                width={Dimensions.get('window').width * 0.76}
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

export default BarGraph;