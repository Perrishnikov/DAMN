
import component from '../components.js';
import defaultState from '../redux/types.js';
import {
  setActivePartcode,
  setSelectedLabel,
  setSelectedGroup,
  setLabelGroups,
  reset,
  mainReducer
} from '../redux/reducers.js';
import connect from '../connect.js';

import label_group_new from '../components/label_group_new.js';
import label_group_list from '../components/label_group_list.js';
import labels_list from '../components/labels_list.js';
import label_new from '../components/label_new.js';
import label_details from '../components/label_details.js';
import { active_partcode, add_new_partcode } from '../components/active_partcode.js';

/** @type {import('../redux/types').Redux} */
const { createStore } = window.Redux;
const store = createStore(mainReducer, defaultState);

const handle = {
  searchInput: document.querySelector('#searchInput'),
  activeLabelName: document.querySelector('#activeLabelName'),
  active_partcode: document.querySelector('#active_partcode'),
  labels_list: document.querySelector('#labels_list'),
  label_details: document.querySelector('#labelDetails'),
  label_new: document.querySelector('#label_new'),
  label_group_new: document.querySelector('#label_group_new'),
  label_group_list: document.querySelector('#label_group_list'),
  label_dnd: document.querySelector('#label_dnd'),
};


function render(comp, data) {
  // console.log(comp());
  comp.innerHTML = data;
}

function rerenderDOM() {
  console.log('re-renderDOM');
  // console.log(store.getState());


  //States....
  const activePartcode = store.getState().activePartcode;
  const selectedLabel = store.getState().selectedLabel;
  // const labelGroups = store.getState().labelGroups;
  const selectedLabelGroup = store.getState().selectedLabelGroup;
  // console.log(`activePartcode: ${activePartcode}`);
  // console.log(activeLabel);


  //Database connections... 
  const associatedLabels = connect.labels.getLabelsByPartcode(activePartcode);
  const associatedGroups = connect.labelGroups.getLabelGroupsByPartcode(activePartcode);
  const prefixes = connect.prefixes.getAllPrefixes();


  //Components...
  handle.activeLabelName.innerHTML = component.activeLabelName(selectedLabel);

  /** 1st col */
  render(handle.active_partcode, active_partcode(activePartcode));
  /* Label Details */
  render(handle.label_details, label_details({ selectedLabel, prefixes }));


  /** 2nd col */
  /* New Label */
  render(handle.label_new, label_new(activePartcode));
  /* Labels List */
  render(handle.labels_list, labels_list(
    selectedLabel,
    associatedLabels)
  );

  /** 3rd col */
  /* Label Groups New */
  render(handle.label_group_new, label_group_new(activePartcode, activePartcode));
  /* Label Groups for partcode */
  render(handle.label_group_list, label_group_list(
    selectedLabel,
    selectedLabelGroup,
    associatedGroups)
  );





  // render(handle.label_group_selected, label_group_selected(activeLabelGroup));



  if (store.getState().devMode) {
    const partcodes = connect.partcodes.getAllPartcodes();
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

      if (partcode === '') {
        store.dispatch(reset());
        return;
      }

      if (isPartcodeListed) {
        handle.searchInput.value = '';
        handle.searchInput.blur();

        store.dispatch(setActivePartcode(partcode));
      } else {
        render(handle.active_partcode, add_new_partcode(partcode));
      }
    }
  });


  /** 
   * Remove Active Patcode 
   * clicks on partcode
   */
  window.addEventListener('click', e => {
    const removeActivePartcode = e.target.closest(`.resultFound`);
    const labelSelected = e.target.closest(`[data-name]`);
    const labelGroupSelected = e.target.closest(`[data-group]`);

    if (removeActivePartcode) {
      store.dispatch(reset());
    }

    if (labelGroupSelected) {
      const labelGroupName = labelGroupSelected.dataset.group;

      store.dispatch(setSelectedGroup(labelGroupName));
    }

    if (labelSelected) {
      const labelHistoryName = labelSelected.dataset.name;
      const label = handleLabelSelect(labelHistoryName);

      store.dispatch(setSelectedLabel(label));
    }

    // Toggles the New Label Group options
    if (e.target.closest('#toggle_label_group_new')) {
      document.querySelector('#newStuff').classList.toggle('closed');
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
