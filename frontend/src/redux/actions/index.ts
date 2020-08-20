import { Dispatch } from "redux";

import apis from "../../helpers/apis";
import {appConfig} from "../../config/app.config";
import { SEARCH_LOADED, SEARCH_LOADING, SEARCH_FAILED } from '../actionTypes/searchTypes';

export const loadSearchResults = (q:string, type: string) => {

    return (dispatch: Dispatch) => {

        // dispatch loding 
        dispatch({type: SEARCH_LOADING });
        const url = appConfig.API_GITHUB_SEARCH;
        let searchData = {q, type};
        apis.callApi(url, searchData, 'POST').then(response => {
            dispatch({
                type: SEARCH_LOADED,
                payload: response
            })
        }).catch(error => {
            console.log(error);
            dispatch({
                type: SEARCH_FAILED,
                payload: error.message
            })
        });
       
    }
}

export const restSearchResults = () => {
    return (dispatch: Dispatch) => {
        // dispatch 
        dispatch({
            type: SEARCH_LOADED,
            payload: false
        })
       
    }
}