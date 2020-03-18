const weHaveLabels = (selectedLabel, labels) => {

  return `
    ${[...labels].map(([key, label]) => {
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


const label_group_new = (partcode, pendingLabelGroup, selectedLabel) => {
  // console.log(pendingLabelGroup.size);
  if(pendingLabelGroup.size > 0){
    document.querySelector('#label_group_new').classList.add('grow');
  }

  if (partcode) {
    return `
    <div id="" class="flex-row">

      <svg class="component-head-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="bevel"><path d="M11 21H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h5l2 3h9a2 2 0 0 1 2 2v2M19 15v6M16 18h6"/></svg>
    
      <div class="component-head">New Label Group <span style="font-size:11px;">(dnd a label here)</span></div>
    </div>

    ${pendingLabelGroup.size > 0 ? `
      <div class="label-group">
        <div id="" class="component-head">
          <span>Group Name:</span>
          <input id="newLabelGroupName" value="placeholder"></input>
        </div>

      
        ${weHaveLabels(selectedLabel, pendingLabelGroup)}

        <div class="flex-row button-box">
          <a id="labelCreateGroup" class="button">Create Group</a>
          <a id="labelDiscardGroup" class="button">Discard</a>
        </div>
        
      </div>
    ` : ''}
    
    
  `;
  } else {
    return ``;
  }

};

export default label_group_new;