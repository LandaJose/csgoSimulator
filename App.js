
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreenStack} from './Navigator/StackNavigation'


const App = props => {
  return (
    <NavigationContainer>
      <HomeScreenStack/>
    </NavigationContainer>
  );
}

export default App;