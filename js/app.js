import { dataSource } from './data.js';
import Link from './components/Link.js';
import Banner from './components/Banner.js';
import Payout from './components/Payout.js';
import Detail from './components/Detail.js';

const app = {

  initQuitAlert: function() {
    document.getElementById('quit').addEventListener('click', function(e) {
      e.preventDefault();
      window.alert('Successfully logged out.');
    });
  },
  
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

  initPayout: function() {
    const thisApp = this;

    const payoutAmount = thisApp.data.payout.length / 9;
    const navNumbs = document.querySelectorAll('.payoutNavNumber');
    let start = 1;
    let end = start + payoutAmount;

    for (let pay in thisApp.data.payout.slice(start, end)) {
      new Payout(pay, thisApp.data.payout[pay]);
    } 

    for (let navNumb of navNumbs) {
      if (navNumb.id == 1) {
        navNumb.classList.add('active');
      }
    }
    thisApp.updatePayout();
  },

  updatePayout: function() {
    const thisApp = this;

    const payoutAmount = thisApp.data.payout.length / 9;
    const navNumbs = document.querySelectorAll('.payoutNavNumber');
    const payoutContainer = document.querySelector('#payout-content');
    
    const arrowLeft = document.querySelector('.payout_left');
    const arrowRight = document.querySelector('.payout_right');

    let start; 
    let end;

    arrowLeft.addEventListener('click', function(e) {
      e.preventDefault();

      const activeNumb = document.querySelector('.payoutNavNumber.active');

      for (let navNumb of navNumbs) {
        if (navNumb.id == (activeNumb.id - 1)) {
          navNumb.click(event);
        }
      }
    });

    arrowRight.addEventListener('click', function(e) {
      e.preventDefault();

      const activeNumb = document.querySelector('.payoutNavNumber.active');

      for (let navNumb of navNumbs) {
        const newNumb = parseInt(activeNumb.id) + 1;

        if (navNumb.id == newNumb) {

          navNumb.click(event);
        }
      }
    });

    for (let navNumb of navNumbs) {
      navNumb.addEventListener('click', function(e) {
        e.preventDefault();
        for (let navNumb of navNumbs) {
          navNumb.classList.remove('active');
        }
        navNumb.classList.add('active');

        if (navNumb.id == 1) {
          start = 1;
          end = payoutAmount + 1;
        } else {
          for ( let i = 2; i < 10; i++) {
            if (navNumb.id == i ) {
              start = (i - 1) * payoutAmount + 1;
            }
          }
          end =  start + payoutAmount;      
        } 

        payoutContainer.innerHTML = '';
        for (let pay in thisApp.data.payout.slice(start, end)) {
          new Payout(pay, thisApp.data.payout.slice(start, end)[pay]);
        } 
      });
    }
  },

  
  initDetails: function() {
    const thisApp = this;
  
    const detailsAmount = thisApp.data.details.length / 9;
    const navNumbs = document.querySelectorAll('.detailsNavNumber');
    let start = 1;
    let end = start + detailsAmount;
  
    for (let detail in thisApp.data.details.slice(start, end)) {
      console.log('detail', detail);
      new Detail(detail, thisApp.data.details[detail]);
    } 
    
    for (let navNumb of navNumbs) {
      if (navNumb.id == 1) {
        navNumb.classList.add('active');
      }
    }
    thisApp.updateDetails();
  },
  
  updateDetails: function() {
    const thisApp = this;

    const detailsAmount = thisApp.data.details.length / 9;
    const navNumbs = document.querySelectorAll('.detailsNavNumber');
    const detailsContainer = document.querySelector('#details-content');
    
    const arrowLeft = document.querySelector('.details_left');
    const arrowRight = document.querySelector('.details_right');

    let start; 
    let end;

    arrowLeft.addEventListener('click', function(e) {
      e.preventDefault();

      const activeNumb = document.querySelector('.detailsNavNumber.active');

      for (let navNumb of navNumbs) {
        if (navNumb.id == (activeNumb.id - 1)) {
          navNumb.click(event);
        }
      }
    });

    arrowRight.addEventListener('click', function(e) {
      e.preventDefault();

      const activeNumb = document.querySelector('.detailsNavNumber.active');

      for (let navNumb of navNumbs) {
        const newNumb = parseInt(activeNumb.id) + 1;

        if (navNumb.id == newNumb) {
          navNumb.click(event);
        }
      }
    });

    for (let navNumb of navNumbs) {
      navNumb.addEventListener('click', function(e) {
        e.preventDefault();
        for (let navNumb of navNumbs) {
          navNumb.classList.remove('active');
        }
        navNumb.classList.add('active');

        if (navNumb.id == 1) {
          start = 1;
          end = detailsAmount + 1;
        } else {
          for ( let i = 2; i < 10; i++) {
            if (navNumb.id == i ) {
              start = (i - 1) * detailsAmount + 1;
            }
          }
          end =  start + detailsAmount;      
        } 

        detailsContainer.innerHTML = '';
        for (let detail in thisApp.data.details.slice(start, end)) {
          new Detail(detail, thisApp.data.details.slice(start, end)[detail]);
        } 
      });
    }
  },
  
  initData: function() {
    const thisApp = this;

    thisApp.data = dataSource;
  
    thisApp.initLinks();
    thisApp.initBanners();
    thisApp.initPayout();
    thisApp.initDetails();
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

  activateModal: function() {
    const thisApp = this;

    function closeModal() {
      document.getElementById('overlay').classList.remove('show');
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
      document.querySelectorAll('#overlay > *').forEach(function(modal) {
        modal.classList.remove('show');
      });
    
      document.querySelector('#overlay').classList.add('show');
      modal.classList.add('show');
    }

    /* listener for links */
    document.querySelectorAll('.btn-add-link').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const linksModal = document.querySelector('#links-modal');
        openModal(linksModal);
      });
    }); 

    /* listener for banners */
    document.querySelectorAll('.btn-add-banner').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const bannersModal = document.querySelector('#banners-modal');
        openModal(bannersModal);
      });
    }); 

    /* listener for quit */
    document.querySelectorAll('.icon-quit').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const quitModal = document.querySelector('#quit-modal');
        openModal(quitModal);
        thisApp.initQuitAlert();
      });
    });

    /*listener for login */
    document.querySelectorAll('.icon-login').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const quitModal = document.querySelector('#login-modal');
        openModal(quitModal);
      });
    });

    /* listener for message */
    document.querySelectorAll('.admin_photo').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const messageModal = document.querySelector('#message-modal');
        openModal(messageModal);
      });
    });
  },

  init: function() {
    const thisApp = this;
    
    thisApp.initNavMenu();
    thisApp.initData();
    thisApp.initPages();
    thisApp.activateModal();
  },
};

app.init();
