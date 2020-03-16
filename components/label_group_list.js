// import { setSelectedGroup } from "../redux/reducers";

const groupDetails = (group, selectedLabel) => {

  // console.log(group);
  const cartons = group.labels.filter(label => label.prefix.type == 'CARTON');

  const labels = group.labels.filter(label => label.prefix.type == 'LABEL');

  const pouches = group.labels.filter(label => label.prefix.type == 'POUCH');

  return `
    <div>Cartons:</div>
    ${cartons.map(carton => {
      const isSelected = selectedLabel.name == carton.name ? 'groupIsSelected' : '';

      return `
      <div data-name=${carton.prefix.name}${carton.partcode}.${carton.version} class="labels_history_item ${isSelected}">${carton.name}</div>
      `;
    })}

    <div>Labels:</div>
    ${labels.map(label => {
      const isSelected = selectedLabel.name == label.name ? 'groupIsSelected' : '';

      return `
      <div data-name=${label.prefix.name}${label.partcode}.${label.version} class="labels_history_item ${isSelected}">${label.name}</div>
      `;
    })}
    
    ${pouches && pouches.length > 1 ?
      `<div>Pouches:</div>
      ${pouches.map(pouch => {
        const isSelected = selectedLabel.name == pouch.name ? 'groupIsSelected' : '';

        return `
        <div data-name=${pouch.prefix.name}${pouch.partcode}.${pouch.version} class="labels_history_item ${isSelected}">${pouch.name}</div>
        `;
      })}`
      : ''}
  `;


};
const weHaveLabels = (selectedLabel, labels) => {

  return `
    ${labels.map(label => {
      // console.log(label);
      const isSelected = selectedLabel.name == label.name ? 'selected' : '';


      return `
        <div data-name=${label.prefix.name}${label.partcode}.${label.version} class="component-item ${isSelected}">
          <span style="font-weight: 600;">${label.prefix.type}</span>
          <span> - ${label.name}</span>
        </div>`;
    }).join('')}
    `;
};

const label_group_list = (selectedLabel, selectedLabelGroup, labelGroups) => {

  if (labelGroups && labelGroups.length > 1) {

    return `
    <div id="" class="flex-row">
      <div class="component-head">Label Group List</div>
    </div>

    
    ${[...labelGroups].map(group => {
      let status = '';

      switch(group.status){
        // case 'ACTIVE': status = 'groupIsActive';
        case 'ACTIVE': status = 'is-info';
        break;
        // case 'PENDING': status = 'groupIsPending';
        case 'PENDING': status = 'is-warning';
        break;
        default: '';
      }

      const isSelected = selectedLabelGroup == group.groupName ? 'groupIsSelected' : '';

      return `
        <div data-group="${group.groupName}" class="label-group ${isSelected}">
          <div class="labelGroupStatus">
            <span class="">${group.groupName}</span>
            <div class="groupStatus">
              <span class="tag ${status}">${group.status}</span>
              
            </div>
            
            <span class="sinceDate">Since ${group.labelTeamDate}</span>
          </div>
          

          ${weHaveLabels(selectedLabel, group.labels)}
          
          ${group.status === 'PENDING' ? `
            <div style="margin-left:8px;padding:4px;">
              <a class="button is-primary is-outlined" id="labelActivate">ACTIVATE</a>
              <a style="margin-left:8px;" id="labelReject" class="button is-danger is-outlined">REJECT</a>
              </div>
              ` : ``}
        </div>`;

    }).join('')}`;
  } else {
    return `
    <div class="">
      <span>${''}</span>
    </div>
    `;
  }
};

export default label_group_list;

