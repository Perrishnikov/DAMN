
import component from '../components.js';
import defaultState from '../redux/types.js';
import connect from '../connect.js';

import {
  setActivePartcode,
  setSelectedLabel,
  setLabelListPartcode,
  reset,
  appendPendingLabelGroup,
  deletePendingLabelGroup,
  removeFromPendingLabelGroup,
  setLabelGroupStatusByGroupName,
  createNewLabelGroup,
  mainReducer
} from '../redux/reducers.js';

import label_group_new from '../components/label_group_new.js';
import label_group_list from '../components/label_group_list.js';
import labels_list from '../components/labels_list.js';
import label_new from '../components/label_new.js';
import label_details from '../components/label_details.js';
import image_new from '../components/image_new.js';
import images_list from '../components/images_list.js';
import image_groups from '../components/image_groups.js';
import nav from '../components/nav.js';

/** @type {import('../redux/types').Redux} */
const { createStore } = window.Redux;
const store = createStore(mainReducer, defaultState);

const handle = {
  nav: document.querySelector('#nav'),
  searchInput: document.querySelector('#searchInput'),
  activeLabelName: document.querySelector('#activeLabelName'),
  active_partcode: document.querySelector('#active_partcode'),
  labels_list: document.querySelector('#labels_list'),
  label_details: document.querySelector('#label_details'),
  label_new: document.querySelector('#label_new'),
  label_group_new: document.querySelector('#label_group_new'),
  label_group_list: document.querySelector('#label_group_list'),
  label_dnd: document.querySelector('#label_dnd'),
  image_new: document.querySelector('#image_new'),
  images_list: document.querySelector('#images_list'),
  image_groups: document.querySelector('#image_groups'),
};


function render(comp, data) {
  // console.log(comp);
  // console.log(data);
  comp.innerHTML = data;
}


