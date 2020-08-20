import { SEARCH_LOADED, SEARCH_LOADING, SEARCH_FAILED } from '../actionTypes/searchTypes';
import { SearchState, SearchTypes } from '../actions/search/search.d';

const INITIAL_STATE: SearchState = {
  isLoading: false,
  searchResults: [],
};

function searchReducer(state = INITIAL_STATE, action: SearchTypes): SearchState {
  switch (action.type) {
    case SEARCH_LOADED: {
      return {
        ...state,
        searchResults: action.payload,
        isLoading: false,
      };
    }  
    case SEARCH_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SEARCH_FAILED: {
      return {
        ...state,
        searchResults: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export default searchReducer;
