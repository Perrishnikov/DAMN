const images_list = (params) => {

  const {activePartcode, selectedImage, associatedImages = null} = params;

  // console.log(`activePartcode in imagea_list: ${activePartcode}`);
  // console.log(associatedImages);
  
  if (activePartcode) {
    const partcode = associatedImages && associatedImages.length > 0 ? associatedImages[0].partcode : '';
    // console.log(`partcode: ${partcode}`);
    const notMatched = partcode != activePartcode ? 'is-warning' : '' ;

    return `
      <div id="" class="flex-row">
        <div class="component-head">Image List for 
        <span>
          <svg class="navIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A7A7A" stroke-width="2" stroke-linecap="round" stroke-linejoin="bevel">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input id="imagelListSearch" class="${notMatched} listSearch" value="${activePartcode}"></input>
        </span>
        
        </div>
      </div>
      <div class="label-group">
        ${associatedImages ? associatedImages.map(image => {
          // console.log(label);
          const isSelected = selectedImage.name == image.name ? 'selected' : '';
  
          return `<div draggable="true" data-name=${image.name} class="component-item dnd-labelItem ${isSelected}">${image.name}</div>`;
        }).join('') : ``}

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

export default images_list;