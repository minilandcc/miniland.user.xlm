// actions/networkActions.js

export const updateNetworkData = (data) => ({
    type: 'UPDATE_NETWORK_DATA',
    payload: data,
  });
  
  export const updateSearchTerm = (searchTerm) => ({
    type: 'UPDATE_SEARCH_TERM',
    payload: searchTerm,
  });
  
  export const updateSearchButton = (searchButton) => ({
    type: 'UPDATE_SEARCH_BUTTON',
    payload: searchButton,
  });
  export const updatePageNetwork = (page) => ({
    type: 'UPDATE_NETWORK_PAGE',
    payload: page,
  });