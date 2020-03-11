const label_group_new = partcode => {
  if (partcode) {
    return `
    <div id="toggle_label_group_new" class="flex-row">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="bevel"><path d="M11 21H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h5l2 3h9a2 2 0 0 1 2 2v2M19 15v6M16 18h6"/></svg>
    
      <div>New Label Group (drag labels to add)</div>
    </div>
    
    <div id="newStuff" class="flex-col closed">
      <div class="flex-row newStuffItem">
        <span>Name:</span>
        <div contentEditable=true>placeholder</div>
      </div>
      <div class="flex-row newStuffItem">
        <span>Cartons:</span>
      </div>
      <div class="flex-row newStuffItem">Labels:</div>
      <div class="flex-row newStuffItem">Pouches:</div>
      <div class="flex-row newStuffItem">
        <button>submit</button>
        <button>reset</button>
      </div>
    </div>

  `;
  } else {
    return ``;
  }

};

export default label_group_new;