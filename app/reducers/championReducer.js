import * as types from '../actions/actionTypes';

const initialState = {
    champions: null
};

export default function championReducer(state = initialState, action = {}) {
    console.log("Running championReducer for " + action.type);
    switch (action.type) {
        case types.SET_CHAMPION_DATA:
            return {
                ...state,
                champions: action.championData
            }
        default:
            return state;
    }
}