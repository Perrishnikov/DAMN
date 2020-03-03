import { partcodes, labels } from '../data/tables.js';
import component from '../components.js';
import {
  setActivePartcode,
  setActiveLabelKey,
  mainReducer
} from '../redux/reducers.js';
import defaultState from '../redux/types.js';

/** @type {import('../redux/types').Redux} */
const { createStore } = window.Redux;
const store = createStore(mainReducer, defaultState);

const handle = {
  searchInput: document.querySelector('#searchInput'),
  activeLabelName: document.querySelector('#activeLabelName'),
  searchResult: document.querySelector('#searchResult'),
};


function rerenderDOM() {
  console.log('rerenderDOM');
  const state = store.getState();


  handle.searchResult.innerHTML = component.activePartcode(state.activePartcode);

  const activeLabel = labels.get(state.activeLabelKey);
  handle.activeLabelName.innerHTML = component.activeLabelName(activeLabel);

  if (state.devMode) {
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
function handleSearch(partcode) {
  if (partcode != '') {
    const isFound = partcodes.has(partcode);

    return isFound;
  }
}


function addListeners() {
  /** 
   * Nav SearchInput 
   */
  handle.searchInput.addEventListener('keyup', e => {
    if (e.keyCode === 13) {

      console.log('13');
      const partcode = handle.searchInput.value;
      const isPartcodeListed = handleSearch(partcode);

      if (isPartcodeListed) {
        handle.searchInput.value = '';
        handle.searchInput.blur();

        store.dispatch(setActivePartcode(partcode));
        store.dispatch(setActiveLabelKey(partcode));
      }
    }
  });


  /** 
   * Remove Active Patcode 
   * clicks on partcode
   */
  window.addEventListener('click', e => {
    const resultFound = e.target.closest(`.resultFound`);

    if (resultFound) {
      store.dispatch(setActivePartcode(null));
      store.dispatch(setActiveLabelKey(null));
    }
  });

}

store.subscribe(rerenderDOM);
addListeners();
rerenderDOM();
