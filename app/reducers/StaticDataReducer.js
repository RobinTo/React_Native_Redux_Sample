import * as types from '../actions/actionTypes';

const initialState = {
    version : "0",
    runes : {},
    champions : {},
    masteries : {},
    summonerSpells : {}
}

export default function staticDataReducer(state = initialState, action={}) {
    console.log("Running staticDataReducer for " + action.type);
    switch (action.type){
        case types.SET_STATIC_VERSION:
            return {
                ...state,
                version: action.version
            };
        case types.SET_STATIC_RUNES:
            return {
                ...state,
                runes : action.runeData
            };
        case types.SET_STATIC_CHAMPIONS:
            return {
                ...state,
                champions : action.championData
            };
        case types.SET_STATIC_MASTERIES:
            return {
                ...state,
                masteries : action.masteryData
            };
        case types.SET_STATIC_SUMMONER_SPELLS:
            return {
                ...state,
                summonerSpells : action.summonerSpellData
            };
        default:
            return state;
    }
}