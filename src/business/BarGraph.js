import React, { Component } from 'react'
import { View, Dimensions, Text } from 'react-native'

import { BarChart } from 'react-native-chart-kit'
import { Card } from 'react-native-paper'

import { SensorsContextConsumer } from '../data/SensorStorage'

import { batteryStyles } from '../presentation/style'

/**
 * The bar graph class provides an alternate way of displaying the motion data. The data is displayed
 * with each room having a bar which shows the total number of movements detected in that room.
 */
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

    /**
     * Returns the room with the most movement. Used in the statistics page to show which room
     * the senior spends the most time in.
     * 
     * @param motionData All the motion data of all the rooms, each index contains an integer 
     * corresponding to the number of deteced movements in a room.
     */
    getMostMovement(motionData) {
        let index = 0
        let max = motionData[index];

        for (let i = 1; i < motionData.length; i++) {
            if (motionData[i] > max) {
                max = motionData[i];
                index = i;
            }
        }

        // Needed as the motionData field only contains the number of movements, not the locations.
        switch (index) {
            case 1:
                return 'Kitchen'
            case 2:
                return "Dining Room"
            case 3:
                return "Toilet"
            case 4:
                return "Bedroom"
            default:
                return "Living Room"
        }
    }

    /**
     * Renders the bar graph to be used in the statistics page.
     */
    render() {
        return (
            <View>
                <SensorsContextConsumer>
                    {(value) =>
                        <View>
                            {/* Information about where the student spends the most amount of their time, and a 
                             bar graph to display this information. */}
                            <Text style={batteryStyles.cardSmallText, {
                                alignSelf: 'center',
                                paddingBottom: 10
                            }}> {"The senior spends most of their time in the "
                                + this.getMostMovement(value.motionData)}</Text>

                            <Card style={batteryStyles.listCard2}>
                                <BarChart
                                    style={{ fontFamily: 'bebas-neue', marginLeft: '9%' }}
                                    data={
                                        {
                                            labels: ["Living", "Kitchen", "Dining", "Toilet", "Bedroom"],
                                            datasets: [
                                                {
                                                    // a list of integers e.g [0,0,0,0] for no motion
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
                            </Card>
                        </View>

                    }

                </SensorsContextConsumer>


            </View >
        )
    }
}

export default BarGraph;