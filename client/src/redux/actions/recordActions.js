import {ActionTypes} from '../constants/actionTypes';

export const setRecords = (records) => {
    return {
        type: ActionTypes.SET_RECORDS,
        payload: records
    }
}

export const selectedRecord = (record) => {
    return {
        type: ActionTypes.SELECTED_RECORD,
        payload: record
    }
}