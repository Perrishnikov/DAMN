import { partcodes } from '../data/data.js';
import state from '../data/state.js';
import { compSearchResult, compNoSearchResult, compDataView, compLabelName } from '../components.js';

const CONST = {
  SEARCH_NO_ACTIVE: 'No active partcode',
  SEARCH_NOT_FOUND: 'Not found. Add a new partcode to database?'
};


const handle = {
  searchResult: document.querySelector('#searchResult'),
  searchInput: document.querySelector('#searchInput'),
  activeLabelName: document.querySelector('#activeLabelName'),

};


function handleSearch(partcode) {
  const isValid = partcodes.includes(partcode);
  return isValid;
}



function addListeners() {
  /** 
   * Nav SearchInput 
   */
  handle.searchInput.addEventListener('keyup', e => {
    if (e.keyCode === 13) {

      const partcode = handle.searchInput.value;
      const isValidPartcode = handleSearch(partcode);

      if (isValidPartcode) {
        handle.searchInput.value = '';
        handle.searchInput.blur();
        state.setActivePartcode(partcode);
        handle.searchResult.innerHTML = compSearchResult(state.getActivePartcode());
      }
    }
  });


  /** 
   * Remove Active Patcode 
   */
  window.addEventListener('click', e => {
    const resultFound = e.target.closest(`.resultFound`);

    if (resultFound) {
      state.setActivePartcode('');
      handle.searchResult.innerHTML = compNoSearchResult(CONST.SEARCH_NO_ACTIVE);

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

  if( state.getactiveLabelName()){
    handle.activeLabelName.innerHTML = compLabelName(state.getactiveLabelName());
  }
  
}

addListeners();
init();