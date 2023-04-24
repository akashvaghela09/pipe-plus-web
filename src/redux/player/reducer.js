import { 
    SET_PLAY_STATUS,
} from './actionTypes';

const initialState = {
    isPlaying: false,
}

const reducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case SET_PLAY_STATUS:
            return {
                ...state,
                isPlaying: payload
            }
        default:
            return state
    }
}

export {reducer}