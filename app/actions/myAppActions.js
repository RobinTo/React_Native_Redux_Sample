import { AsyncStorage } from 'react-native';

import * as types from './actionTypes';
import { myApiKey } from '../mySecrets';

import * as StorageKeys from '../StorageKeys';

import { RIOT_API_URLS, getRiotApiUrl } from '../utils';

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
            dispatch(setSearchingLivegame(false));
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

export function clearData(){
    return function(dispatch){
        AsyncStorage.getAllKeys((err, keys) => {
            console.log("Removing")
            console.log(err);
            console.log(keys);
            AsyncStorage.multiRemove(keys, (err) => {
                console.warn("Cleared all data");
            });
        });
    }
}

export function getStaticData(){
    console.log("Attempting to get static data.");
    return function(dispatch){
        AsyncStorage.getItem(StorageKeys.STATIC_CHAMPIONS)
            .then((result) => {
                // Documentation says it should return (error: ?Error, result: ?String)
                // but result is returned as first argument. Not sure what that is all about.
                // TODO: Look into if error will sneak in as first argument if it exists.
                if(typeof result === "undefined" || result === null){
                    getChampionsFromApi(dispatch);
                } else {
                    dispatch(setChampionData(JSON.parse(result)));
                }
            }).done();

        AsyncStorage.getItem(StorageKeys.STATIC_RUNES)
            .then((result) =>{
                if(typeof result === "undefined" || result === null){
                    getRuneDataFromApi(dispatch);
                } else {
                    dispatch(setRuneData(JSON.parse(result)));
                }
            }).done();

        AsyncStorage.getItem(StorageKeys.STATIC_MASTERIES)
            .then((result) =>{
                if(typeof result === "undefined" || result === null){
                    getMasteryDataFromApi(dispatch);
                } else {
                    dispatch(setMasteryData(JSON.parse(result)));
                }
            }).done();

        AsyncStorage.getItem(StorageKeys.STATIC_SUMMONER_SPELLS)
            .then((result) =>{
                if(typeof result === "undefined" || result === null){
                    getSummonerSpellDataFromApi(dispatch);
                } else {
                    dispatch(setMasteryData(JSON.parse(result)));
                }
            }).done();
    }
}

// The following functions are only callable from within another action passing dispatch to it.
// To enable them to be called directly in a component; e.g. this.props.getChampionsFromApi
// wrap the content in a thunk return.
// These are only called from getStaticData() which updates all data.
function getChampionsFromApi(dispatch){
    var REQUEST_URL = RIOT_API_URLS.STATIC_DATA.CHAMPIONS + myApiKey;
    return fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData.data);
            dispatch(setChampionData(responseData.data));
        })
        .done();
}

function getRuneDataFromApi(dispatch){
    var RUNES_REQUEST_URL = RIOT_API_URLS.STATIC_DATA.RUNES + myApiKey;
    fetch(RUNES_REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
            dispatch(setRuneData(responseData.data));
        })
        .done();
}

function getMasteryDataFromApi(dispatch){
    var MASTERIES_REQUEST_URL = RIOT_API_URLS.STATIC_DATA.MASTERIES + myApiKey;
    fetch(MASTERIES_REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
            dispatch(setMasteryData(responseData.data));
        })
        .done();
}


function getSummonerSpellDataFromApi(dispatch){
    var SUMMONER_SPELLS_REQUEST_URL = RIOT_API_URLS.STATIC_DATA.SUMMONER_SPELLS + myApiKey;
    fetch(SUMMONER_SPELLS_REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
            dispatch(setSummonerSpellData(responseData.data));
        })
        .done();
}
// End of static data retrieval which functions.

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

export function getSummonerChampionData(region, summonerId){
    return function(dispatch){
        var options = {
                region,
                summonerId
            },
            builtUrl = getRiotApiUrl(RIOT_API_URLS.SUMMONER.CHAMPION_STATS, options),
            SUMMONER_CHAMPION_DATA_REQUEST_URL = builtUrl + myApiKey;
        fetch(SUMMONER_CHAMPION_DATA_REQUEST_URL)
            .then((response) => {
                if(response.status === 200){
                    return response.json()
                } else {
                    throw {error: "Fetch error in summoner champion stats.", status: response.status};
                }
            })
            .then((responseData) => {
                dispatch(setSummonerChampionData(summonerId, responseData));
            })
            .catch((error) => {
                console.log(error.error);
                dispatch(setSummonerChampionData(summonerId, error))
            }).done();
    }
}

export function getSummonerLeagueData(region, summonerId){
    return function(dispatch){
        var options = {
                region,
                summonerId
            },
            builtUrl = getRiotApiUrl(RIOT_API_URLS.SUMMONER.LEAGUE, options),
            SUMMONER_LEAGUE_DATA_REQUEST_URL = builtUrl + myApiKey;
        console.log("Fetching league for " + summonerId);
        console.log(SUMMONER_LEAGUE_DATA_REQUEST_URL);
        fetch(SUMMONER_LEAGUE_DATA_REQUEST_URL)
            .then((response) => {
                if(response.status === 200){
                    return response.json()
                } else {
                    throw {error: "Fetch error in league data.", status: response.status};
                }
            })
            .then((responseData) => {
                dispatch(setSummonerLeagueData(summonerId, responseData[Object.keys(responseData)[0]]));
            })
            .catch((error) => {
                console.log(error.error);
                dispatch(setSummonerLeagueData(summonerId, error))
            }).done();
    }
}

export function setSummonerChampionData(summonerId, summonerChampionData){
    return {
        type: types.SET_SUMMONER_CHAMPION_DATA,
        summonerId,
        summonerChampionData
    }
}

export function setSummonerLeagueData(summonerId, summonerLeagueData){
    return {
        type: types.SET_SUMMONER_LEAGUE_DATA,
        summonerId,
        summonerLeagueData
    }
}

export function setSearchingLivegame(searching){
    return {
        type: types.SET_SEARCHING_LIVEGAME,
        searching
    }
}