import React, { useState, useEffect } from 'react';
import {SafeAreaView, TouchableOpacity ,Image, Button, StyleSheet} from 'react-native';
const Home = props => {
    const [PhoenixGuns, setPhoenixGuns] = useState([]); // list of guns in Phoenix Case
    const [notFinished, setNotFinished] = useState(true); // this is to ensure that the api call is finished before opening case
    useEffect(() => {
        const searchGuns = async() => {
             let search = await fetch(`http://csgobackpack.net/api/GetItemsList/v2/?prettyprint=true`)
            .then(response => response.json())
            .then(data => data.items_list)
            let guns = keys() // all the keys for the guns
            guns.forEach(element => {
                PhoenixGuns.push(search[element])
            });
            setNotFinished(false);
        }
        searchGuns()
    },[]) // only run ONCE
    return(
        <SafeAreaView 
            style = {{alignItems: `center`, backgroundColor: 'white'}}>
            <TouchableOpacity // when the image is clicked display possible weapons
                onPress = {() => props.navigation.navigate("Display Weapons", {guns: weaponsDisplayReturn(PhoenixGuns)})} // go to Display Weapons and transport over the weapons to display
                disabled = {notFinished}>
                <Image
                    source = {{
                        uri: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFUuh6qZJmlD7tiyl4OIlaGhYuLTzjhVupJ12urH89ii3lHlqEdoMDr2I5jVLFFSv_J2Rg/256fx256f'
                    }}
                    style = {style.caseImage}
                />
             </TouchableOpacity>
            <Button
                disabled = {notFinished} // to prevent the button from being pressed before useEffect is finished
                onPress = {() => props.navigation.navigate("Random Gun", {gun: randomizer(PhoenixGuns)})}
                title = 'Open Case'

            />
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
const style = StyleSheet.create({
    caseImage: {
        width: 225,
        height: 225
    }
})
const keys = () => { // this was made because importing a text file doesnt work, libraries caused many problems
let x = ['MAG-7 | Heaven Guard (Factory New)', // 0
    'MAG-7 | Heaven Guard (Field-Tested)',
    'MAG-7 | Heaven Guard (Minimal Wear)',
    'MAG-7 | Heaven Guard (Well-Worn)',
    'StatTrak\u2122 MAG-7 | Heaven Guard (Factory New)',
    'StatTrak\u2122 MAG-7 | Heaven Guard (Field-Tested)',
    'StatTrak\u2122 MAG-7 | Heaven Guard (Minimal Wear)',
    'StatTrak\u2122 MAG-7 | Heaven Guard (Well-Worn)',
    'Negev | Terrain (Factory New)', // 8
    'Negev | Terrain (Field-Tested)',
    'Negev | Terrain (Minimal Wear)',
    'Negev | Terrain (Well-Worn)',
    'StatTrak\u2122 Negev | Terrain (Factory New)',
    'StatTrak\u2122 Negev | Terrain (Field-Tested)',
    'StatTrak\u2122 Negev | Terrain (Minimal Wear)',
    'StatTrak\u2122 Negev | Terrain (Well-Worn)',
    'StatTrak\u2122 UMP-45 | Corporal (Battle-Scarred)',
    'StatTrak\u2122 UMP-45 | Corporal (Factory New)',
    'StatTrak\u2122 UMP-45 | Corporal (Field-Tested)',
    'StatTrak\u2122 UMP-45 | Corporal (Minimal Wear)',
    'StatTrak\u2122 UMP-45 | Corporal (Well-Worn)',
    'UMP-45 | Corporal (Battle-Scarred)',
    'UMP-45 | Corporal (Factory New)', // 22
    'UMP-45 | Corporal (Field-Tested)',
    'UMP-45 | Corporal (Minimal Wear)',
    'UMP-45 | Corporal (Well-Worn)',
    'StatTrak\u2122 Tec-9 | Sandstorm (Battle-Scarred)',
    'StatTrak\u2122 Tec-9 | Sandstorm (Field-Tested)',
    'StatTrak\u2122 Tec-9 | Sandstorm (Minimal Wear)',
    'StatTrak\u2122 Tec-9 | Sandstorm (Well-Worn)',
    'Tec-9 | Sandstorm (Battle-Scarred)',
    'Tec-9 | Sandstorm (Field-Tested)',
    'Tec-9 | Sandstorm (Minimal Wear)', // 32
    'Tec-9 | Sandstorm (Well-Worn)',
    'FAMAS | Sergeant (Battle-Scarred)',
    'FAMAS | Sergeant (Field-Tested)',
    'FAMAS | Sergeant (Minimal Wear)', // 36
    'FAMAS | Sergeant (Well-Worn)',
    'StatTrak\u2122 FAMAS | Sergeant (Battle-Scarred)',
    'StatTrak\u2122 FAMAS | Sergeant (Field-Tested)',
    'StatTrak\u2122 FAMAS | Sergeant (Minimal Wear)',
    'StatTrak\u2122 FAMAS | Sergeant (Well-Worn)',
    'SG 553 | Pulse (Battle-Scarred)',
    'SG 553 | Pulse (Field-Tested)',
    'SG 553 | Pulse (Minimal Wear)', // 44
    'SG 553 | Pulse (Well-Worn)',
    'StatTrak\u2122 SG 553 | Pulse (Battle-Scarred)',
    'StatTrak\u2122 SG 553 | Pulse (Field-Tested)',
    'StatTrak\u2122 SG 553 | Pulse (Minimal Wear)',
    'StatTrak\u2122 SG 553 | Pulse (Well-Worn)',
    'MAC-10 | Heat (Battle-Scarred)',
    'MAC-10 | Heat (Factory New)', // 51
    'MAC-10 | Heat (Field-Tested)',
    'MAC-10 | Heat (Minimal Wear)',
    'MAC-10 | Heat (Well-Worn)',
    'StatTrak\u2122 MAC-10 | Heat (Battle-Scarred)',
    'StatTrak\u2122 MAC-10 | Heat (Factory New)',
    'StatTrak\u2122 MAC-10 | Heat (Field-Tested)',
    'StatTrak\u2122 MAC-10 | Heat (Minimal Wear)',
    'StatTrak\u2122 MAC-10 | Heat (Well-Worn)',
    'AUG | Chameleon (Battle-Scarred)',
    'AUG | Chameleon (Factory New)', // 61
    'AUG | Chameleon (Field-Tested)',
    'AUG | Chameleon (Minimal Wear)',
    'AUG | Chameleon (Well-Worn)',
    'StatTrak\u2122 AUG | Chameleon (Battle-Scarred)',
    'StatTrak\u2122 AUG | Chameleon (Factory New)',
    'StatTrak\u2122 AUG | Chameleon (Field-Tested)',
    'StatTrak\u2122 AUG | Chameleon (Minimal Wear)',
    'StatTrak\u2122 AUG | Chameleon (Well-Worn)',
    'StatTrak\u2122 P90 | Trigon (Battle-Scarred)',
    'StatTrak\u2122 P90 | Trigon (Field-Tested)',
    'StatTrak\u2122 P90 | Trigon (Minimal Wear)',
    'StatTrak\u2122 P90 | Trigon (Well-Worn)',
    'P90 | Trigon (Battle-Scarred)',
    'P90 | Trigon (Field-Tested)',
    'P90 | Trigon (Minimal Wear)', // 76
    'P90 | Trigon (Well-Worn)',
    'StatTrak\u2122 Nova | Antique (Factory New)',
    'StatTrak\u2122 Nova | Antique (Field-Tested)',
    'StatTrak\u2122 Nova | Antique (Minimal Wear)',
    'Nova | Antique (Factory New)', // 81
    'Nova | Antique (Field-Tested)',
    'Nova | Antique (Minimal Wear)',
    'StatTrak\u2122 AK-47 | Redline (Battle-Scarred)',
    'StatTrak\u2122 AK-47 | Redline (Field-Tested)',
    'StatTrak\u2122 AK-47 | Redline (Minimal Wear)',
    'StatTrak\u2122 AK-47 | Redline (Well-Worn)',
    'AK-47 | Redline (Battle-Scarred)',
    'AK-47 | Redline (Field-Tested)',
    'AK-47 | Redline (Minimal Wear)', // 90
    'AK-47 | Redline (Well-Worn)',
    'AWP | Asiimov (Battle-Scarred)',
    'AWP | Asiimov (Field-Tested)', // 93
    'AWP | Asiimov (Well-Worn)',
    'StatTrak\u2122 AWP | Asiimov (Battle-Scarred)',
    'StatTrak\u2122 AWP | Asiimov (Field-Tested)',
    'StatTrak\u2122 AWP | Asiimov (Well-Worn)',
    '\u2605 Bayonet | Ultraviolet (Battle-Scarred)',
    '\u2605 Bayonet | Ultraviolet (Factory New)',// 99
    '\u2605 Bayonet | Ultraviolet (Field-Tested)',
    '\u2605 Bayonet | Ultraviolet (Minimal Wear)',
    '\u2605 Bayonet | Ultraviolet (Well-Worn)',
    '\u2605 StatTrak\u2122 Bayonet | Ultraviolet (Battle-Scarred)',
    '\u2605 StatTrak\u2122 Bayonet | Ultraviolet (Factory New)',
    '\u2605 StatTrak\u2122 Bayonet | Ultraviolet (Field-Tested)',
    '\u2605 StatTrak\u2122 Bayonet | Ultraviolet (Minimal Wear)',
    '\u2605 StatTrak\u2122 Bayonet | Ultraviolet (Well-Worn)',
    '\u2605 StatTrak\u2122 Bayonet | Night (Battle-Scarred)',
    '\u2605 StatTrak\u2122 Bayonet | Night (Factory New)',
    '\u2605 StatTrak\u2122 Bayonet | Night (Field-Tested)',
    '\u2605 StatTrak\u2122 Bayonet | Night (Minimal Wear)',
    '\u2605 StatTrak\u2122 Bayonet | Night (Well-Worn)',
    '\u2605 Bayonet | Night (Battle-Scarred)',
    '\u2605 Bayonet | Night (Factory New)', // 114
    '\u2605 Bayonet | Night (Field-Tested)',
    '\u2605 Bayonet | Night (Minimal Wear)',
    '\u2605 Bayonet | Night (Well-Worn)',
    '\u2605 Bayonet | Tiger Tooth (Factory New)', // 118
    '\u2605 Bayonet | Tiger Tooth (Minimal Wear)',
    '\u2605 StatTrak\u2122 Bayonet | Tiger Tooth (Factory New)',
    '\u2605 StatTrak\u2122 Bayonet | Tiger Tooth (Minimal Wear)']
    return x;
}
export default Home;
//import PhoenixCaseGuns from '../Guns/PhoenixCaseGuns'