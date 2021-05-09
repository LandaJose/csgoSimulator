
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const SkinSearchResults = props =>{

    const results = props.route.params.skinResults

    const Item = ({ skinName, icon_url, rarity }) => (
        <View>
            <Image source = {{
                uri: 'https://steamcommunity-a.akamaihd.net/economy/image/'+icon_url
            }}
            style={styles.image}
            />
             <Text>{skinName}</Text>
             <Text>{rarity}</Text>
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
        <SafeAreaView>
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
        width: 100,
        height: 100,
        //width: '100%',
        //height: '100%',
      
    },


});

export default SkinSearchResults