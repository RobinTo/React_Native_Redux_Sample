import * as types from './actionTypes';
import { myApiKey } from '../mySecrets';

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
        type: types.SET_CHAMPION_DATA,
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
export function searchForLiveGameBySummonerName(summonerName){
    return function(dispatch){
        var REQUEST_URL = "https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/"+summonerName+"?api_key=" + myApiKey;
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
                getLiveGame(summonerData.id, dispatch);
            }).done()
    }
}

export function setSummonerData(summonerData){
    return {
        type: types.SET_SUMMONERDATA,
        summonerData
    }
}

export function getLiveGame(summonerId, dispatch){
    var REQUEST_URL = "https://euw.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/EUW1/"+summonerId+"?api_key=" + myApiKey;

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