import { 
    SET_AUTH_STATUS,
    SET_USER,
} from './actionTypes';

export const setAuthStatus = (payload) => {
    return {
        type: SET_AUTH_STATUS,
        payload
    }
}

export const setUser = (payload) => {
    return {
        type: SET_USER,
        payload
    }
}