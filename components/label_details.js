const selectForPrefix = params => {
  const { activeLabel, prefixes } = params;
  const labelprefix = activeLabel.prefix.name;

  return `
    <select id="prefixSelect"> 

      ${[...prefixes].map(([key, value]) => {
    return `<option ${labelprefix == value.name ? 'selected' : ''} value="${value.name}">${value.name}</option>`;
  }).join('')}

    </select>
  `;

};


const label_details = params => {

  const { selectedLabel, prefixes } = params;

  if (selectedLabel) {
    return `
      <div id="" class="flex-row">
        <div class="component-head">Selected Label Details</div>
      </div>

      <!-- prefix -->
      <div class="label-detail-sub">
        <span class="label-detail-label">Prefix:</span>
        <span class="label-detail-detail"> ${selectedLabel.prefix.name} - </span>
        <span class="label-detail-detail">${selectedLabel.prefix.type}</span>
      </div>
      
      <!-- version -->
      <div class="label-detail-sub">
        <span class="label-detail-label">Version:</span>
        <span class="label-detail-detail"> ${selectedLabel.version}</span>
      </div>

      <!-- desc -->
      <div class="label-detail-sub">
        <span class="label-detail-label">Description:</span>
        <div class="label-detail-detail" style="font-size:.8rem;" contenteditable="true"> ${selectedLabel.context}</div>
      </div>
      
      <!-- meta -->
      <div class="label-detail-sub">
        <span class="label-detail-label">Meta:</span>
        <span class="label-detail-detail">More stuff to read</span>
      </div>

    `;
  } else {
    return '';
  }

};

export default label_details;
