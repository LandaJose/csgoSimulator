import React, { useState, useEffect } from 'react';
import {SafeAreaView, TouchableOpacity ,Image, Button, StyleSheet, FlatList, Text} from 'react-native';
const DisplayWeapons = props => {
    const renderItem = item => {
        return(
            <SafeAreaView
                style = {{alignItems: 'center', }}
            >
                <Text style = {{fontWeight: 'bold', fontSize: 20}}>
                    {item.item.name}
                </Text>
                <Image
                    style = {{backgroundColor: '#' + item.item.rarity_color, width: 350, height: 225}}
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
                contentContainerStyle = {{ paddingBottom : 50}}
            />
            
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    logo: {
        width: 350,
        height: 225
    }
})
export default DisplayWeapons
//props.route.params.guns