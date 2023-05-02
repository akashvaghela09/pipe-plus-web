import { 
    SET_INPUT_FOCUS,
    SET_SEARCH_QUERY,
    SET_SEARCH_SUGGESTIONS,
    SET_SEARCH_RESULTS,
    SET_FILTER_TYPE,
} from './actionTypes';


export const setInputFocus = (payload) => {
    return {
        type: SET_INPUT_FOCUS,
        payload
    }
}

export const setSearchQuery = (payload) => {
    return {
        type: SET_SEARCH_QUERY,
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

export const setFilterType = (payload) => {
    return {
        type: SET_FILTER_TYPE,
        payload
    }
}
