import { templates } from '../settings.js';
import utils from '../utils.js';

class Payout {
  constructor(name, data) {
    const thisPayout = this;

    thisPayout.name = name;
    thisPayout.data = data;
    console.log('data', thisPayout.data);

    thisPayout.renderInList();
  }

  renderInList() {
    const thisPayout = this;

    const generatedHTML = templates.payoutList(thisPayout.data);
    
    thisPayout.element = utils.createDOMFromHTML(generatedHTML);
    
    const payoutContainer = document.querySelector('#payout-content');
    
    payoutContainer.appendChild(thisPayout.element);
  } 
}

export default Payout;