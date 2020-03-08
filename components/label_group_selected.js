const label_group_selected = group => {

  if (group) {
    const cartons = group.labels.filter(label => label.prefix.type == 'CARTON');

    const labels = group.labels.filter(label => label.prefix.type == 'LABEL');

    const pouches = group.labels.filter(label => label.prefix.type == 'POUCH');

    return `
      <div>Selected Label Group: <span>${group.groupName}</span></div>

      <div>Cartons:</div>
      ${cartons.map(carton => {
      return `
      <div data-name=${carton.prefix.name}${carton.partcode}.${carton.version} class="labels_history_item">${carton.name}</div>
      `;
    })}

      <div>Labels:</div>
      ${labels.map(label => {
      return `
      <div data-name=${label.prefix.name}${label.partcode}.${label.version} class="labels_history_item">${label.name}</div>
      `;
    })}
      
      ${pouches.length > 1 ?
        `<div>Cartons:</div>
        ${pouches.map(pouch => {
          return `
          <div data-name=${pouch.prefix.name}${pouch.partcode}.${pouch.version} class="labels_history_item">${pouch.name}</div>
          `;
        })}`
        : ''}
    `;
  } else {
    return `
    <div class="">
      <span>${''}</span>
    </div>
    `;
  }
};

export default label_group_selected;