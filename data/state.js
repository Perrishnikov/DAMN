let activePartcode = '00039'; //string 12434 or 00039
let devMode = true; //true false
let activeLabelName = 'LBX00039.N03 Dr Choice Women 90 tabs (G).pdf';

const state = {
  getActivePartcode: () => activePartcode,
  setActivePartcode: (partcode) => { activePartcode = partcode; console.log(`activePartcode: ${activePartcode}`); },
  getDevMode: () => devMode,
  getactiveLabelName: () => activeLabelName,
  setactiveLabelName: name => { activeLabelName = name; console.log(`new dndFileName: ${name}`); }

};

export default state;