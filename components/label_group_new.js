const label_group_new = partcode => {
  if (partcode) {
    return `
    <div id="toggle_label_group_new" class="flex-row">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="bevel"><path d="M3 3h18v18H3zM12 8v8m-4-4h8"/></svg>
    
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