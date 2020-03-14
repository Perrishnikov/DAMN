export const add_new_partcode = partcode => {
  return `
  <div id="new_active_partcode" class="navMessage is-warning">
    
    <div class="navMessage-head">"${partcode}" does not exist. Would you like to add it to the database?</div>
    
    <div class="flex-row button-box">
      <a class="button is-primary is-outlined" data-createPartcode="${partcode}" id="createPartcode">Create Partcode</a>
      <a class="button is-primary is-outlined" id="cancelPartcode">Cancel</a>
    </div>   

  </div>
  `;
};


const nav = ({activePartcode = null, newPartcode = null}) => {
  const partcode = activePartcode ? activePartcode : 
    newPartcode ? newPartcode : '';

    const activeBackground = activePartcode ? `is-primary`: ``;

  return`
    <div class="nav-left">
      <span>DAMN
        <span class="nav-subtitle">Digital Asset Manager Names</span>
      </span>
    </div>

    <div class="nav-center ${activeBackground}">
      <svg class="navIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A7A7A" stroke-width="2" stroke-linecap="round" stroke-linejoin="bevel">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input class="nav-search ${activeBackground}" id="searchInput" value="${partcode}" placeholder="search for partcode">
      <div class="navIcon"></div>
    </div>

    <div class="nav-right">
      <div class="nav-link">Help</div>
      <div class="nav-link">Perry as Admin</div>
    </div>

    ${newPartcode ? add_new_partcode(newPartcode) : ``}
    
  `;
};

export default nav;