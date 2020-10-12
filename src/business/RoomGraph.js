import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'

import { LineChart } from 'react-native-chart-kit'

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
        labelTypes: this.reduceLabels(),
        dataTypes: this.reduceData()

    }

    componentDidUpdate(prevProps) {
        if (prevProps.updates.length != this.props.updates.length) {
            this.setState({
                dataTypes: this.reduceData(),
                labelTypes: this.reduceLabels(),
               
            })
        }
      }
    

    reduceLabels() {
        let tempLabels = ["start"]
        let t = 0;
        this.props.updates.forEach(e => tempLabels.push(e.time))


        return tempLabels;
    }

    reduceData() {
        let tempData = [0]
        this.props.updates.forEach(e => tempData.push(e.motion));

        return tempData;
    }

    render() {
        return (
            <View>

                <LineChart
                    style={{ fontFamily: 'bebas-neue', marginLeft: '9%', paddingBottom: 10 }}
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