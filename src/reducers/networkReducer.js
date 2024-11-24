// reducers/networkReducer.js

const initialState = {
  active: false,
  deleted: false,
  all: true,
  teamContact: false,
  userContact: true,
  searchTerm: '',
  searchButton: false,
  page:1
};

const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_NETWORK_DATA':
      return {
        ...state,
        ...action.payload
      };
    case 'UPDATE_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload
      };
    case 'UPDATE_SEARCH_BUTTON':
      return {
        ...state,
        searchButton: action.payload
      };
      case  'UPDATE_NETWORK_PAGE':
      return {
        ...state,
        page: action.payload
      };
    default:
      return state;
  }
};

export default networkReducer;
