import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'

import { LineChart } from 'react-native-chart-kit'
import { Card } from 'react-native-paper'

import { SensorsContextConsumer } from '../data/SensorStorage'
import { batteryStyles } from '../presentation/style'

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