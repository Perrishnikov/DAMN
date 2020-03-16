const labels_list = ({activePartcode, selectedLabel, associatedLabels = null}) => {

  // console.log(associatedLabels);
  if (activePartcode) {
    const partcode = associatedLabels && associatedLabels.length > 0 ? associatedLabels[0].partcode : '';
    const notMatched = partcode != activePartcode ? 'is-warning' : '' ;

    return `
      <div id="" class="flex-row">
        <div class="component-head">Label List for 
        <span>
          <svg class="navIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A7A7A" stroke-width="2" stroke-linecap="round" stroke-linejoin="bevel">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input id="labelListSearch" class="${notMatched}" value="${partcode}"></input>
        </span>
        
        </div>
      </div>
      <div class="label-group">
        ${associatedLabels.map(label => {
          // console.log(label);
          const isSelected = selectedLabel.name == label.name ? 'selected' : '';
  
          return `<div draggable="true" data-name=${label.prefix.name}${label.partcode}.${label.version} class="component-item dnd-item ${isSelected}">${label.name}</div>`;
        }).join('')}
      </div>

      `;
  } else {
    return `
      <div class="">
        <span>${''}</span>
      </div>
      `;
  }
};

export default labels_list;