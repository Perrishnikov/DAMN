const CONST = {
  SEARCH_NO_ACTIVE: 'No active partcode',
  SEARCH_NOT_FOUND: 'Not found. Add a new partcode to database?',
  NO_LABEL_HISTORY: 'No label history'
};



const activePartcodeHistory = lables => {

  console.log(lables);
  if (lables.length > 1) {
    return `
    
    ${[...lables].map(label => {
      // console.log(label);
      return `<div data-name=${label.prefix.name}${label.partcode}.${label.version} class="labelHistoryItem">${label.name}</div>`;
    }).join('')}
    `;
  } else {
    return `
    <div class="labelHistoryItem">
      <span>${''}</span>
    </div>
    `;
  }

};


const activeLabelName = label => {
  return `
    <div class="">
    <span>${label && label.name ? label.name : ''}</span>
    </div>
  `;
};


const activePartcode = partcode => {

  if (partcode) {
    return `
    <span>Active Partcode: </span>
    <div data-removeActivePartcode class="resultFound">
      <span>${partcode}</span>
      <svg class="navIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="bevel"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </div>
  `;
  } else {
    return `
    <div class="noResult">
      <svg class="navIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="bevel"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="8"></line></svg>
      <span>${CONST.SEARCH_NO_ACTIVE}</span>
    </div>
  `;
  }
};


const compDataView = data => {
  const placeholder = document.createElement('div');
  const style = `
    position: absolute;
    background: lavender;
    padding: 8px;
    top: 55px;
    right: 15px;
    width: 100px;
    display:flex;
    flex-direction:column;
    font-size: 12px;
    border-radius:4px;
  `;

  const { partcodes } = data;
  // console.log([...data]);

  const html = `
    <div style="${style}"> 
      partcodes:\n
      ${[...partcodes].map(([key, value]) => {
    return `<div style="padding-left:4px;">${key}</div>`;
  }).join('')}
    </div>
  `;

  placeholder.innerHTML = html;

  return placeholder.firstElementChild;
};


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

const labelDetails = (params) => {
  const { activeLabel } = params;

  if (activeLabel) {
    return `
      
      <!-- prefix -->
      <div class="labelDetailGroup">
        <div class="labelDetailSub">
          <span>Prefix:</span>
          
          ${selectForPrefix(params)}
        </div>
        
        <div class="labelDetailInfo">
          <span>${activeLabel.prefix.desc}</span>
          <span>${activeLabel.prefix.type}</span>
        </div>
      </div>
      
      <!-- version -->
      <div class="labelDetailGroup">
        <div class="labelDetailSub">
          <span>Version:</span>
          <input class="" id="labelDetailVersion" value="${activeLabel.version}">
          <span></span>
        </div>
      </div>

      <!-- context -->
      <div class="labelDetailGroup">
        <div class="labelDetailSub">
          <span>Context:</span>
          <div id="labelDetailContext" contenteditable="true">
            ${activeLabel.context}
          </div>
        </div>
      </div>

    `;
  } else {
    return '';
  }
};


const component = {
  activeLabelName,
  dataView: compDataView,
  activePartcode,
  activePartcodeHistory,
  labelDetails,
};

export default component;
