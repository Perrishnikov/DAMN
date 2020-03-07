import { partcodes, labels, PREFIXES, labelGroups } from '../data/tables.js';


const getLabelGroupsByPartcode = partcode => {
  let o = {
    activeLabelGroup: '',
    otherLabelGroups: ''
  };

  if (labelGroups.has(partcode)) {
    o.activeLabelGroup = labelGroups.get(partcode).find(group => group.status === 'ACTIVE'),
    
    o.otherLabelGroups = labelGroups.get(partcode).filter(group => group.status === 'HISTORY');
  }

  return o;
};

const getLabelByKey = labelName => {
  const isFound = labels.has(labelName);
  if (isFound) {
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
    if (value.partcode == partcode) {
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

const getAllPrefixes = () => PREFIXES;

const connect = {
  labels: {
    getLabelsByPartcode,
    getLabelByKey
  },
  partcodes: {
    hasPartcode,
    getAllPartcodes,
  },
  prefixes: {
    getAllPrefixes
  },
  labelGroups: {
    getLabelGroupsByPartcode
  }
};

export default connect;