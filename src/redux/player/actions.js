import { 
    SET_PLAYER,
    SET_PLAY_STATUS,
    SET_FULL_SCREEN_STATUS,
    SET_PLAYBACK_RATE,
    SET_VOLUME,
    SET_STREAM_VALUES,
} from './actionTypes';

export const setPlayer = (payload) => {
    return {
        type: SET_PLAYER,
        payload
    }
}

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

export const setPlaybackRate = (payload) => {
    return {
        type: SET_PLAYBACK_RATE,
        payload
    }
}

export const setPlayerVolume = (payload) => {
    return {
        type: SET_VOLUME,
        payload
    }
}

export const setStreamValues = (payload) => {
    return {
        type: SET_STREAM_VALUES,
        payload
    }
}

