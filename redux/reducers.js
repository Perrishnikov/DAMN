const { produce } = window.immer;

const SET_ACTIVE_PARTCODE = 'SET_ACTIVE_PARTCODE';
const SET_SELECTED_LABEL = 'SET_SELECTED_LABEL';
const SET_SELECTED_GROUP = 'SET_SELECTED_GROUP';
const SET_LABEL_GROUPS = 'SET_LABEL_GROUPS';
const RESET = 'RESET';
const APPEND_PENDING_LABEL_GROUP = 'APPEND_PENDING_LABEL_GROUP';

/** 
 * ACTIONS 
 */
export function appendPendingLabelGroup({ labelName, label }) {
  return {
    type: APPEND_PENDING_LABEL_GROUP,
    labelName,
    label
  }
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

export function setSelectedGroup(groupName) {
  return {
    type: SET_SELECTED_GROUP,
    groupName
  };
}

export function setLabelGroups(groups) {
  return {
    type: SET_LABEL_GROUPS,
    groups
  };
}

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

    case SET_SELECTED_LABEL: {
      // console.log(`SET_ACTIVE_LABEL: `,action.label);
      draft.selectedLabel = action.label;
      return;
    }

    case SET_LABEL_GROUPS: {
      draft.labelGroups = action.groups;
      return;
    }

    case SET_SELECTED_GROUP: {
      draft.selectedLabelGroup = action.groupName;
      return;
    }

    case RESET: {
      draft.activePartcode = '';
      draft.selectedLabel = '';
      draft.selectedLabelGroup = '';
      draft.labelGroups = '';
      draft.pendingLabelGroup = new Map();
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