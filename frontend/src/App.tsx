import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import { appConfig } from "./config/app.config";
import { loadSearchResults } from './redux/actions';
import SearchItem from './components/elements/SearchItem';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('users');
  const [showSearchResults, setShowSearchResults] = useState(false);

  interface RootState {
    search: {
      isLoading: false
      searchResults: []
    }
  }

  // extract search state form redux store
  const {isLoading, searchResults} = useSelector( (state: RootState) => state.search);

  // Search actions 
  const dispatch = useDispatch();
  const githubSearch = useCallback((searchQuery: string, searchType: string) => dispatch(loadSearchResults(searchQuery,searchType)), [dispatch]);

  // apply debounce for search input
  const handleChange = debounce((text) => {
    setSearchQuery(text);
  }, 1000);

  const handelChangeType = (e: { target: { value: string; }; }) => {
    setShowSearchResults(false);
    setSearchType(e.target.value);
  };

  useEffect(() => {
    if(searchQuery.length > appConfig.MIN_SEARCH_CHARACTERS){
      // Dispatch search action
      githubSearch(searchQuery,searchType);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [searchQuery, searchType])

  return (
    <>
      <header>
          <div className="container">
              <div className="MainLogo">
                <h3>
                  <img alt="gitHub_logo" width="64" height="64" src="images/gitHub_logo.png"/>
                  GitHub Searcher
                </h3>
                <h6>Search users or repositories below</h6>
              </div>
              <div className="mainSearch">
                  <form className="d-flex">
                      <input type="search" className="MainInput" name="q" id="q"
                      placeholder="Start typing to search .." 
                      autoComplete="off"
                      onChange={e => handleChange(e.target.value)}
                      maxLength={50}/>
                      <div className="mainSelect">
                        <select onChange={handelChangeType} className="MainInput">
                          <option value="users">Users</option>
                          <option value="repositories">Repo</option>
                        </select>
                      </div>
                  </form>
              </div>
          </div>
      </header>

      <div className="wrap">
        <div className="container">
          { isLoading ?
            <div className="row d-flex justify-content-center">
              Loading...
            </div> 
          :
          showSearchResults && typeof (searchResults) !== 'undefined' && searchResults.length > 0 ? 
            <ul className="flex-list">
              {searchResults.map((item, index) => {
                return (
                  <SearchItem item={item} type={searchType} key={index}/>
                );
              })}
            </ul> 
            : 
            <div className="row d-flex justify-content-center">
              No Results found
            </div> 
          }
        </div>
      </div>
    </>
  );
}

export default App;
