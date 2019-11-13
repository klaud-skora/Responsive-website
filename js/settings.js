/* global Handlebars */

export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    link: 'link',
    event: 'event',
  },
};

export const templates = {
  listOfLinks: Handlebars.compile(document.querySelector('#template-links').innerHTML),
  payoutList: Handlebars.compile(document.querySelector('#template-payout-data').innerHTML),
  detailsList: Handlebars.compile(document.querySelector('#template-details').innerHTML),
};