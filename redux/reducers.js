const { produce } = window.immer;

const SET_ACTIVE_PARTCODE = 'SET_ACTIVE_PARTCODE';
const SET_ACTIVE_LABEL_KEY = 'SET_ACTIVE_LABEL_KEY';


/** 
 * ACTIONS 
 */
export function setActivePartcode(partcode) {
  return {
    type: SET_ACTIVE_PARTCODE,
    partcode
  };
}

export function setActiveLabelKey(partcode) {
  return {
    type: SET_ACTIVE_LABEL_KEY,
    partcode
  };
}


/**
 * REDUCERS
 */
export const mainReducer = (previous = {}, action) => produce(previous, draft => {
    // console.log(previous);

    switch (action.type) {
      case SET_ACTIVE_PARTCODE: {
        // console.log(`SET_ACTIVE_PARTCODE: ${action.partcode}`);
        draft.activePartcode = action.partcode;
        return;
      }

      case SET_ACTIVE_LABEL_KEY: {
        // console.log(`SET_ACTIVE_LABEL_KEY: ${action.partcode}`);
        draft.activeLabelKey = action.partcode;
        return;
      }

      default:
        return draft;
    }
  });