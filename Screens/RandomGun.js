import React, { useState, useEffect } from 'react';
import {SafeAreaView, TouchableOpacity ,Image, Button, StyleSheet, FlatList, Text} from 'react-native';

const randomGun = props => {
    return(
        <SafeAreaView style = {styles.container}>
            <Text 
                style = {styles.gunName}>
                    {props.route.params.gun.name}
            </Text>
            <Image
                style = {{backgroundColor: '#'+ props.route.params.gun.rarity_color, width: 350, height: 225, borderRadius: 10}}
                source = {{uri: `https://steamcommunity-a.akamaihd.net/economy/image/${props.route.params.gun.icon_url}`}}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#273c75'
    },
    gunName: {
        fontWeight: 'bold',
         fontSize: 22,
          color: 'white',
    }
})
export default randomGun