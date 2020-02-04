import { dataSource } from './data.js';
import Link from './components/Link.js';
import Banner from './components/Banner.js';
import Payout from './components/Payout.js';
import Detail from './components/Detail.js';
/* global Chart */

const app = {

  /* dynamic render for diagram */
  initCanvas: function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    
    var chart = new Chart(ctx, {
      // 1
      type: 'bar',
      data: {
        // 2
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
        // 3
        datasets: [{
          // 4
          label: 'Signups',
          // 5
          backgroundColor: '#8DBEC8',
          borderColor: '#8DBEC8',
          // 6
          data: [ 52, 51, 41, 94, 26, 6, 72, 9, 21, 88 ],
        },
        {
          label: 'FTD',
          backgroundColor: '#F29E4E',
          borderColor: '#F29E4E',
          data: [ 6, 72, 1, 0, 47, 11, 50, 44, 63, 76 ],
        },
        {
          label: 'Earned',
          backgroundColor: '#71B374',
          borderColor: '#71B374',
          data: [ 59, 49, 68, 90, 67, 41, 13, 38, 48, 48 ],
          // 7
          hidden: true,
        }]
      },
    });
    console.log(chart);
  },

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
    const navMenuTrigger = document.querySelector('.hamburger-info');
    const navLink = document.querySelectorAll('.nav_section');

    for(let link of navLink) {
      link.addEventListener('click', function() {
        navMenuTrigger.classList.add('active');
      });
    }

    function toggleMenu(visible) {
      navMenu.classList.toggle('show', visible);
    }

    hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      toggleMenu();
      navMenuTrigger.classList.toggle('active');
      navMenuWrapper.classList.toggle('active'); 
    });

    function showMenu() {
      toggleMenu();
      navMenuTrigger.classList.toggle('active');
      navMenuWrapper.classList.toggle('active');
    }

    navMenuTrigger.addEventListener('click', function(e) {
      e.preventDefault();
      showMenu();
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
    let start = 0;
    let end = payoutAmount;

    for (let pay in thisApp.data.payout.slice(start, end)) {
      new Payout(pay, thisApp.data.payout[pay]);
    } 

    for (let navNumb of navNumbs) {
      if (navNumb.textContent == 1) {
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
      console.log(activeNumb);

      for (let navNumb of navNumbs) {
        if (navNumb.textContent == (activeNumb.textContent - 1)) {
          navNumb.click(event);
        }
      }
    });

    arrowRight.addEventListener('click', function(e) {
      e.preventDefault();

      const activeNumb = document.querySelector('.payoutNavNumber.active');

      for (let navNumb of navNumbs) {
        const newNumb = parseInt(activeNumb.textContent) + 1;

        if (navNumb.textContent == newNumb) {

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

        if (navNumb.textContent == 1) {
          start = 0;
          end = payoutAmount;
        } else {
          for ( let i = 2; i < 10; i++) {
            if (navNumb.textContent == i) {
              start = (i - 1) * payoutAmount;
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
    let start = 0;
    let end = detailsAmount;
  
    for (let detail in thisApp.data.details.slice(start, end)) {
      new Detail(detail, thisApp.data.details[detail]);
    } 
    
    for (let navNumb of navNumbs) {
      if (navNumb.textContent == 1) {
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
        if (navNumb.textContent == (activeNumb.textContent - 1)) {
          navNumb.click(event);
        }
      }
    });

    arrowRight.addEventListener('click', function(e) {
      e.preventDefault();

      const activeNumb = document.querySelector('.detailsNavNumber.active');

      for (let navNumb of navNumbs) {
        const newNumb = parseInt(activeNumb.textContent) + 1;

        if (navNumb.textContent == newNumb) {
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

        if (navNumb.textContent == 1) {
          start = 0;
          end = detailsAmount;
        } else {
          for ( let i = 2; i < 10; i++) {
            if (navNumb.textContent == i ) {
              start = (i - 1) * detailsAmount;
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

        const navMenu = document.querySelector('.horizontal_wrapper');
        const navMenuWrapper = document.querySelector('.sidebar');

        function toggleMenu(visible) {
          navMenu.classList.toggle('show', visible);
        }
    
        toggleMenu();
        navMenuWrapper.classList.toggle('active');
    
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
    console.log(thisApp);

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
    thisApp.initCanvas();
    thisApp.initQuitAlert();
  },
};

app.init();
