import React, { useState, useEffect } from 'react';
import {SafeAreaView, TouchableOpacity ,Image, Button, StyleSheet, Platform, Text, View, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {gunsList} from '../Components/Guns'
const Home = props => {
    const [PhoenixGuns, setPhoenixGuns] = useState([]); // list of guns in Phoenix Case
    const [notFinished, setNotFinished] = useState(true); // this is to ensure that the api call is finished before opening case
    const [keyboardDismiss, setKeyboardDismiss] = useState(false);
    useEffect(() => {
        const searchGuns = async() => {
            let url = Platform.OS === 'web' ? 'https://cors-anywhere.herokuapp.com/http://csgobackpack.net/api/GetItemsList/v2/?prettyprint=true' : 'http://csgobackpack.net/api/GetItemsList/v2/?prettyprint=true'
            /*  **** VISIT THIS SITE TO GET TEMP ACCESS SO THAT WE ARE ABLE TO ACCESS CSGO BACKPACK: https://cors-anywhere.herokuapp.com/**** */
            //https://cors-anywhere.herokuapp.com/http://csgobackpack.net/api/GetItemsList/v2/?prettyprint=true
             let search = await fetch(url)
            .then(response => response.json())
            .then(data => data.items_list)
            let guns = keys() // all the keys for the guns
            guns.forEach(element => {
                PhoenixGuns.push(search[element])
            });
            setNotFinished(false);
            Platform.OS === 'web' ? setKeyboardDismiss(true) : setKeyboardDismiss(false) 
        }
        searchGuns()
    },[]) // only run ONCE
    return(
        <SafeAreaView style = {styles.container}>
            <TouchableWithoutFeedback style={{flex: 1}} disabled={keyboardDismiss} onPress={() => Keyboard.dismiss()}>
                <View style={{flex:1}}>
                    <TouchableOpacity // when the image is clicked display possible weapons
                        onPress = {() => props.navigation.navigate("Display Weapons", {guns: weaponsDisplayReturn(PhoenixGuns)})} // go to Display Weapons and transport over the weapons to display
                        disabled = {notFinished}
                        style={styles.viewCase}>
                        <Image
                            source = {{
                                uri: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFUuh6qZJmlD7tiyl4OIlaGhYuLTzjhVupJ12urH89ii3lHlqEdoMDr2I5jVLFFSv_J2Rg/256fx256f'
                            }}
                            style = {styles.caseImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled = {notFinished} // to prevent the button from being pressed before useEffect is finished
                        onPress = {() => props.navigation.navigate("Random Gun", {gun: randomizer(PhoenixGuns)})}
                        style={styles.openCaseButton}>
                        <Text style={{color: 'white'}}>Open Case</Text>
                    </TouchableOpacity>
                    <Text style={styles.loading}>{notFinished ? "Case Contents Loading Please Wait..." : ""}</Text>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}
const randomizer = (guns) => {
    let chanceStatTrak = (Math.random() * 100) + 1 // 1 to 100 if less than 10, is statTrak
    let gunRarityChance = (Math.random() * 100) + 1
    let gunRarity = ""
    let isStatTrack = false
    let listOfWeapons = []
    if(gunRarityChance < 79.92) { // 79.92
        gunRarity = 'Mil-Spec Grade'
    }
    else if (gunRarityChance < 95.9) { // 15.98
        gunRarity = 'Restricted'
    }
    else if(gunRarityChance < 99.1) { // 3.2
        gunRarity = 'Classified'
    }
    else {
        gunRarity = 'Covert'
    }
    if(chanceStatTrak < 10) {
        isStatTrack = true
    }
    guns.forEach(element => {
        if(element.rarity === gunRarity && isStatTrack === element.name.includes('StatTrak')) { // if the rarity matches the name and isStatTracked
            listOfWeapons.push(element)
        }
    });
    let randomGun = Math.floor(Math.random() * listOfWeapons.length)
    return listOfWeapons[randomGun]


}
const weaponsDisplayReturn = (guns) => {
    const index = [0,8,22,32,36,44,51,76,81,90,61,93,99,114,118] // all the indexs of guns list for display, 61 is in a odd place because of the rarity
    let gunsDisplay = []; // this will contain the guns to display when clicking the image of the case 
    index.forEach(element => {
        gunsDisplay.push(guns[element])
    });
    return gunsDisplay
}
const styles = StyleSheet.create({
    caseImage: {
        width: 225,
        height: 225,
        alignSelf: 'center',
    },
    container: {
        backgroundColor: '#273c75',
        flex: 1
    },
    openCaseButton: {
        backgroundColor: '#192a56',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: '5%',
        marginHorizontal: 10,
        borderRadius: 5,
        height: '5%',
    },
    viewCase: {
        borderRadius: 5,
        marginHorizontal: 10,
        height: '30%',
    },
    loading: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
        textAlign: 'center'
    }
})
const keys = () => { // this was made because importing a text file doesnt work, libraries caused many problems **EDIT guns moved to seperate file**
let x = gunsList
    return x;
}
export default Home;
//import PhoenixCaseGuns from '../Guns/PhoenixCaseGuns'