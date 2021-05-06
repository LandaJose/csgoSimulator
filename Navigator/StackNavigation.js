import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import DisplayWeapons from '../Screens/DisplayWeapons'
import RandomGun from '../Screens/RandomGun'
// 
const Stack = createStackNavigator();

const HomeScreenStack = props => {
    return(
        <Stack.Navigator>
            <Stack.Screen name = "Home" component = {Home}/>
            <Stack.Screen name = "Display Weapons" component = {DisplayWeapons}/>
            <Stack.Screen name = "Random Gun" component = {RandomGun}/>
        </Stack.Navigator>
    )
}
export {HomeScreenStack}