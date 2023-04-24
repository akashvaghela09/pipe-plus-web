import { 
    SET_PLAY_STATUS
} from './actionTypes';

export const setPlayStatus = (payload) => {
    return {
        type: SET_PLAY_STATUS,
        payload
    }
}