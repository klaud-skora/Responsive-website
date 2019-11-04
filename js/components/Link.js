import { templates } from '../settings.js';
import utils from '../utils.js';

class Link {
  constructor(name, link) {
    const thisLink = this;

    thisLink.name = name;
    thisLink.link = link;

    thisLink.renderInList();
  }

  renderInList() {
    const thisLink = this;

    const generatedHTML = templates.listOfLinks(thisLink.link);
    
    thisLink.element = utils.createDOMFromHTML(generatedHTML);
    
    const linksContainer = document.querySelector('#linksList');
    linksContainer.appendChild(thisLink.element);
  } 
}

export default Link;