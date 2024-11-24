// reducers/transferReducer.js

const initialState = {
    start: "",
    end: "",
    assets: true,
    funds: true,
    success: false,
    failed: false,
    pending: false,
    all: true,
    page:1
  };
  
  const transferReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_TRANSFER_DATA':
        return {
          ...state,
          ...action.payload
        };
        case 'UPDATE_PAGE':
          return {
            ...state,
            page: action.payload
          };
      default:
        return state;
    }
  };
  
  export default transferReducer;
  