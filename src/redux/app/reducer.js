import { 
    SET_SIDE_PANEL_VALUE,
    SET_DEVICE_TYPE
} from './actionTypes';

const initialState = {
    sidepanelOpen: true,
    deviceType: "desktop"
}

const reducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case SET_SIDE_PANEL_VALUE:
            return {
                ...state,
                sidepanelOpen: payload
            }
        case SET_DEVICE_TYPE:
            return {
                ...state,
                deviceType: payload
            }
        default:
            return state
    }
}

export {reducer}