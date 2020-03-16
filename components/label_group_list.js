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
    <div id="" class="flex-row">
      <div class="component-head">Label Group List</div>
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
              ${group.status === 'PENDING' ? `
              <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="bevel"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
              ` : ``}
            </div>
            
            <span class="sinceDate">Since ${group.statusDate}</span>

          </div>
          

          ${weHaveLabels(selectedLabel, group.labels)}
          
          ${group.status === 'PENDING' ? `
            <div style="margin-left:8px;padding:4px;">
              <a class="button is-primary is-outlined" id="labelActivate">ACTIVATE</a>
              <a style="margin-left:8px;" id="labelReject" class="button is-danger is-outlined">REJECT</a>
            </div>
            ` : ``}

          ${group.status === 'REJECTED' ? `
            <div style="margin-left:8px;padding:4px;">
              <a class="button is-primary is-outlined" id="labelActivate">ACTIVATE</a>
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

