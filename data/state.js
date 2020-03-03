import { labels } from '../data/data.js';

let activePartcode = '00039'; //string 12434 or 00039
let devMode = true; //true false
let activeLabelKey = '00039';

const state = {
  getActivePartcode: () => activePartcode,
  setActivePartcode: (partcode) => { activePartcode = partcode; console.log(`activePartcode: ${activePartcode}`); },
  getDevMode: () => devMode,
  getActiveLabelKey: () => { 
    return activeLabelKey ? labels.get(activeLabelKey) : labels.get('empty'); 
  },
  setActiveLabelKey: (key) => { activeLabelKey = key; },
  

};

export default state;