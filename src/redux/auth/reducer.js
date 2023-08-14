import {
    SET_AUTH_STATUS,
    SET_USER,
} from './actionTypes';

const initialState = {
    authStatus: null,
    user: {
        email: "",
        id: "",
    }
}

const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case SET_AUTH_STATUS:
            return {
                ...state,
                authStatus: payload
            }
        case SET_USER:
            return {
                ...state,
                user: payload
            }
            
        default:
            return state
    }
}

export { reducer }