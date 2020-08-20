import { Dispatch } from "react";

export interface SearchState {
    isLoading: Boolean,
    searchResults: [];
}

export interface SearchAction {
    type: string;
    payload: Dispatch;
}

export type SearchTypes = SearchAction;