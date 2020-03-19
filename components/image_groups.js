const image_groups = (params) => {
  const { activePartcode } = params;

  if (activePartcode) {

    return `
      <div id="" class="flex-row">
        <div class="component-head">Images Groups 
        </div>
      </div>
      `;
  } else {
    return `
      <div class="">
        <span>${''}</span>
      </div>
      `;
  }
};

export default image_groups;