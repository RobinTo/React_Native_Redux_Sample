import * as types from '../actions/actionTypes';

import * as StorageKeys from '../StorageKeys';

import { hasKey } from '../utils';

const initialState = {
    summonerData : {}
}

export default function summonerDataReducer(state = initialState, action={}) {
    //console.log("Running summonerDataReducer for " + action.type);
    switch (action.type){
        case types.SET_SUMMONER_CHAMPION_DATA:
            var newState = Object.assign({}, state);
            if(!hasKey(newState.summonerData, action.summonerId)){
                newState.summonerData[action.summonerId] = {}
            }
            newState.summonerData[action.summonerId]["championData"] = action.summonerChampionData;
            return newState;
        case types.SET_SUMMONER_LEAGUE_DATA:
            var newState = Object.assign({}, state);
            if(!hasKey(newState.summonerData, action.summonerId)){
                newState.summonerData[action.summonerId] = {}
            }
            newState.summonerData[action.summonerId]["leagueData"] = action.summonerLeagueData;
            newState.summonerData[action.summonerId]["leagueData"]
            return newState;
        default:
            return state;
    }
}