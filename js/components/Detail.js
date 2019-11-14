import { templates } from '../settings.js';
import utils from '../utils.js';

class Detail {
  constructor(name, data) {
    const thisDetail = this;
    
    thisDetail.name = name;
    thisDetail.data = data;

    thisDetail.renderInList();
  }

  renderInList() {
    const thisDetail = this;

    const generatedHTML = templates.detailsList(thisDetail.data);
    
    thisDetail.element = utils.createDOMFromHTML(generatedHTML);
    
    const detailContainer = document.querySelector('#details-content');
    //console.log('detailcontainer', detailContainer);
    
    detailContainer.appendChild(thisDetail.element);
  } 
}

export default Detail;