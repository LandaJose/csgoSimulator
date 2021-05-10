import {openDatabase} from 'expo-sqlite'
import {Platform} from 'react-native'

const db = openDatabase('csgoSkins')

const createDbTable = () => {
    db.transaction(trx => {
        trx.executeSql(
            "Create table if not exists skins (id INTEGER PRIMARY KEY AUTOINCREMENT, skinName TEXT, icon_url TEXT, rarity TEXT, exterior TEXT)",[],
            (txObj, resultSet) => console.log("Success table created"),
            (txObj, error) => console.log("Error", error)
        )
    })
}

const addToDb = (skinName, icon_url, rarity, exterior) => {
    db.transaction(trx => {
        trx.executeSql(
            "Insert into skins (skinName , icon_url , rarity , exterior) VALUES (?, ?, ?, ?)",[skinName, icon_url, rarity, exterior],
            (txObj, resultSet) => null,
            (txObj, error) => console.log("Error", error)
        )
    })
}

const addToDbBulk = (data) => {
    db.transaction(trx => {
        
        data.forEach( item => {
            trx.executeSql(
                "Insert into skins (skinName , icon_url , rarity , exterior) VALUES (?, ?, ?, ?)",[item.name, item.icon_url, item.rarity, item.exterior],
                (txObj, resultSet) => null,
                (txObj, error) => console.log("Error", error)
            )
        });
    })
}


const fetchAllData = (successCallback) => {
    if (Platform.OS === "web"){
        webFetchAllData(successCallback)
    }
    else{
        mobileFetchAllData(successCallback)
    }
}

const mobileFetchAllData = (successCallback) =>{
    db.transaction(trx => {
        trx.executeSql(
            "SELECT * from skins",[],
            (txObj, {rows: {_array}}) => successCallback(_array),
            (txObj, error) => console.log("Error", error)
        )
    })
}

const webFetchAllData = (successCallback) =>{
    db.transaction(trx => {
        trx.executeSql(
            "SELECT * from skins",[],
            (txObj, resultsSet) => successCallback(resultsSet.rows),
            (txObj, error) => console.log("Error", error)
        )
    })
}


const fetchSpecificData = (query, successCallback) => {
    if (Platform.OS === "web"){
        webFetchSpecificData(query, successCallback)
    }
    else{
        mobileFetchSpecificData(query, successCallback)
    }
}

const mobileFetchSpecificData = (query, successCallback) =>{
    db.transaction(trx => {
        trx.executeSql(
            "SELECT * from skins where skinName like '%' || ? || '%'", [query],
            (txObj, {rows: {_array}}) => successCallback(_array),
            (txObj, error) => console.log("Error", error)
        )
    })
}

const webFetchSpecificData = (query, successCallback) =>{
    console.log(query);
    db.transaction(trx => {
        trx.executeSql(
            "SELECT * from skins where skinName like '%' || ? || '%'",[query],
            (txObj, resultsSet) => successCallback(resultsSet.rows),
            (txObj, error) => console.log("Error", error)
        )
    })
}

export {createDbTable, addToDb, addToDbBulk, fetchAllData, fetchSpecificData}



