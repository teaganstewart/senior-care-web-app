import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { ScrollView, FlatList } from 'react-native-gesture-handler'

import { mainStyles } from './style'

import { Card, Avatar } from 'react-native-paper'

class BatteryStatusScreen extends Component {
    render() {
        return (
            <View style={mainStyles.container}>

                <View style={mainStyles.header}>
                    <Text style={mainStyles.title}> Battery Status </Text>
                </View>

                <View style={mainStyles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                <ScrollView>
                    <FlatList>

                    </FlatList>
                </ScrollView>
            </View>
        )
    }
}

export default BatteryStatusScreen;