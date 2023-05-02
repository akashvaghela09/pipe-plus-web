import { 
    SET_INPUT_FOCUS,
    SET_SEARCH_QUERY,
    SET_SEARCH_SUGGESTIONS,
    SET_SEARCH_RESULTS,
    SET_FILTER_TYPE,
} from './actionTypes';

const initialState = {
    isFocused: false,
    searchQuery: '',
    searchSuggestions: [],
    searchResults: [],
    filterType: 'all',
}

const reducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case SET_INPUT_FOCUS:
            return {
                ...state,
                isFocused: payload
            }
        case SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: payload
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
        case SET_FILTER_TYPE:
            return {
                ...state,
                filterType: payload
            }
        default:
            return state
    }
}

export {reducer}