function rerenderDOM() {
  console.log('re-renderDOM');
  // console.log(store.getState());

  //States....
  const activePartcode = store.getState().activePartcode;
  console.log(`activePartcode: ${activePartcode}`);
  const labelListPartcode = store.getState().labelListPartcode;
  // console.log(`labelListPartcode: ${labelListPartcode}`);
  const selectedLabel = store.getState().selectedLabel;
  const pendingLabelGroup = store.getState().pendingLabelGroup;

  //Database connections... 
  // if labelListSearchPartcode use it, if not, use activePartcode
  const associatedLabels = connect.labels.getLabelsByPartcode(
    labelListPartcode ? labelListPartcode : activePartcode);
  // console.log(associatedLabels);
  const associatedGroups = connect.labelGroups.getLabelGroupsByPartcode(activePartcode);
  // console.log(associatedGroups);
  const prefixes = connect.prefixes.getAllPrefixes();

  /** Images */
  const imageListPartcode = store.getState().imageListPartcode;
  // console.log(`imageListPartcode: ${imageListPartcode}`);
  const selectedImage = store.getState().selectedImage; 
  const associatedImages = connect.images.getImagesByPartcode(
    imageListPartcode == '' ? activePartcode : imageListPartcode
  );

  /** Nav */
  render(handle.nav, nav({ activePartcode }));
  // handle.searchInput.value = activePartcode;


  /** 1st col */
  // render(handle.active_partcode, active_partcode(activePartcode));
  /* Label Details */
  render(handle.label_details, label_details({ selectedLabel, prefixes }));


  /** 2nd col */
  /* New Label */
  {
    render(handle.label_new, label_new(activePartcode));
    /* Labels List */
    render(handle.labels_list, labels_list({
      activePartcode,
      selectedLabel,
      associatedLabels
    })
    );
  }
  /** 3rd col */
  {
    /* Label Groups New */
    render(handle.label_group_new, label_group_new(activePartcode, pendingLabelGroup, selectedLabel));
    /* Label Groups for partcode */
    render(handle.label_group_list, label_group_list(
      selectedLabel,
      associatedGroups)
    );
  }


  /** 4th column Images */
  {
    render(handle.images_list, images_list({
      activePartcode,
      selectedImage,
      associatedImages
    }));
    render(handle.image_groups, image_groups({activePartcode}));
  }

  /** 5th column Images */
  render(handle.image_new, image_new(activePartcode));


  if (store.getState().devMode) {
    const partcodes = connect.partcodes.getAllPartcodes();
    document.body.appendChild(component.dataView({ partcodes }));
  }

  addDragListeners();

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


/**
 * Update Tables with new Status for Label Groups
 * @param {} activePartcode 
 * @param {*} groupName 
 * @param {*} newStatus 
 */
function updateLabelGroupStatus(activePartcode, metaData, newStatus) {
  const { groupName, description, user = '', timeStamp } = metaData;
  const associatedGroups = connect.labelGroups.getLabelGroupsByPartcode(activePartcode);
  const groupToUpdate = associatedGroups.find(group => group.groupName === groupName);

  // console.log(activePartcode);
  // console.log(groupName);
  // console.log(newStatus);
  // console.log(associatedGroups);

  if (newStatus === 'ACTIVE') {
    const otherActive = associatedGroups.find(group => group.status === newStatus);
    otherActive.status = 'HISTORY';

    // groupToUpdate.imageDate = timeStampe;
    // groupToUpdate.imagePerson = user;
    groupToUpdate.user = user;
    groupToUpdate.date = timeStamp;
    groupToUpdate.status = newStatus;
    groupToUpdate.description = description;

  } else if (newStatus === 'REJECTED') {

    // groupToUpdate.labelPerson = user;
    // groupToUpdate.labelDate = timeStampe;
    groupToUpdate.user = user;
    groupToUpdate.date = timeStamp;
    groupToUpdate.status = newStatus;
    groupToUpdate.description = description;

  } else if (newStatus === 'PENDING') {
    const otherPending = associatedGroups.find(group => group.status === newStatus);

    if (otherPending) {
      console.error('Existing PENDING');

    } else {
      console.log(`okay to PEND`);
    }
  }

  // console.log(groupToUpdate);
  rerenderDOM();
}


function addListeners() {
  /** 
   * Nav SearchInput 
   */
  document.addEventListener('keyup', e => {


    if (e.keyCode === 13) {
      console.log('13');
      const searchInput = document.querySelector('#searchInput');
      const labelListSearch = document.querySelector('#labelListSearch');

      // ActivePartcodeSearch
      if (document.activeElement === searchInput) {
        const partcode = searchInput.value;

        const isPartcodeListed = handlePartcodeSearch(partcode);
        // console.log(`partcode: ${partcode}; isListed: ${isPartcodeListed}`);

        if (partcode === '') {
          searchInput.value = '';
          store.dispatch(reset());
          return;
        }


        if (isPartcodeListed) {
          searchInput.value = partcode;

          store.dispatch(reset());
          store.dispatch(setActivePartcode(partcode));
        } else {

          render(handle.nav, nav({ newPartcode: partcode }));
        }
      }

      /** 
       * LabelListSearch
       * Whenever a new ActivePartcode is created, search here too
       * Can have a labelListSearch that doesnt match ActivePartcode.
       */
      if (document.activeElement === labelListSearch) {
        const partcode = labelListSearch.value;

        const isPartcodeListed = handlePartcodeSearch(partcode);
        console.log(`partcode: ${partcode}; isListed: ${isPartcodeListed}`);

        if (partcode === '') {
          labelListSearch.value = store.getState().activePartcode;
          // store.dispatch(reset());
          return;
        }


        if (isPartcodeListed) {
          labelListSearch.value = partcode;

          // store.dispatch(reset());
          store.dispatch(setLabelListPartcode(partcode));
          // render(handle.labels_list, labels_list({ existingPartcode: partcode }));
        } else {

          // render(handle.nav, nav({ newPartcode: partcode }));
        }


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
    const createPartcode = e.target.closest('[data-createPartcode]');
    const cancelPartcode = document.querySelector('#cancelPartcode');
    const labelActivate = e.target.closest('#labelActivate');
    const labelPend = e.target.closest('#labelPend');
    const labelReject = e.target.closest('#labelReject');
    const labelCreateGroup = e.target.closest('#labelCreateGroup');
    const labelDiscardGroup = e.target.closest('#labelDiscardGroup');
    const dataGroup = e.target.closest('[data-group');
    const labelDelete = e.target.closest('#labelDelete');
    const deleteComponentitem = e.target.closest('[data-deletecomponentitem');

    e.preventDefault();

    // handleNewLabelDnd();

    if (labelPend) {
      console.log(`labelPend`);
      // const activePartcode = store.getState().activePartcode;
      // // console.log(`activePartcode: ${activePartcode}`);
      // const pendGroupName = document.querySelector('#dataGroup').dataset.group;

      // const updatedGroups = connect.labelGroups.addLabelGroupByPartcode({
      //   activePartcode,
      //   pendingLabelGroup,
      //   newGroupName: pendGroupName,
      //   user: 'Perry',
      //   date: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
      //   description: document.querySelector('#pendingLabelGroupDescription').textContent,
      // });

    }


    if (labelActivate) {
      console.log(`labelActivate`);
      const activePartcode = store.getState().activePartcode;
      console.dir(document.querySelector('#pendingLabelGroupDescription'));
      // const groupName = dataGroup.dataset.group;
      const metaData = {
        groupName: dataGroup.dataset.group,
        description: document.querySelector('#pendingLabelGroupDescription').textContent,
        user: 'Perry',
        timeStamp: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
      };

      updateLabelGroupStatus(activePartcode, metaData, 'ACTIVE');
    }

    if (deleteComponentitem) {
      const labelName = labelSelected.dataset.name;

      store.dispatch(removeFromPendingLabelGroup(labelName));
    }

    if (labelDelete) {
      console.log(`labelDelete`);
      const activePartcode = store.getState().activePartcode;
      const groupName = dataGroup.dataset.group;

      connect.labelGroups.removeLabelGroupByGroupName(activePartcode, groupName);
      rerenderDOM();
    }

    if (labelReject) {
      console.log(`labelReject`);
      const activePartcode = store.getState().activePartcode;
      const metaData = {
        groupName: dataGroup.dataset.group,
        description: document.querySelector('#pendingLabelGroupDescription').textContent,
        user: 'Perry',
        timeStamp: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
      };
      // const groupName = dataGroup.dataset.group;

      updateLabelGroupStatus(activePartcode, metaData, 'REJECTED');
    }

    if (labelDiscardGroup) {
      console.log(`labelDiscardGroup`);
      store.dispatch(deletePendingLabelGroup());
    }

    if (labelCreateGroup) {
      console.log(`labelCreateGroup`);
      const activePartcode = store.getState().activePartcode;
      // console.log(`activePartcode: ${activePartcode}`);
      const newGroupName = document.querySelector('#newLabelGroupName').textContent;

      // console.log(`newGroupName: ${newGroupName}`);
      const pendingLabelGroup = store.getState().pendingLabelGroup;
      // console.log(pendingLabelGroup);

      // console.dir(document.querySelector('#newLabelGroupDescription').textContent);
      const updatedGroups = connect.labelGroups.addLabelGroupByPartcode({
        activePartcode,
        pendingLabelGroup,
        newGroupName,
        user: 'Perry',
        date: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
        description: document.querySelector('#newLabelGroupDescription').textContent,
      });

      // console.log(updatedGroups);

      store.dispatch(deletePendingLabelGroup(activePartcode));
    }


    if (removeActivePartcode) {
      console.log(`removeActivePartcode`);
      store.dispatch(reset());
    }

    // if (labelGroupSelected) {
    //   console.log(`labelGroupSelected; setSelectedGroup`);
    //   const labelGroupName = labelGroupSelected.dataset.group;

    //   store.dispatch(setSelectedGroup(labelGroupName));
    // }

    if (labelSelected) {
      const labelHistoryName = labelSelected.dataset.name;
      const label = handleLabelSelect(labelHistoryName);

      store.dispatch(setSelectedLabel(label));
    }


    /** Nav - createPartcode */
    if (createPartcode) {
      const value = createPartcode.dataset.createpartcode;
      // console.log(`value: ${value}`);

      connect.partcodes.setPartcode(value); //add to database, not state

      store.dispatch(reset());
      store.dispatch(setActivePartcode(value));
    }

    if (cancelPartcode) {
      store.dispatch(setActivePartcode(store.getState().activePartcode));
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

  /** Drag Targets that dont disappear */
  //If you want to allow a drop, you must prevent the default handling by cancelling both the dragenter and dragover events.
  handle.label_group_new.addEventListener('dragenter', e => e.preventDefault());
  handle.label_group_new.addEventListener('dragover', e => e.preventDefault());
  handle.label_group_new.addEventListener('drop', e => {
    const pending = document.querySelector('[data-status="PENDING"]');

    if (!pending) {
      // console.log(e);
      e.preventDefault();

      // [...document.querySelectorAll('.dnd-labelItem')].forEach(item => item.classList.remove('active'));

      // Get the data
      let labelName = e.dataTransfer.getData('text');
      // console.log(`drop labelName: ${labelName}`);

      // console.log(partcode);
      let lbl = connect.labels.getLabelByKey(labelName);

      // console.log(lbl);
      store.dispatch(appendPendingLabelGroup({ labelName, label: lbl }));
    }

  });

}


/** 
   * Add DND listeners
   * DND for Label Groups
   */
function addDragListeners() {
  const pending = document.querySelector('[data-status="PENDING"]');


  [...document.querySelectorAll('.dnd-labelItem')].forEach(i => {

    i.addEventListener('dragstart', e => {
      const dndItemName = e.target.closest('.dnd-labelItem ').dataset.name;
      // console.dir(dndItemName);

      // Clear the drag data cache (for all formats/types)
      e.dataTransfer.clearData();
      e.dataTransfer.setData('text/plain', dndItemName);


      e.target.closest('.dnd-labelItem').classList.add('active');



      if (pending) {
        pending.classList.add('grow', 'dnd-labelGroup-target', 'active');
      } else {
        document.querySelector('.dnd-labelGroup-target').classList.add('active');
        return;
      }


      // let labelName = e.dataTransfer.getData('text');
      // console.log(`dragstart labelName: ${labelName}`);
    });

    /** removes drag classes when done */
    i.addEventListener('dragend', e => {

      e.srcElement.classList.remove('active');

      document.querySelector('.dnd-labelGroup-target').classList.remove('active');

      [...document.querySelectorAll('.dnd-labelItem')].forEach(item => item.classList.remove('active'));

      if (pending) {

        pending.classList.remove('dnd-labelGroup-target', 'active');
      }

    });


  });



  if (pending) {
    pending.addEventListener('dragenter', e => e.preventDefault());
    pending.addEventListener('dragover', e => e.preventDefault());

    pending.addEventListener('drop', e => {
      e.preventDefault();

      let labelName = e.dataTransfer.getData('text');

      const activePartcode = store.getState().activePartcode;
      // console.log(`activePartcode: ${activePartcode}`);
      const groupName = pending.dataset.group;
      // console.log(`groupName: ${groupName}`);

      const updatedGroups = connect.labelGroups.addToLabelGroup(
        activePartcode,
        groupName,
        labelName);

      // console.log(updatedGroups);
      store.dispatch(setActivePartcode(activePartcode));

    });
  }




}

window.addEventListener('DOMContentLoaded', function () {
  store.subscribe(rerenderDOM);

  rerenderDOM();
  addListeners();
});
