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