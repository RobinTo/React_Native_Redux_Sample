import * as types from '../actions/actionTypes';

const initialState = {
    liveGame: null,
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
        default:
            return state;
    }
}