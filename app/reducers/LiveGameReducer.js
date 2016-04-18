import * as types from '../actions/actionTypes';

const initialState = {
    liveGame: null,
    searching: false,
    summonerName: null
};

export default function LiveGameReducer(state = initialState, action = {}) {

    switch(action.type){
        case types.SET_SUMMONERDATA:
            return {
                ...state,
                summonerData : action.summonerData
            };
        case types.SET_LIVEGAME:
            return {
                ...state,
                liveGame : action.liveGame
            };
        case types.SET_SEARCHING_LIVEGAME:
            return {
                ...state,
                searching: action.searching
            };
        default:
            return state;
    }
}