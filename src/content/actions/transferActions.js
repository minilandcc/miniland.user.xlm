  // actions/transferActions.js

  export const updateTransferData = (data) => {
      return {
        type: 'UPDATE_TRANSFER_DATA',
        payload: data
      };
    };
    
    export const updatePage = (page) => ({
      type: 'UPDATE_PAGE',
      payload: page,
    });