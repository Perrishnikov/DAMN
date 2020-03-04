import { partcodes, labels } from '../data/tables.js';


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


const connect = {
  labels: {
    getLabelsByPartcode,
  },
  partcodes: {
    hasPartcode,
    getAllPartcodes,
  },
};

export default connect;