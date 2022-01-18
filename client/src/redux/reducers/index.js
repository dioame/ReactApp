import {combineReducers} from 'redux';
import {recordReducer} from './recordReducer';

const reducers = combineReducers({
    allRecords: recordReducer
})

export default reducers;