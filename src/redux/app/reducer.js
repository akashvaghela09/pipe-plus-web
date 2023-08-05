import { 
    SET_SIDE_PANEL_VALUE
} from './actionTypes';

const initialState = {
    sidepanelOpen: true,
}

const reducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case SET_SIDE_PANEL_VALUE:
            return {
                ...state,
                sidepanelOpen: payload
            }
        default:
            return state
    }
}

export {reducer}