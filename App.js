import React from 'react';
import { StyleSheet } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import {TabNavigator} from './src/business/navigation/Navigation'

import useCachedResources from './hooks/useCachedResources';
import { SensorsContextProvider } from './src/data/SensorStorage'
 
import { Broker } from './network/MQTTSetup'

const clientMQTT = new Broker()

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
      <SensorsContextProvider>
        <AppContainer
          screenProps={{ appName: 'PlanTo' }}
        />
      </SensorsContextProvider>
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
