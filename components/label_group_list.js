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


const label_group_list = (selectedLabel, selectedLabelGroup, labelGroups) => {

  if (labelGroups && labelGroups.length > 1) {

    return `
    <div>Label Group List: </div>
    ${[...labelGroups].map(group => {
      const isActive = group.status == 'ACTIVE' ? 'groupIsActive' : '';

      const isSelected = selectedLabelGroup == group.groupName ? 'groupIsSelected' : '';

      // console.log(group);
      return `
        <div data-group="${group.groupName}" class="lineItem ${isSelected}">
        <span class="${isActive}"> ${group.groupName} ${isActive === 'groupIsActive' ? `- ACTIVE` : ``}</span>
        
        ${!isActive ? `<button>Activate</button>` : ``}

          ${isSelected ? groupDetails(group, selectedLabel) : ``}
        </div>`;
    }).join('')}
    `;
  } else {
    return `
    <div class="">
      <span>${''}</span>
    </div>
    `;
  }
};

export default label_group_list;

