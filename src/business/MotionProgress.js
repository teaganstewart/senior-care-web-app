import ProgressBar from 'react-native-progress/Bar';

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Card } from 'react-native-paper';
import { batteryStyles } from '../presentation/style';
import { SensorsContextConsumer } from '../data/SensorStorage';


class MotionProgress extends Component {

    render() {
        return (
            <View>
                <Card style={batteryStyles.listCard}>
                    <SensorsContextConsumer>
                        {(value) => {
                            <Text> { value.motionData.length}</Text>
                        //     {(value.motionData)
                        //         ? value.motionData.map((m) => <Text> hi </Text>)
                            
                        //     : <Text> hello </Text>
                        // }



                        }}
                    </SensorsContextConsumer>
                </Card>

            </View>
        )
    }
}

export default MotionProgress;