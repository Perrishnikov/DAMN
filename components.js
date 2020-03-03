export const compLabelName = name => {
  return `
    <div class="labelName">
    <span>${name}</span>
    </div>
  `;
};

export const compSearchResult = partcode => {
  return `
    <span>Active Partcode: </span>
    <div class="resultFound">
      <span>${partcode}</span>
      <svg class="navIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="bevel"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </div>
  `;
};

export const compNoSearchResult = message => {
  return `
    <div class="noResult">
      <svg class="navIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="bevel"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="8"></line></svg>
      <span>${message}</span>
    </div>
  `;
};

export const compNameBuilder = () => {
  return `
  <div>Name Builder</div>
  `;
};

export const compDataView = data => {
  const placeholder = document.createElement('div');
  const style = `
    position: absolute;
    background: lavender;
    padding: 8px;
    top: 55px;
    right: 15px;
    width: 100px;
    display:flex;
    flex-direction:column;
    font-size: 12px;
    border-radius:4px;
  `;

  const { partcodes } = data;
  // console.log([...data]);

  const html = `
    <div style="${style}"> 
      partcodes:\n
      ${[...partcodes].map(([key, value]) => {
    return `<div style="padding-left:4px;">${key}</div>`;
  }).join('')}
    </div>
  `;


  placeholder.innerHTML = html;

  return placeholder.firstElementChild;
};