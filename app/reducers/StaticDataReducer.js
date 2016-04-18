import * as types from '../actions/actionTypes';

import * as StorageKeys from '../StorageKeys';

import { AsyncStorage } from 'react-native';

const initialState = {
    version : "0",
    runes : {},
    champions : {},
    masteries : {},
    summonerSpells : {}
}

export default function staticDataReducer(state = initialState, action={}) {
    //console.log("Running staticDataReducer for " + action.type);
    switch (action.type){
        case types.SET_STATIC_VERSION:
            AsyncStorage.setItem(StorageKeys.VERSION, JSON.stringify(action.version));
            return {
                ...state,
                version: action.version
            };
        case types.SET_STATIC_RUNES:
            AsyncStorage.setItem(StorageKeys.STATIC_RUNES, JSON.stringify(action.runeData));
            return {
                ...state,
                runes : action.runeData
            };
        case types.SET_STATIC_CHAMPIONS:
            AsyncStorage.setItem(StorageKeys.STATIC_CHAMPIONS, JSON.stringify(action.championData));
            return {
                ...state,
                champions : action.championData
            };
        case types.SET_STATIC_MASTERIES:
            AsyncStorage.setItem(StorageKeys.STATIC_MASTERIES, JSON.stringify(action.masteryData));
            return {
                ...state,
                masteries : action.masteryData
            };
        case types.SET_STATIC_SUMMONER_SPELLS:
            AsyncStorage.setItem(StorageKeys.STATIC_SUMMONER_SPELLS, JSON.stringify(action.summonerSpellData));
            return {
                ...state,
                summonerSpells : action.summonerSpellData
            };
        default:
            return state;
    }
}