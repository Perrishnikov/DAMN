const label_group_history = labelGroups => {

  if (labelGroups.length > 1) {
    return `
    <div>Label Group History: </div>
    ${[...labelGroups].map(group => {
      // console.log(group);
      return `<div class="">${group.groupName}</div>`;
    }).join('')}
    `;
  } else {
    return `
    <div class="">
      <span>${''}</span>
    </div>
    `;
  }
};

export default label_group_history;