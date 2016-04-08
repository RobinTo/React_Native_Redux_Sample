import * as types from '../actions/actionTypes';

import * as StorageKeys from '../StorageKeys';

const initialState = {
    summonerData : {}
}

export default function summonerDataReducer(state = initialState, action={}) {
    console.log("Running summonerDataReducer for " + action.type);
    switch (action.type){
        case types.SET_SPECIFIC_SUMMONERDATA:

            var newSummonerData = Object.assign({}, state);
            newSummonerData.summonerData[action.summonerData.name] = action.summonerData;
            return newSummonerData;
        default:
            return state;
    }
}