import { partcodes, labels, PREFIXES, labelGroups, LabelGroup } from './tables.js';


const addToLabelGroup = (activePartcode, groupName, labelName) => {
  const theLabel = labels.get(labelName);
  // console.log(theLabel);
  const theLabelGroups = labelGroups.get(activePartcode);

  // console.log(theLabelGroups);
  const theRightGroup = theLabelGroups.find(item => item.groupName === groupName);
  // console.log(theRightGroup);

  // theRightGroup.labels.push(theLabel);
  theRightGroup.labels = [theLabel, ...theRightGroup.labels];

  return labelGroups.get(activePartcode);

};


const addLabelGroupByPartcode = (params) => {
  let { activePartcode, pendingLabelGroup, newGroupName, date, user, description } = params;

  if (labelGroups.has(activePartcode)) {

    const newLabels = [...pendingLabelGroup].map(([key, value]) => {
      return value;
    });

    const newGroup = new LabelGroup({ newGroupName, newLabels, date, user, description });
    // console.log(newGroup);
    const oldGroups = labelGroups.get(activePartcode);

    labelGroups.set(activePartcode, [newGroup, ...oldGroups]);

    return labelGroups.get(activePartcode);
  }
  else {
    console.warn('partcode not found');
    const newLabels = [...pendingLabelGroup].map(([key, value]) => {
      return value;
    });

    const newGroup = new LabelGroup({ newGroupName, newLabels, date, user, description });

    labelGroups.set(activePartcode, [newGroup]);

    console.log(labelGroups);
    return labelGroups.get(activePartcode);
  }
};


const removeLabelGroupByGroupName = (activePartcode, groupName) => {

  if (labelGroups.has(activePartcode)) {

    let filtered = [...labelGroups.get(activePartcode)].filter(item => item.groupName !== groupName);
    console.log(filtered);

    return labelGroups.set(activePartcode, filtered);

    // console.log(labelGroups.get(activePartcode));
    // const newGroup = new LabelGroup(newGroupName, ls);
  }
  else {
    console.warn('partcode not found');
  }
};


const getLabelGroupsByPartcode = partcode => {
  // let o = {
  //   activeLabelGroup: '',
  //   otherLabelGroups: ''
  // };

  if (labelGroups.has(partcode)) {
    // o.activeLabelGroup = labelGroups.get(partcode).find(group => group.status === 'ACTIVE'),

    // o.otherLabelGroups = labelGroups.get(partcode).filter(group => group.status === 'HISTORY');

    return labelGroups.get(partcode);
  }

  // return o;

};


const getLabelsByGroup = (activePartcode, groupName) => {
  let labelsInGroup;

  if (labelGroups.has(activePartcode)) {
    labelsInGroup = labelGroups.get(activePartcode).find(group => group.groupName === groupName);

  }

  return labelsInGroup;
};

const getLabelByKey = labelName => {
  const isFound = labels.has(labelName);
  if (isFound) {
    // console.log(`____________labelName: ${labelName}`);
    // console.log(labels);
    return labels.get(labelName);
  } else {
    return false;
  }
};


/**
 * Returns all labels associated with a partcode
 * @param {Partcode} partcode 
 */
const getLabelsByPartcode = partcode => {
  const o = {};
  const a = [];

  // console.log(labels);
  [...labels].forEach(([key, value]) => {
    // console.log(`partcode: ${partcode} - key: ${key}, value...`,value);
    if (value.partcode === partcode) {
      // o[key] = value;
      a.push(value);
    }
  });
  return a;
};

/**
 * Does partcode exist
 * @param {Partcode} partcode 
 * @returns {Boolean} - T || F
 */
const hasPartcode = partcode => partcodes.has(partcode);

/**
 * Returns all partcode
 * @returns {Map} partcodes
 */
const getAllPartcodes = () => partcodes;


/**
 * Adds new partcode to database
 * @param {string} partcode 
 */
const setPartcode = partcode => {
  partcodes.set(partcode, partcode);
  return partcodes;

};

const getAllPrefixes = () => PREFIXES;

const connect = {
  labels: {
    getLabelsByPartcode,
    getLabelByKey
  },
  partcodes: {
    hasPartcode,
    getAllPartcodes,
    setPartcode
  },
  prefixes: {
    getAllPrefixes
  },
  labelGroups: {
    getLabelGroupsByPartcode,
    getLabelsByGroup,
    addLabelGroupByPartcode,
    addToLabelGroup,
    removeLabelGroupByGroupName,
  }
};

export default connect;