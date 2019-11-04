//import { settings } from './settings.js';
import { dataSource } from './data.js';
import Link from './components/Link.js';

const app = {
  
  initLinks: function() {
    const thisApp = this;
  
    for (let link in thisApp.data.links) {
      new Link(link, thisApp.data.links[link]);
    } 

  },
  
  initData: function() {
    const thisApp = this;

    thisApp.data = dataSource;
    thisApp.initLinks();
  },

  initPages: function() {
    const thisApp = this;
    
    thisApp.pages = document.querySelector('#pages').children;
    //console.log('thisApp.pages', thisApp.pages);
    thisApp.navLinks = document.querySelectorAll('.nav_container a');
    
    const idFromHash = window.location.hash.replace('#/', '');
    
    let pageMatchingHash =  thisApp.pages[0].id;
    
    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }
    
    thisApp.activatePage(pageMatchingHash);
    
    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function(event) {
        const clickedElement = this;
        event.preventDefault();
    
        /* get page id from href attribute */
        const id = clickedElement.getAttribute('href').replace('#',  '');
    
        /* run thisApp.activatePage with that id */
        thisApp.activatePage(id);
    
        /* change URL hash */
        window.location.hash = '#/' + id;
      });
    }
    /*
    thisApp.homePage.addEventListener('click', function(event) {
      const clickedElement = this;
      event.preventDefault();
    
      const id = clickedElement.getAttribute('href').replace('#',  '');
      thisApp.activatePage(id);
      window.location.hash = '#/' + id;
    });
    */
  },
  activatePage: function(pageId) {
    const thisApp = this;

    console.log('aktywujemy pejdz', pageId);
    /* add class "active" to matching pages, remove from non-matching */
    for (let page of thisApp.pages) {
      page.classList.toggle('active', page.id == pageId);
      if (pageId == 'general' && page.id == 'links') {
        page.classList.toggle('active');
      }
    }


    /* add class "active" to matching links, remove from non-matching */
    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        'active',
        link.getAttribute('href') == '#' + pageId);
    }
  },


  init: function() {
    const thisApp = this;
    
    thisApp.initData();
    thisApp.initPages();
  },
};

app.init();