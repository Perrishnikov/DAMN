const label_new = partcode => {
  if (partcode) {
    return `
    <div class="flex-row">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="bevel">
      <path d="M20 11.08V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h6" />
      <path d="M14 3v5h5M18 21v-6M15 18h6" /></svg>
    
      <div>Drag and Drop Label/Carton/Pouch</div>
    </div>

  `;
  } else {
    return ``;
  }

};

export default label_new;