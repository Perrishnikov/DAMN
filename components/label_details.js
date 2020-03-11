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
      
      <!-- prefix -->
      <div class="labelDetailGroup">
        <div class="labelDetailSub">
          <span>Prefix:</span>
          <span></span>
          
        </div>
        
        <div class="labelDetailInfo">
          <span>${selectedLabel.prefix.desc}</span>
          <span>${selectedLabel.prefix.type}</span>
        </div>
      </div>
      
      <!-- version -->
      <div class="labelDetailGroup">
        <div class="labelDetailSub">
          <span>Version:</span>
          <input class="" id="labelDetailVersion" value="${selectedLabel.version}">
          <span></span>
        </div>
      </div>

      <!-- context -->
      <div class="labelDetailGroup">
        <div class="labelDetailSub">
          <span>Context:</span>
          <div id="labelDetailContext" contenteditable="true">
            ${selectedLabel.context}
          </div>
        </div>
      </div>

    `;
  } else {
    return '';
  }

};

export default label_details;