import React, { useState, useEffect } from 'react';
import {SafeAreaView, TouchableOpacity ,Image, Button, StyleSheet, FlatList, Text} from 'react-native';
const DisplayWeapons = props => {
    const renderItem = item => {
        return(
            <SafeAreaView style = {styles.container}>
                <Text style = {styles.itemName}>
                    {item.item.name}
                </Text>
                <Image
                    style = {{backgroundColor: '#' + item.item.rarity_color, width: 350, height: 225, borderRadius: 10, marginBottom: 10}}
                    source = {{uri: `https://steamcommunity-a.akamaihd.net/economy/image/${item.item.icon_url_large}`}}   
                />
            </SafeAreaView>
        )
    }
    return(
        <SafeAreaView>
            <FlatList
                data = {props.route.params.guns}
                renderItem = {renderItem}
                keyExtractor = {item => item.classid}
            />
            
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    logo: {
        width: 350,
        height: 225
    },
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#273c75'
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    },
})
export default DisplayWeapons
//props.route.params.guns