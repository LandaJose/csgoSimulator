import React, { useState, useEffect, useRef } from 'react';
import {SafeAreaView, Button, StyleSheet, Text, TextInput, Platform, RefreshControl, View, TouchableOpacity, Touchable} from 'react-native';
import {createDbTable, addToDb, addToDbBulk, fetchAllData, fetchSpecificData} from '../DBConnection'


import {useNavigation} from '@react-navigation/native' 


const SkinSearch = props => {
    const mountedRef = useRef(true)
    const [skinResults, setSkinResults] = useState('')
    const [notFinished, setNotFinished] = useState(true) // this is to ensure that the api call is finished before opening case
    const [searchSkinName, setSearchSkinName] = useState('')


    const navigation = useNavigation()



    useEffect(() => {
        const searchGuns = async() => {
            let url = Platform.OS === 'web' ? 'https://cors-anywhere.herokuapp.com/http://csgobackpack.net/api/GetItemsList/v2/?prettyprint=true' : 'http://csgobackpack.net/api/GetItemsList/v2/?prettyprint=true'
            /*  **** VISIT THIS SITE TO GET TEMP ACCESS SO THAT WE ARE ABLE TO ACCESS CSGO BACKPACK: https://cors-anywhere.herokuapp.com/**** */
            //https://cors-anywhere.herokuapp.com/
             let search = await fetch(url)
            .then(response => response.json())
            .then(data => data.items_list)
            
            const keys = Object.keys(search)

            let gunsList = [];
            keys.forEach((key, index)=> {
                gunsList.push(search[key])    
               
            });
            addToDbBulk(gunsList);
            
        

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
            navigation.navigate('Skin Search Results', {skinResults: skinResults});
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
        <SafeAreaView style={styles.container}> 
            <TextInput style={styles.searchBox} placeholderTextColor='white' value = {searchSkinName} onChangeText = {(text) => setSearchSkinName(text)} placeholder = "Search Skin Name!"/>
            <View style={{flex: 1}}>{/* SPACER SO THAT INPUT BOX AND BUTTON HAVE SOME SPACE BETWEEN EACH OTHER */}</View> 
            <TouchableOpacity style={styles.button} onPress={() => {
                if(searchSkinName.length < 3){
                    alert("Enter 3 or more characters!")
                }else{
                    fetchSpecificData(searchSkinName, searchHandler);
                }
                }}
                disabled = {notFinished}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
        </SafeAreaView>
        
    )

}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    searchBox: {
        flex: 26,
        height: 35,
        color: 'white',
        paddingLeft: 5,
        borderBottomWidth: 1,
        borderColor: 'white'
    },
    button: {
        flex:8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#273c75',
    },
    buttonText: {
        color: 'white'
    }
})
export default SkinSearch;
