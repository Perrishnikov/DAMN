const label_group_list = labelGroups => {

  if (labelGroups.length > 1) {
    return `
    <div>Label Group List: </div>
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

export default label_group_list;

