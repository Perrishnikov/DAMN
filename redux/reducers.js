const { produce } = window.immer;

const SET_ACTIVE_PARTCODE = 'SET_ACTIVE_PARTCODE';
const SET_LABELLIST_PARTCODE = 'SET_LABELLIST_PARTCODE'
const SET_SELECTED_LABEL = 'SET_SELECTED_LABEL';
const CREATE_LABEL_GROUP = 'CREATE_LABEL_GROUP';
const SET_LABEL_GROUP_STATUS = 'SET_LABEL_GROUP_STATUS';
const RESET = 'RESET';
const APPEND_PENDING_LABEL_GROUP = 'APPEND_PENDING_LABEL_GROUP';
const DELETE_PENDING_LABEL_GROUP = 'DELETE_PENDING_LABEL_GROUP';
const CREATE_NEW_LABEL_GROUP = 'CREATE_NEW_LABEL_GROUP';

/** 
 * ACTIONS 
 */
export function setLabelListPartcode(partcode) {
  return {
    type: SET_LABELLIST_PARTCODE,
    partcode
  };
}

export function appendPendingLabelGroup({ labelName, label }) {
  return {
    type: APPEND_PENDING_LABEL_GROUP,
    labelName,
    label
  };
}

export function setActivePartcode(partcode) {
  return {
    type: SET_ACTIVE_PARTCODE,
    partcode
  };
}

export function setSelectedLabel(label) {
  return {
    type: SET_SELECTED_LABEL,
    label
  };
}

export function createLabelGroup (data){
  return {
    type: CREATE_LABEL_GROUP,
    data
  };
}


/** Label Groups */
export function setLabelGroupStatusByGroupName(groups) {
  return {
    type: SET_LABEL_GROUP_STATUS,
    groups
  };
}

export function createNewLabelGroup({group, partcode}){
  return {
    type: CREATE_NEW_LABEL_GROUP,
    group,
    partcode
  };
}

export function deletePendingLabelGroup(){
  return {
    type: DELETE_PENDING_LABEL_GROUP
  };
}

/** Reset */
export function reset() {
  return {
    type: RESET
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

    case SET_LABELLIST_PARTCODE: {
      draft.labelListPartcode = action.partcode;
      return;
    }

    case SET_SELECTED_LABEL: {
      // console.log(`SET_ACTIVE_LABEL: `,action.label);
      draft.selectedLabel = action.label;
      return;
    }

    case DELETE_PENDING_LABEL_GROUP: {

      draft.pendingLabelGroup = new Map();
      return;
    }

    case CREATE_LABEL_GROUP: {
      draft.selectedLabelGroup = action.groupName;
      return;
    }

    case RESET: {
      draft.activePartcode = '';
      draft.selectedLabel = '';
      draft.selectedLabelGroup = '';
      draft.labelGroups = new Map();
      draft.pendingLabelGroup = new Map();
      draft.labelListPartcode = '';
      return;
    }

    case CREATE_NEW_LABEL_GROUP: {
      

      let g = previous.labelGroups;

      // for (let [key, value] of g) {
      //   console.log(key + ' = ' + value)
      // }
      // console.log(g);
      // console.log(action);
      // g.set(action.partcode, action.group);

      // draft.labelGroups.set(action.partcode , g);
      return;
    }

    case APPEND_PENDING_LABEL_GROUP: {
      // draft.pendingLabelGroup = [...previous.pendingLabelGroup, action.label]
      // draft.pendingLabelGroup.set(action.label.name, action.label);
      // draft.pendingLabelGroup[action.label.name] = action.label;   
      let m = previous.pendingLabelGroup;
      m.set(action.labelName, action.label);
      // console.log(new Map([action.labelName], action.label));
      // draft.pendingLabelGroup = new Map(previous.pendingLabelGroup,[action.labelName, action.label])
      draft.pendingLabelGroup = new Map(m);
      return;
    }

    default:
      return draft;
  }
});