import React, { useState, useEffect, useRef } from 'react';
import {SafeAreaView, Button, StyleSheet, Text, TextInput,} from 'react-native';
import {createDbTable, addToDb, fetchAllData, fetchSpecificData} from '../DBConnection'


import {useNavigation} from '@react-navigation/native' 


const SkinSearch = props => {
    const mountedRef = useRef(true)
    const [skinResults, setSkinResults] = useState('')
    const [notFinished, setNotFinished] = useState(true) // this is to ensure that the api call is finished before opening case
    const [searchSkinName, setSearchSkinName] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const searchGuns = async() => {
            /*  **** VISIT THIS SITE TO GET TEMP ACCESS SO THAT WE ARE ABLE TO ACCESS CSGO BACKPACK: https://cors-anywhere.herokuapp.com/**** */
             let search = await fetch('https://cors-anywhere.herokuapp.com/http://csgobackpack.net/api/GetItemsList/v2/?prettyprint=true')
            .then(response => response.json())
            .then(data => data.items_list)
            
            const keys = Object.keys(search)

            keys.forEach((key, index)=> {
                addToDb(search[key].name, search[key].icon_url, search[key].rarity, search[key].exterior)
            })
            
            
            setNotFinished(false);
        }

        const afterFetchData = (data) => {
            if(data === undefined || data.length == 0){
                searchGuns();
            }else{
                setNotFinished(false);
            }
        }

        createDbTable();
        fetchAllData(afterFetchData);
            
    },[]) // only run ONCE

    useEffect(() => {
        if (mountedRef.current){
            mountedRef.current = false
        }
        else{
            navigation.navigate('SkinSearchResults', {skinResults: skinResults});
        }
    },[skinResults])


    const searchHandler = (data) => {
        let searchArray = [];
        for (let index = 0; index < data.length; index++) {
            searchArray.push(data[index])
        }
        setSkinResults(searchArray)
    }
    return(
        <SafeAreaView> 
            <Text>{props.children}</Text>
            <TextInput 
            value = {searchSkinName}
            onChangeText = {(text) => setSearchSkinName(text)}
            placeholder = "Search Skin Name!"/>
            <Button title="Search" onPress={() => {
                if(searchSkinName.length < 3){
                    alert("Enter 3 or more characters!")
                }else{
                    fetchSpecificData(searchSkinName, searchHandler);
                }
                
                }}
                disabled = {notFinished} />

        </SafeAreaView>
        
    )

}



export default SkinSearch;
