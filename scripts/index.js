
import component from '../components.js';
import defaultState from '../redux/types.js';
import {
  setActivePartcode,
  setSelectedLabel,
  setSelectedGroup,
  setLabelGroups,
  reset,
  appendPendingLabelGroup,
  mainReducer
} from '../redux/reducers.js';
import connect from '../connect.js';

import label_group_new from '../components/label_group_new.js';
import label_group_list from '../components/label_group_list.js';
import labels_list from '../components/labels_list.js';
import label_new from '../components/label_new.js';
import label_details from '../components/label_details.js';
import image_new from '../components/image_new.js';
import images_list from '../components/images_list.js';
// import { active_partcode, add_new_partcode } from '../components/active_partcode.js';

/** @type {import('../redux/types').Redux} */
const { createStore } = window.Redux;
const store = createStore(mainReducer, defaultState);

const handle = {
  searchInput: document.querySelector('#searchInput'),
  activeLabelName: document.querySelector('#activeLabelName'),
  // active_partcode: document.querySelector('#active_partcode'),
  labels_list: document.querySelector('#labels_list'),
  label_details: document.querySelector('#label_details'),
  label_new: document.querySelector('#label_new'),
  label_group_new: document.querySelector('#label_group_new'),
  label_group_list: document.querySelector('#label_group_list'),
  label_dnd: document.querySelector('#label_dnd'),
  image_new: document.querySelector('#image_new'),
  images_list: document.querySelector('#images_list'),
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
  const pendingLabelGroup = store.getState().pendingLabelGroup;

  //Database connections... 
  const associatedLabels = connect.labels.getLabelsByPartcode(activePartcode);
  const associatedGroups = connect.labelGroups.getLabelGroupsByPartcode(activePartcode);
  const prefixes = connect.prefixes.getAllPrefixes();

  console.log(associatedGroups);
  const selectedImage = ''; //! 
  const associatedImages = ''; //! 


  /** Nav */
  handle.searchInput.value = activePartcode;


  /** 1st col */
  // render(handle.active_partcode, active_partcode(activePartcode));
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
  render(handle.label_group_new, label_group_new(activePartcode, pendingLabelGroup, selectedLabel));
  /* Label Groups for partcode */
  render(handle.label_group_list, label_group_list(
    selectedLabel,
    selectedLabelGroup,
    associatedGroups)
  );


  /** 4th column Images */
  render(handle.image_new, image_new(activePartcode));
  render(handle.images_list, images_list(
    selectedImage,
    associatedImages
  ));


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


function handleNewLabelDnd() {
  const place = document.querySelector('#label_new');

  place.addEventListener('ondragenter', e => {
    console.log(`ondragenter`);
    // document.getElementById('label_new').textContent = ''; 
    event.stopPropagation();
    event.preventDefault();
  });

  place.addEventListener('ondragover', e => {
    console.log(`ondragover`);
    event.stopPropagation();
    event.preventDefault();
  });
  place.addEventListener('ondrop', e => {
    console.log(`ondrop`);
    event.stopPropagation();
    event.preventDefault();
    dodrop(e);
  });

  function dodrop(event) {
    let dt = event.dataTransfer;
    let files = dt.files;

    let count = files.length;
    output('File Count: ' + count + '\n');

    for (let i = 0; i < files.length; i++) {
      output(' File ' + i + ':\n(' + (typeof files[i]) + ') : <' + files[i] + ' > ' +
        files[i].name + ' ' + files[i].size + '\n');
    }
  }

  function output(text) {
    document.getElementById('output').textContent += text;
    //dump(text);
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
      const isPartcodeListed = handlePartcodeSearch(partcode);

      if (partcode === '') {
        store.dispatch(reset());
        return;
      }

      if (isPartcodeListed) {
        // handle.searchInput.value = '';
        handle.searchInput.value = partcode;
        handle.searchInput.blur();

        store.dispatch(setActivePartcode(partcode));
      } else {
        // render(handle.active_partcode, add_new_partcode(partcode));
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
    const addNewPartcode = e.target.closest('.newPartcodeButton');

    handleNewLabelDnd();

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
    // if (newLabelGroup) {
    //   document.querySelector('#newStuff').classList.toggle('closed');
    // }

    if (addNewPartcode) {
      const value = addNewPartcode.innerText;

      connect.partcodes.setPartcode(value);

      handle.searchInput.value = '';
      handle.searchInput.blur();

      store.dispatch(setActivePartcode(value));
    }
  });


  /**
   * handles changing prefix and version 
   */
  window.addEventListener('change', e => {

    if (e.target.id === 'prefixSelect') {
      console.log(`update temp label with new prefix: ${e.target.value}`);
    }

    if (e.target.id === 'labelDetailVersion') {
      console.log(`update temp label with new version: ${e.target.value}`);
    }


  });


  /** 
   * Add DND listeners
   * DND for Label Groups
   */
  window.addEventListener('dragstart', e => {
    const dndItemName = e.target.closest('.dnd-item').dataset.name;
    // console.dir(dndItemName);

    // Clear the drag data cache (for all formats/types)
    e.dataTransfer.clearData();
    e.dataTransfer.setData('text/plain', dndItemName);


    e.target.closest('.dnd-item').style.border = '1px dashed red';

    // let labelName = e.dataTransfer.getData('text');
    // console.log(`dragstart labelName: ${labelName}`);
  });


  //If you want to allow a drop, you must prevent the default handling by cancelling both the dragenter and dragover events.
  handle.label_group_new.addEventListener('dragenter', e => e.preventDefault());
  handle.label_group_new.addEventListener('dragover', e => e.preventDefault());
  handle.label_group_new.addEventListener('drop', e => {
    // console.log(e);
    e.preventDefault();

    // Get the data
    let labelName = e.dataTransfer.getData('text');
    // console.log(`drop labelName: ${labelName}`);

    // console.log(partcode);
    let lbl = connect.labels.getLabelByKey(labelName);

    console.log(lbl);
    store.dispatch(appendPendingLabelGroup({ labelName, label: lbl }));
  });
}


window.addEventListener('DOMContentLoaded', function () {
  store.subscribe(rerenderDOM);
  addListeners();
  rerenderDOM();
});
