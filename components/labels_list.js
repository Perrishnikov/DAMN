const labels_list = (selectedLabel, labels) => {

  // console.log(lables);
  if (labels.length > 1) {
    const partcode = labels[0].partcode;

    return `
      <div id="" class="flex-row">
        <div class="component-head">Label List for 
        <input value="${partcode}"></input>
        </div>
      </div>
      ${[...labels].map(label => {
      // console.log(label);
      const isSelected = selectedLabel.name == label.name ? 'selected' : '';

      return `<div draggable="true" data-name=${label.prefix.name}${label.partcode}.${label.version} class="component-item dnd-item ${isSelected}">${label.name}</div>`;
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

export default labels_list;