
import component from '../components.js';
import {
  setActivePartcode,
  setActiveLabel,
  setSelectedGroup,
  mainReducer
} from '../redux/reducers.js';
import connect from '../connect.js';

import label_group_new from '../components/label_group_new.js';
import label_group_selected from '../components/label_group_selected.js';
import label_group_list from '../components/label_group_list.js';
import labels_list from '../components/labels_list.js';
// import label_dnd from '../components/label_dnd.js';
import label_new from '../components/label_new.js';

import defaultState from '../redux/types.js';

/** @type {import('../redux/types').Redux} */
const { createStore } = window.Redux;
const store = createStore(mainReducer, defaultState);

const handle = {
  searchInput: document.querySelector('#searchInput'),
  activeLabelName: document.querySelector('#activeLabelName'),
  activePartcode: document.querySelector('#activePartcode'),
  labels_list: document.querySelector('#labels_list'),
  labelDetails: document.querySelector('#labelDetails'),
  label_new: document.querySelector('#label_new'),
  label_group_new: document.querySelector('#label_group_new'),
  label_group_selected: document.querySelector('#label_group_selected'),
  label_group_list: document.querySelector('#label_group_list'),
  label_dnd: document.querySelector('#label_dnd'),
};


function render(comp, data) {
  // console.log(comp());
  comp.innerHTML = data;
}

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
  const { activeLabelGroup, otherLabelGroups } = connect.labelGroups.getLabelGroupsByPartcode(activePartcode);


  //Components...
  handle.activePartcode.innerHTML = component.activePartcode(activePartcode);
  handle.activeLabelName.innerHTML = component.activeLabelName(activeLabel);
  // handle.labels_list.innerHTML = component.labels_list(associatedLabels);

  //Label
  render(handle.label_new, label_new(activePartcode));

  handle.labelDetails.innerHTML = component.labelDetails({ activeLabel, prefixes });

  render(handle.labels_list, labels_list(associatedLabels));

  //Label Group
  render(handle.label_group_new, label_group_new(activePartcode));
  // handle.label_group_new.innerHTML = label_group_new(activePartcode);
  render(handle.label_group_selected, label_group_selected(activeLabelGroup));

  render(handle.label_group_list, label_group_list(activePartcode, otherLabelGroups));

  // render(handle.label_dnd, label_dnd());

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

function handleGroupSelect(activePartcode, group) {
  const isFound = connect.labelGroups.getLabelsByGroup(activePartcode, group);
  console.log(isFound);
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
    const labelListSelect = e.target.closest(`[data-name]`);
    const labelGroupSelect = e.target.closest(`[data-group]`);

    if (removeActivePartcode) {
      store.dispatch(setActivePartcode(''));
      store.dispatch(setActiveLabel(''));
    }

    if (labelGroupSelect) {
      const partcode = labelGroupSelect.dataset.partcode;
      const labelGroupName = labelGroupSelect.dataset.group;
      console.log(labelGroupName);
      const group = handleGroupSelect(partcode, labelGroupName);

      console.log(group);
      store.dispatch(setSelectedGroup(group));
    }

    if (labelListSelect) {
      const labelHistoryName = labelListSelect.dataset.name;
      const label = handleLabelSelect(labelHistoryName);

      store.dispatch(setActiveLabel(label));
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
