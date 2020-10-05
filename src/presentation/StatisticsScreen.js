import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { mainStyles } from './style'

class StatisticsScreen extends Component {
    render() {
        return (
            <View style={mainStyles.container}>

                <View style={mainStyles.header}>
                    <Text style={mainStyles.title}> Statistics </Text>
                </View>

                <View style={mainStyles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            </View>
        )
    }
}

export default StatisticsScreen;