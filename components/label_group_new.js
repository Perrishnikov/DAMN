const weHaveLabels = labels => {

    return `
    ${[...labels].map(([key, value]) => {
      // console.log(value);
      return `
      <div>${value.context}</div>
      `;
    }).join('')}`;

  // return `
  //   ${labels.map(label => {

  //     return `
  //     <div>${label.context}</div>
  //     `;
  //   }).join('')}

  //   <div id="" class="flex-col">
  //     <div class="flex-row newStuffItem">
  //       <button>submit</button>
  //       <button>reset</button>
  //     </div>
  //   </div>
  // `;
};


const label_group_new = (partcode, pendingLabelGroup) => {
  if (partcode) {
    return `
    <div id="" class="flex-row">

      <svg class="component-head-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="bevel"><path d="M11 21H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h5l2 3h9a2 2 0 0 1 2 2v2M19 15v6M16 18h6"/></svg>
    
      <div class="component-head">New Label Group</div>
    </div>

    ${pendingLabelGroup ? weHaveLabels(pendingLabelGroup) : ''}

  `;
  } else {
    return ``;
  }

};

export default label_group_new;