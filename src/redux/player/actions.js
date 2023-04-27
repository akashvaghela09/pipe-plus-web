import { 
    SET_PLAY_STATUS,
    SET_FULL_SCREEN_STATUS
} from './actionTypes';


export const setPlayStatus = (payload) => {
    return {
        type: SET_PLAY_STATUS,
        payload
    }
}

export const setFullScreenStatus = (payload) => {
    return {
        type: SET_FULL_SCREEN_STATUS,
        payload
    }
}