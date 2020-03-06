
import component from '../components.js';
import {
  setActivePartcode,
  setActiveLabel,
  mainReducer
} from '../redux/reducers.js';
import connect from '../connect.js';

import defaultState from '../redux/types.js';

/** @type {import('../redux/types').Redux} */
const { createStore } = window.Redux;
const store = createStore(mainReducer, defaultState);

const handle = {
  searchInput: document.querySelector('#searchInput'),
  activeLabelName: document.querySelector('#activeLabelName'),
  activePartcode: document.querySelector('#activePartcode'),
  labelHistory: document.querySelector('#labelHistory'),
  labelDetails: document.querySelector('#labelDetails'),
};


function rerenderDOM() {
  console.log('re-renderDOM');

  //States....
  const activePartcode = store.getState().activePartcode;
  const activeLabel = store.getState().activeLabel;
  // console.log(`activePartcode: ${activePartcode}`);
  // console.log(activeLabel);

  //Database connections... 
  const partcodes = connect.partcodes.getAllPartcodes();
  const associatedLabels = connect.labels.getLabelsByPartcode(activePartcode);
  const prefixes = connect.prefixes.getAllPrefixes();


  //Components...
  handle.activeLabelName.innerHTML = component.activeLabelName(activeLabel);
  handle.activePartcode.innerHTML = component.activePartcode(activePartcode);
  handle.labelHistory.innerHTML = component.activePartcodeHistory(associatedLabels);
  handle.labelDetails.innerHTML = component.labelDetails({ activeLabel, prefixes });


  if (store.getState().devMode) {
    document.body.appendChild(component.dataView({ partcodes }));
  }

  // let previousValue = currentValue;
  // currentValue = select(store.getState())
  // if (previousValue !== currentValue) {
  //   console.log(
  //     'Some deep nested property changed from',
  //     previousValue,
  //     'to',
  //     currentValue
  //   )
  // }
}

/** 
 * Nav 
 * Check if the partcode exists
 */
function handlePartcodeSearch(partcode) {
  if (partcode != '') {
    const isFound = connect.partcodes.hasPartcode(partcode);
    // console.log(`isFound: ${isFound}`);
    return isFound;
  }
}

function handleLabelSelect(labelName) {
  const isFound = connect.labels.getLabelByKey(labelName);
  // console.log(isFound);
  return isFound;
}


function addListeners() {
  /** 
   * Nav SearchInput 
   */
  handle.searchInput.addEventListener('keyup', e => {
    if (e.keyCode === 13) {

      console.log('13');
      const partcode = handle.searchInput.value;
      const isPartcodeListed = handlePartcodeSearch(partcode);

      if (isPartcodeListed) {
        handle.searchInput.value = '';
        handle.searchInput.blur();

        store.dispatch(setActivePartcode(partcode));
      }
    }
  });


  /** 
   * Remove Active Patcode 
   * clicks on partcode
   */
  window.addEventListener('click', e => {
    const removeActivePartcode = e.target.closest(`.resultFound`);
    const labelHistorySelect = e.target.closest(`[data-name]`);

    if (removeActivePartcode) {
      store.dispatch(setActivePartcode(null));
      store.dispatch(setActiveLabel(null));
    }

    if (labelHistorySelect) {
      const labelHistoryName = labelHistorySelect.dataset.name;
      const label = handleLabelSelect(labelHistoryName);

      store.dispatch(setActiveLabel(label));
    }
  });

  /**
   * handles changing prefix and version 
   */
  window.addEventListener('change', (e) => {

    if (e.target.id === 'prefixSelect') {
      console.log(`update temp label with new prefix: ${e.target.value}`);
    }

    if (e.target.id === 'labelDetailVersion') {
      console.log(`update temp label with new version: ${e.target.value}`);
    }
    

  });
}

store.subscribe(rerenderDOM);
addListeners();
rerenderDOM();
