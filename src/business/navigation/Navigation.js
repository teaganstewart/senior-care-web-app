import React from 'react';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

// Imports the required external pages 
import SeniorStatusScreen from '../../presentation/SeniorStatusScreen'
import BatteryStatusScreen from '../../presentation/BatteryStatusScreen'
import StatisticsScreen from '../../presentation/StatisticsScreen';

/* Provides the main bottom tab navigation through the app. Is used on the home page and creates
navigation to the account, map and calendar pages. */
export const TabNavigator = createBottomTabNavigator({

  // Navigation to the account screen, where you can logout
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
  // Navigation to the map screen that shows the location of all events
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
