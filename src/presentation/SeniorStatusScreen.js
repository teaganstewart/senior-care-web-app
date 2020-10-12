import React, { Component } from 'react'
import { View, Text, Image, FlatList } from 'react-native'

import { Card } from 'react-native-paper'
import addNotification from 'react-push-notification';
import { ScrollView } from 'react-native-gesture-handler';

import  RoomGraph  from '../business/RoomGraph'
import { loadHouseImage } from '../data/ImageLoader'
import { SensorsContextConsumer } from '../data/SensorStorage'

import { mainStyles, homeStyles, batteryStyles } from './style'

/**
 * Creates the screen and the helper methods for the senior status page. Allows the user to see the latest
 * sensor updates, along with all movements in each location. Provides graphs and information of all motion 
 * detected.
 */
class SeniorStatusScreen extends Component {

    state = {
        trigger: true,
    }

    /**
     * A method that renders each element in my FlatList. Displays each location and their battery in
     * an easy to read card format.
     * 
     * @param item The current item in the location list that is being displayed.
     */
    renderItem = ({ item }) => {
        return (
            <View>
                <Card style={homeStyles.listCard}>
                    <Text style={batteryStyles.cardTitle}> {item.location} </Text>
                    <Text style={batteryStyles.cardSmallText}> {"Movements detected: " + item.motions.length} </Text>

                    {/* Renders the motion graph for the current location. */}
                    <RoomGraph location ={item.location} updates={item.updates}/>
                </Card>
            </View>
        );
    };

    /**
     * A method to create and display a notifcation message that alerts the user if there has been no 
     * motion for 5 minutes. 
     */
    triggerNotification() {
        if (this.state.trigger) {
            addNotification({
                title: 'Smart Eldercare',
                message: 'No motion has been detected for 5 minutes.',
                duration: 10000,
                native: true,
                onClick: e => this.props.navigation.navigate('Home')

            });

            this.setState({ trigger: false }) // makes sure the notification is only triggered once.
        }
    }

    /**
     * The render method that displays the senior status page, and it's elements.
     */
    render() {
        return (
            <View style={mainStyles.container}>

                <View style={mainStyles.header}>
                    <Text style={mainStyles.title}> Recent Activity </Text>
                </View>

                <View style={mainStyles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                <ScrollView showsVerticalScrollIndicator={false} style={homeStyles.viewStyle}>

                    <SensorsContextConsumer>

                        {(value) =>

                            <View >

                                <Card style={homeStyles.houseCard}>

                                    {/* If there is no latest motion location then there has been no detected motion, so don't 
                                    display the latest motions information. */}
                                    {(value.activityLocation === "") ? <> </> :

                                        <Text style={homeStyles.motionTitle}> {"Last Motion in " + value.activityLocation + " at " +
                                            value.activityDate + " " + value.activityTime}</Text>

                                    }

                                    <Text style={batteryStyles.cardText}> {"Minutes since last motion: " + Math.floor(((Math.floor(new Date().getTime() / 1000) -
                                        Math.floor(Date.parse(value.activityDate + "T" + value.activityTime) / 1000))) / 60)}</Text>

                                    {/* If the number of minutes since the last motion is equal to 5, trigger the warning notification. */}
                                    {(Math.floor(((Math.floor(new Date().getTime() / 1000) -
                                        Math.floor(Date.parse(value.activityDate + "T" + value.activityTime) / 1000))) / 60) === 5) ? this.triggerNotification() : <> </>}

                                    {/* The display for the location of the latest motion. */}
                                    <Image source={loadHouseImage(value.activityLocation)} style={homeStyles.houseImage} />


                                </Card>

                                <FlatList
                                    data={value.data}
                                    keyExtractor={(item) => item.location}
                                    renderItem={this.renderItem}
                                >
                                </FlatList>

                            </View>
                        }

                    </SensorsContextConsumer>

                </ScrollView>


            </View>
        )
    }
}

export default SeniorStatusScreen;