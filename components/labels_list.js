const labels_list = (selectedLabel, labels) => {

  // console.log(lables);
  if (labels.length > 1) {
    const partcode = labels[0].partcode;

    return `
      <div class="">Label List for ${partcode}:</div>
      ${[...labels].map(label => {
      // console.log(label);
      const isSelected = selectedLabel.name == label.name ? 'groupIsSelected' : '';

      return `<div data-name=${label.prefix.name}${label.partcode}.${label.version} class="labels_history_item ${isSelected}">${label.name}</div>`;
    }).join('')}
      `;
  } else {
    return `
      <div class="labels_history_item">
        <span>${''}</span>
      </div>
      `;
  }
};

export default labels_list;