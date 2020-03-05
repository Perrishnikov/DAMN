const { produce } = window.immer;

const SET_ACTIVE_PARTCODE = 'SET_ACTIVE_PARTCODE';
const SET_ACTIVE_LABEL = 'SET_ACTIVE_LABEL';

/** 
 * ACTIONS 
 */
export function setActivePartcode(partcode) {
  return {
    type: SET_ACTIVE_PARTCODE,
    partcode
  };
}

export function setActiveLabel(label) {
  return {
    type: SET_ACTIVE_LABEL,
    label
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

    case SET_ACTIVE_LABEL: {
      // console.log(`SET_ACTIVE_LABEL: `,action.label);
      draft.activeLabel = action.label;
      return;
    }

    default:
      return draft;
  }
});