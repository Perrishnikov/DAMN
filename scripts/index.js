import { partcodes } from '../data/data.js';
import state from '../data/state.js';
import { compSearchResult, compNoSearchResult, compDataView, compLabelName } from '../components.js';

const { createStore } = window.Redux;


const CONST = {
  SEARCH_NO_ACTIVE: 'No active partcode',
  SEARCH_NOT_FOUND: 'Not found. Add a new partcode to database?'
};


const handle = {
  searchInput: document.querySelector('#searchInput'),
  activeLabelName: document.querySelector('#activeLabelName'),
  searchResult: document.querySelector('#searchResult'),
};


/** 
 * Nav 
 * Check if the partcode exists
 */
function handleSearch(partcode) {
  if (partcode != '') {
    const isValid = partcodes.has(partcode);
    console.log(isValid);
    return isValid;
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
      const isValidPartcode = handleSearch(partcode);

      if (isValidPartcode) {
        handle.searchInput.value = '';
        handle.searchInput.blur();

        //Nav search bar
        state.setActivePartcode(partcode);
        handle.searchResult.innerHTML = compSearchResult(state.getActivePartcode());

        //Label name
        state.setActiveLabelKey(null);
        handle.activeLabelName.innerHTML = compLabelName(state.getActiveLabelKey().name);

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
      state.setActivePartcode('');
      handle.searchResult.innerHTML = compNoSearchResult(CONST.SEARCH_NO_ACTIVE);

      state.setActiveLabelKey(null);
      handle.activeLabelName.innerHTML = compLabelName(state.getActiveLabelKey().name);
    }
  });

}


function init() {

  if (!state.getActivePartcode()) {
    handle.searchResult.innerHTML = compNoSearchResult(CONST.SEARCH_NO_ACTIVE);
  } else {
    // We have an active partcode
    handle.searchResult.innerHTML = compSearchResult(state.getActivePartcode());
  }

  if (state.getDevMode()) {
    document.body.appendChild(compDataView({ partcodes: partcodes }));
  }

  if (state.getActiveLabelKey()) {
    handle.activeLabelName.innerHTML = compLabelName(state.getActiveLabelKey().name);
  }

}

addListeners();
init();