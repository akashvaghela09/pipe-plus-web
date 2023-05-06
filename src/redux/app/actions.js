import { 
    SET_SIDE_PANEL_VALUE
} from './actionTypes';

export const setSidePanelValue = (payload) => {
    return {
        type: SET_SIDE_PANEL_VALUE,
        payload
    }
}
