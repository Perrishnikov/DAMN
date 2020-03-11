const CONST = {
  SEARCH_NO_ACTIVE: 'No active partcode',
  SEARCH_NOT_FOUND: 'Not found',
};


export const active_partcode = partcode => {

  if (partcode) {
    return `
    <div class="flex-row">
      <span>Active Partcode: </span>
      <div data-removeActivePartcode class="resultFound">
        <span>${partcode}</span>
        <svg class="navIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="bevel"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </div>
    </div>
    
  `;
  } else {
    return `
    <div class="flex-row">
      <span>Active Partcode: </span>
      <div class="noResult">
        <span>${CONST.SEARCH_NO_ACTIVE}</span>
      </div>
    </div>
  `;
  }
};

export const add_new_partcode = partcode => {

  return`
  <div class="flex-row">
    <span>Active Partcode: </span>
    <div class="flex-row new_partcode_box">
      <span class="">${CONST.SEARCH_NOT_FOUND}</span>
      <div class="newPartcodeButton">
        <svg class="navIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="bevel"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> 
        <span>${partcode}</span>
      </div>
    </div>
  </div>

  `;
}

{/* <svg class="" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="bevel"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> */}
// export active_partcode;