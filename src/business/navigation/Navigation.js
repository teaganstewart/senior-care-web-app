import React from 'react';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

// Imports the required internal components 
import SeniorStatusScreen from '../../presentation/SeniorStatusScreen'
import BatteryStatusScreen from '../../presentation/BatteryStatusScreen'
import StatisticsScreen from '../../presentation/StatisticsScreen';

/**
 * Provides the main bottom tab navigation through the app. Is used on the home page and creates
 * navigation to the home, battery status and statistics pages.
 */
export const TabNavigator = createBottomTabNavigator({

  // Navigation to the battery status screen, where you can check the status of each room's sensors
  Battery: {
    screen: BatteryStatusScreen,
    name: "Battery",
    navigationOptions: () => ({
      header: null,
      tabBarVisible: true,
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `ios-battery-full`;
        return <Ionicons name={iconName} size={25} color={focused ? "#2bc475" : "000000"} />;
      },
    })
  },
  // Navigation to the senior status screen, which displays the latest movements with graphs and images.
  Home: {
    screen: SeniorStatusScreen,
    name: "Senior Status",
    navigationOptions: () => ({
      header: null,
      tabBarVisible: true,
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `ios-home`;
        return <Ionicons name={iconName} size={25} color={focused ? "#2bc475" : "000000"} />;
      },
    })
  },
  // Navigation to the statisitcs screen.
  Statistics: {
    screen: StatisticsScreen,
    name: "Statistics",
    navigationOptions: () => ({
      header: null,
      tabBarVisible: true,
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `ios-stats`;
        return <Ionicons name={iconName} size={25} color={focused ? "#2bc475" : "000000"} />;
      },
    })
  }
},
  {
    initialRouteName: "Home"
  }
);
