import {ActionTypes} from '../constants/actionTypes';

const initialState = {
    records: []
} 

export const recordReducer = (state = initialState, {type, payload}) => {
    switch (type){
        case ActionTypes.SET_RECORDS: 
            return {...state, records: payload};
        default:
            return state;
    }
}