const label_group_active = label => {

  if (label) {
    return `
      <div>Active Label Group: </div>
      <div class="">${label.groupName}</div>
    `;
  } else {
    return `
    <div class="">
      <span>${''}</span>
    </div>
    `;
  }
};

export default label_group_active;