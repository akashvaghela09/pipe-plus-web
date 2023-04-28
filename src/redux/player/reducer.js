import { 
    SET_PLAYER,
    SET_PLAY_STATUS,
    SET_FULL_SCREEN_STATUS,
    SET_PLAYBACK_RATE,
    SET_VOLUME,
    SET_STREAM_VALUES,
} from './actionTypes';

const initialState = {
    player: null,
    isPlaying: false,
    isFullScreen: false,
    playbackRate: 1,
    volume: 0.5,
    streamValues: {
        duration: 0,
        buffered: 0,
        played: 0,
        seek: 0,
    }
}

const reducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case SET_PLAYER:
            return {
                ...state,
                player: payload
            }
        case SET_PLAY_STATUS:
            return {
                ...state,
                isPlaying: payload
            }
        case SET_FULL_SCREEN_STATUS:
            return {
                ...state,
                isFullScreen: payload
            }
        case SET_PLAYBACK_RATE:
            return {
                ...state,
                playbackRate: payload
            }
        case SET_VOLUME:
            return {
                ...state,
                volume: payload
            }
        case SET_STREAM_VALUES:
            return {
                ...state,
                streamValues: payload
            }
        default:
            return state
    }
}

export {reducer}