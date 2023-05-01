import { 
    SET_INPUT_FOCUS,
    SET_SEARCH_SUGGESTIONS,
    SET_SEARCH_RESULTS,
} from './actionTypes';

const initialState = {
    isFocused: false,
    searchSuggestions: [],
    searchResults: [],
}

const reducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case SET_INPUT_FOCUS:
            return {
                ...state,
                isFocused: payload
            }
        case SET_SEARCH_SUGGESTIONS:
            return {
                ...state,
                searchSuggestions: [...payload]
            }
        case SET_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: [...payload]
            }
        default:
            return state
    }
}

export {reducer}