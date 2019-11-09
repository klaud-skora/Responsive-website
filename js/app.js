import { dataSource } from './data.js';
import Link from './components/Link.js';
import Banner from './components/Banner.js';

const app = {
  
  initNavMenu: function() {
    const thisApp = this;
    console.log(thisApp);
    const hamburger = document.querySelector('.menu-trigger');
    const navMenu = document.querySelector('.horizontal_wrapper');
    const navMenuWrapper = document.querySelector('.sidebar');

    function toggleMenu(visible) {
      navMenu.classList.toggle('show', visible);
    }

    hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      toggleMenu();
      navMenuWrapper.classList.toggle('active');
    });
  },

  initLinks: function() {
    const thisApp = this;
  
    for (let link in thisApp.data.links) {
      new Link(link, thisApp.data.links[link]);
    } 
  },

  initBanners: function() {
    const thisApp = this;
  
    for (let banner in thisApp.data.banners) {
      new Banner(banner, thisApp.data.banners[banner]);
    } 
  },
  
  initData: function() {
    const thisApp = this;

    thisApp.data = dataSource;
    thisApp.initLinks();
    thisApp.initBanners();
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
  },
  activatePage: function(pageId) {
    const thisApp = this;

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

  activateModals: function() {

    function closeModal() {
      document.getElementById('overlay').classList.remove('show')
    }
    document.querySelectorAll('#overlay .js--close-modal').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
      });
    });
    document.querySelector('#overlay').addEventListener('click', function(e) {
      if(e.target === this) {
        closeModal();
      }
    });
    
    document.addEventListener('keyup', function(e) {
      if(e.keyCode === 27) {
        closeModal();
      }
    });
    
    function openModal(modal) {
      console.log('modal', modal);
      document.querySelectorAll('#overlay > modal').forEach(function(modal) {
        modal.classList.remove('show');
      });
    
      document.querySelector('#overlay').classList.add('show');
      console.log('modal', modal);
      modal.classList.add('show');
    }
    document.querySelectorAll('.btn-add-link').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const linksModal = document.querySelector('#links-modal');
        console.log(linksModal);
        openModal(linksModal);
      });
    });    
  },

  init: function() {
    const thisApp = this;
    
    thisApp.initNavMenu();
    thisApp.initData();
    thisApp.initPages();
    thisApp.activateModals();
  },
};

app.init();
