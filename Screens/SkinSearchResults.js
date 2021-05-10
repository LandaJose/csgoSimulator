
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const SkinSearchResults = props =>{

    const results = props.route.params.skinResults

    const Item = ({ skinName, icon_url, rarity }) => (
        <View style={styles.itemContainer}>
            <Image source = {{
                uri: 'https://steamcommunity-a.akamaihd.net/economy/image/'+icon_url
            }}
            style={styles.image}
            />
             <Text style={styles.gunText}>{skinName}</Text>
             <Text style={styles.gunText}>{rarity}</Text>
         </View>
      );

      const renderItem = ({ item }) => (
        <Item 
            skinName = {item.skinName}
            icon_url = {item.icon_url}
            rarity = {item.rarity}
        />
      );
      

    return(
        <SafeAreaView style={styles.container}>
            <FlatList
                data={results}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 350,
        height: 250,
    },
    container: {
        backgroundColor: '#273c75'
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#192a56',
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 10,
    },
    gunText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    }


});

export default SkinSearchResults