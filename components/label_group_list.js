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

const label_group_list = (selectedLabel, labelGroups) => {

  if (labelGroups && labelGroups.length > 1) {

    return `
    <div id="" class="flex-col component-head">
      <div class="flex-row">
        <span>Label Group List</span>
      </div>
    </div>

    
    ${[...labelGroups].map(group => {
      let status = '';

      switch(group.status){
        case 'ACTIVE': status = 'is-info';
        break;
        case 'PENDING': status = 'is-warning';
        break;
        case 'REJECTED': status = 'is-danger';
        break;
        default: '';
      }

      // const isSelected = selectedLabelGroup == group.groupName ? 'groupIsSelected' : '';

      return `
        <div data-group="${group.groupName}" data-status="${group.status}" class="label-group ${''}">

          <div class="flex-row labelGroupStatus">
            <span class="">${group.groupName}</span>

            <div class="flex-row groupStatus">
              <span class="tag ${status}">${group.status}</span>
              
            </div>
            
            <span class="sinceDate">Since ${group.statusDate}</span>

          </div>
          

          ${weHaveLabels(selectedLabel, group.labels)}
          
          ${group.status === 'PENDING' ? `
            <div style="margin-left:8px;padding:4px;">
              <a class="button" id="labelActivate">ACTIVATE</a>
              <a style="margin-left:8px;" id="labelReject" class="button">REJECT</a>
            </div>
            ` : ``}

          ${group.status === 'REJECTED' ? `
            <div style="margin-left:8px;padding:4px;">
              <a class="button" id="labelActivate">ACTIVATE</a>
              <a class="button" id="labelDelete">DELETE</a>
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

