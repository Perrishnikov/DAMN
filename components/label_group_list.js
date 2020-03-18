const weHaveLabels = (selectedLabel, labels, status) => {

  return `
    ${labels.map(label => {
    // console.log(label);
    const isSelected = selectedLabel.name == label.name ? 'selected' : '';

    return `
        <div data-name=${label.prefix.name}${label.partcode}.${label.version} class="component-item ${isSelected}">
          <span style="font-weight: 600;">${label.prefix.type}</span>
          <span style="flex-grow:1"> - ${label.name}</span>

          ${status === 'PENDING' ? `
          <svg data-deleteComponentItem="${label.name}" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="bevel"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          `: ``}
          
        </div>`;
  }).join('')}
    `;
};

const label_group_list = (selectedLabel, labelGroups) => {

  if (labelGroups && labelGroups.length > 0) {

    return `
    <div id="" class="flex-row">
      <div class="component-head">Label Group List</div>
    </div>

    
    ${[...labelGroups].map(group => {
      let status = '';

      switch (group.status) {
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

            ${group.status === 'PENDING' ? `
              <div contenteditable="true" id="pendingName">${group.groupName}</div>
              `: `
              <span class="">${group.groupName}</span>
              `}

            

            <div class="flex-row groupStatus">
              <span class="tag ${status}">${group.status}</span>
              
            </div>
            
            <span class="sinceDate">Since ${group.date}</span>

          </div>
          <div class="component-subComp">
            <div style="flex-shrink:0">Description:</div>
            <div contenteditable="false" id="pendingLabelGroupDescription">${group.description}</div>
          </div>
          <div class="component-subComp">
            <div style="flex-shrink:0">User:</div>
            <div contenteditable="false" >${group.user}</div>
          </div>

          ${weHaveLabels(selectedLabel, group.labels, group.status)}
          
          ${group.status === 'PENDING' ? `
            <div style="margin-left:8px;padding:4px;">
              <a class="button" id="labelActivate">ACTIVATE</a>
              <a style="margin-left:8px;" id="labelReject" class="button">REJECT</a>
            </div>
            ` : ``}

          ${group.status === 'REJECTED' ? `
            <div style="margin-left:8px;padding:4px;">
              <!--<a class="button" id="labelPend">PENDING</a>-->
              <a style="margin-left:8px;" class="button" id="labelDelete">DELETE</a>
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

