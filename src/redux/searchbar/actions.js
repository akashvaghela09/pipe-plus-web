import { 
    SET_INPUT_FOCUS,
    SET_SEARCH_SUGGESTIONS,
    SET_SEARCH_RESULTS,
} from './actionTypes';


export const setInputFocus = (payload) => {
    return {
        type: SET_INPUT_FOCUS,
        payload
    }
}

export const setSearchSuggestions = (payload) => {
    return {
        type: SET_SEARCH_SUGGESTIONS,
        payload
    }
}

export const setSearchResults = (payload) => {
    return {
        type: SET_SEARCH_RESULTS,
        payload
    }
}
