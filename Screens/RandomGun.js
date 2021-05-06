import React, { useState, useEffect } from 'react';
import {SafeAreaView, TouchableOpacity ,Image, Button, StyleSheet, FlatList, Text} from 'react-native';

const randomGun = props => {
    return(
        <SafeAreaView style = {{alignItems: 'center'}}>
            <Text 
                style = {{fontWeight: 'bold', fontSize: 22}}>
                    {props.route.params.gun.name}
            </Text>
            <Image
                style = {{backgroundColor: '#'+ props.route.params.gun.rarity_color, width: 350, height: 225}}
                source = {{uri: `https://steamcommunity-a.akamaihd.net/economy/image/${props.route.params.gun.icon_url}`}}
            />
        </SafeAreaView>
    )
}
export default randomGun