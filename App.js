import React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import {TabNavigator} from './src/business/navigation/Navigation'

import useCachedResources from './hooks/useCachedResources';


import { client } from './MQTTSetup'

const clientMQTT = client;

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    App: TabNavigator,
  },
  {
    initialRouteName: 'App',
  }
));

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (

      <AppContainer
        screenProps={{ appName: 'PlanTo' }}
      />
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
