const image_list = (selectedLabel, labels) => {

  // console.log(lables);
  if (labels.length > 1) {
    const partcode = labels[0].partcode;

    return `
      <div id="" class="flex-row">
        <div class="component-head">Label List for 
        <input value="${partcode}"></input>
        </div>
      </div>
      <div class="label-group">
        ${[...labels].map(label => {
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

export default image_list;