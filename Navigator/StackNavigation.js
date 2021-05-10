import React from 'react';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import Home from '../Screens/Home';
import DisplayWeapons from '../Screens/DisplayWeapons'
import RandomGun from '../Screens/RandomGun'

import SkinSearch from "../Screens/SkinSearch"
import SkinSearchResults from '../Screens/SkinSearchResults';
// 
const Stack = createStackNavigator();

const HomeScreenStack = props => {
    return(
        <Stack.Navigator title = {SkinSearch}>
            <Stack.Screen name = "Home" component = {Home} 
             options = {{headerTitle: props => <SkinSearch {...props}/>, headerStyle: {backgroundColor: '#192a56'}}}
            />
            <Stack.Screen name = "Display Weapons" component = {DisplayWeapons} options = {{headerTintColor: 'white', headerStyle: {backgroundColor: '#192a56'}}}/>
            <Stack.Screen name = "Random Gun" component = {RandomGun} options = {{headerTintColor: 'white', headerStyle: {backgroundColor: '#192a56'}}}/>
            <Stack.Screen name = "Skin Search Results" component = {SkinSearchResults} options = {{headerTintColor: 'white', headerStyle: {backgroundColor: '#192a56'}}}/>
        </Stack.Navigator>
    )
}
export {HomeScreenStack}