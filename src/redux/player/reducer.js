import { 
    SET_PLAY_STATUS,
    SET_FULL_SCREEN_STATUS
} from './actionTypes';

const initialState = {
    isPlaying: false,
    isFullScreen: false,
}

const reducer = (state = initialState, {type, payload}) => {

    switch (type) {
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
        default:
            return state
    }
}

export {reducer}