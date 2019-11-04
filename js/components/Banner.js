import { templates } from '../settings.js';
import utils from '../utils.js';

class Banner {
  constructor(name, link) {
    const thisBanner = this;

    thisBanner.name = name;
    thisBanner.link = link;


    thisBanner.renderInBanner();
  }
  renderInBanner() {
    const thisBanner = this;

    const generatedHTML = templates.listOfLinks(thisBanner.link);
    thisBanner.element = utils.createDOMFromHTML(generatedHTML);
    
    const bannersContainer = document.querySelector('#bannersList');
    bannersContainer.appendChild(thisBanner.element);
  }
}
export default Banner;