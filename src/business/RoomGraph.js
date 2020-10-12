import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'

import { LineChart } from 'react-native-chart-kit'

/**
 * Creates the graph that displays all updates from a certain rooms sensor. This class takes
 * props that have all updates from the location and the location name.
 */
class RoomGraph extends Component {

    state = {
        // sets the settings for the graphs.
        chartConfig: {
            backgroundGradientFrom: "white",
            backgroundGradientFromOpacity: 0.5,
            backgroundGradientTo: "lightgrey",
            backgroundGradientToOpacity: 0,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            labelColor: (opacity = 1) => `black`,
            strokeWidth: 2,
            barPercentage: 0.5,
            useShadowColorFromDataset: false,
            yAxisIncrement: 1,
        },

        // sets the labels and data for the graphs.
        labelTypes: this.reduceLabels(),
        dataTypes: this.reduceData()

    }

    /**
     * As the sensor data is real time data, the graphs need to update everytime there is a new
     * sensor update. I use props to check this, using this method. This method updates the labels 
     * and data everytime the props are updated.
     * 
     * @param prevProps The previous label and data information.
     */
    componentDidUpdate(prevProps) {
        if (prevProps.updates.length != this.props.updates.length) {
            this.setState({
                dataTypes: this.reduceData(),
                labelTypes: this.reduceLabels(),

            })
        }
    }

    /**
     * Uses the updates to get the time of each update then returns them.
     */
    reduceLabels() {
        let tempLabels = ["start"]
        let t = 0;
        this.props.updates.forEach(e => tempLabels.push(e.time))


        return tempLabels;
    }

    /**
     * Uses the updates to get the motion data of each update then returns them.
     */
    reduceData() {
        let tempData = [0]
        this.props.updates.forEach(e => tempData.push(e.motion));

        return tempData;
    }

    /**
     * Renders the graphs on the senior status page, one for each location.
     */
    render() {
        return (
            <View>

                <LineChart
                    style={{ fontFamily: 'bebas-neue', marginLeft: '2%', paddingBottom: 10 }}
                    data={
                        {
                            labels: this.state.labelTypes,
                            datasets: [
                                {
                                    data: this.state.dataTypes,
                                    color: (opacity = 1) => `black`,
                                    strokeWidth: 2
                                }
                            ],
                            legend: [this.props.location + " Movements"]

                        }
                    }
                    width={Dimensions.get('window').width * 0.84}
                    height={220}
                    chartConfig={this.state.chartConfig}
                />

            </View>
        )
    }
}

export default RoomGraph;