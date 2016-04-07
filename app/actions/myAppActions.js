import * as types from './actionTypes';
import { myApiKey } from '../mySecrets';

import * as StorageKeys from '../StorageKeys';

import { RIOT_API_URLS, getRiotApiUrl } from '../utils';

export function getChampionData(){
    return function(dispatch) {
        var REQUEST_URL = "https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?dataById=true&champData=image&api_key=" + myApiKey;
        return fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {

                var keys = Object.keys(responseData.data),
                    champions = [];
                for(var i = 0; i < keys.length; i++){
                    var champion = responseData.data[keys[i]];
                    champions.push(champion);
                }

                dispatch(setChampionData(champions));
            })
            .done();
    }
}

export function setChampionData(championData){
    return {
        type: types.SET_STATIC_CHAMPIONS,
        championData
    }
}

export function setFilteredChampions(championData){
    return {
        type: types.SET_FILTERED_CHAMPIONS,
        championData
    }
}

// I'm not exactly sure if this is best practice,
// chaining actions together. But I can't really think of
// another way to achieve the same.
// Especially the part where I pass dispatch to getLiveGame seems a little shady.
export function searchForLiveGameBySummonerName(region, summonerName){
    return function(dispatch){
        var options = {
                summonerName,
                region
            },
            builtUrl = getRiotApiUrl(RIOT_API_URLS.SUMMONER_DATA, options),
            REQUEST_URL = builtUrl + myApiKey;

        console.log("Searching for summoner data:", REQUEST_URL);
        return fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {

                // Comes in the format of
                // { "snowwhite" :
                //      {
                //          "name" : "Snow White",
                //          "id" : 308738,
                //          ....
                //      }
                // }
                // which is impractical.

                var summonerData = extractSummonerDataFromResponse(responseData);

                dispatch(setSummonerData(summonerData));
                getLiveGame(region, summonerData.id, dispatch);
            }).done()
    }
}

export function setSummonerData(summonerData){
    return {
        type: types.SET_SUMMONERDATA,
        summonerData
    }
}

export function getLiveGame(region, summonerId, dispatch){
    var options = {
            region: region,
            summonerId
        },
        builtUrl = getRiotApiUrl(RIOT_API_URLS.LIVE_GAME, options),
        REQUEST_URL = builtUrl + myApiKey;

    console.log("Searching for live game:", REQUEST_URL);
    fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
            dispatch(setLiveGame(responseData));
        }).done();
}

export function setLiveGame(liveGame){
    return{
        type: types.SET_LIVEGAME,
        liveGame
    }
}

function extractSummonerDataFromResponse(responseData){
    var key = Object.keys(responseData)[0];
    return responseData[key];
}

export function getStaticData(){
    return function(dispatch){

        AsyncStorage.getItem(StorageKeys.STATIC_RUNES)
            .then((err, result) =>{
                if(err){
                    getRuneDataFromApi(dispatch);
                } else {
                    dispatch(setRuneData(result));
                }
            }).done();

        AsyncStorage.getItem(StorageKeys.STATIC_MASTERIES)
            .then((err, result) =>{
                if(err){
                    getMasteryDataFromApi(dispatch);
                } else {
                    dispatch(setMasteryData(result));
                }
            }).done();

        AsyncStorage.getItem(StorageKeys.STATIC_SUMMONER_SPELLS)
            .then((err, result) =>{
                if(err){
                    getSummonerSpellDataFromApi(dispatch);
                } else {
                    dispatch(setMasteryData(result));
                }
            }).done();
    }
}

export function getRuneDataFromApi(dispatch){
    return function(dispatch){
        var RUNES_REQUEST_URL = RIOT_API_URLS.STATIC_DATA.RUNES + myApiKey;
        fetch(RUNES_REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                dispatch(setRuneData(responseData));
            })
            .done();
    }
}

export function getMasteryDataFromApi(dispatch){
    return function(dispatch){
        var MASTERIES_REQUEST_URL = MASTERIES_REQUEST_URL = RIOT_API_URLS.STATIC_DATA.MASTERIES + myApiKey;
        fetch(MASTERIES_REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                dispatch(setMasteryData(responseData));
            })
            .done();
    }
}


export function getSummonerSpellDataFromApi(dispatch){
    return function(dispatch){
        var SUMMONER_SPELLS_REQUEST_URL = RIOT_API_URLS.STATIC_DATA.SUMMONER_SPELLS + myApiKey;
        fetch(SUMMONER_SPELLS_REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                dispatch(setSummonerSpellData(responseData));
            })
            .done();
    }
}

export function setRuneData(runeData){
    return {
        type: types.SET_STATIC_RUNES,
        runeData
    }
}

export function setMasteryData(masteryData){
    return {
        type: types.SET_STATIC_MASTERIES,
        masteryData
    }
}

export function setSummonerSpellData(summonerSpellData){
    return {
        type: types.SET_STATIC_SUMMONER_SPELLS,
        summonerSpellData
    }
}