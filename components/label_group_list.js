const label_group_list = (selectedLabelGroup, labelGroups) => {

  if (labelGroups.length > 1) {
    
    return `
    <div>Label Group List: </div>
    ${[...labelGroups].map(group => {
      const isActive = group.status == 'ACTIVE' ? 'groupIsActive' : '';

      const isSelected = selectedLabelGroup == group.groupName ? 'groupIsSelected' : '';

      // console.log(group);
      return `<div data-group="${group.groupName}" class="lineItem ${isActive} ${isSelected}">${group.groupName}</div>`;
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

