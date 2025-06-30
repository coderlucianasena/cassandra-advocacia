(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== 'undefined') {
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  }

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    if (typeof imagesLoaded !== 'undefined' && typeof Isotope !== 'undefined') {
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });
    }
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    if (typeof Swiper !== 'undefined') {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );

        if (swiperElement.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      });
    }
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  // ===== TÍTULO ANIMADO (apenas para index.html) =====
  if (document.body.classList.contains('index-page') || window.location.pathname.endsWith('index.html')) {
    document.addEventListener("DOMContentLoaded", function () {
      var title = "Jucá Flexa Advogadas Associadas";
      var speed = 200;
      var index = 0;
      var isScrolling = true;

      function scrollTitle() {
        if (isScrolling) {
          document.title = title.substring(index) + " " + title.substring(0, index);
          index++;
          if (index > title.length) {
            isScrolling = false;
            setTimeout(resetTitle, 2000);
          } else {
            setTimeout(scrollTitle, speed);
          }
        }
      }

      function resetTitle() {
        document.title = title;
        index = 0;
        isScrolling = true;
        setTimeout(scrollTitle, 2000);
      }

      scrollTitle();
    });
  }

})();

// ===========================================
// CORREÇÕES MOBILE PARA main.js
// Adicionar ao arquivo main.js existente
// ===========================================

// Substituir ou adicionar as seguintes funções no main.js:

(function() {
  "use strict";

  // ===== INICIALIZAÇÃO DE VIEWPORT HEIGHT PARA MOBILE =====
  function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  // Inicializar no carregamento e mudanças de orientação
  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', () => {
    setTimeout(setViewportHeight, 100); // Pequeno delay para aguardar mudança
  });

  // ===== MOBILE NAV TOGGLE =====
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  function mobileNavToogle() {
    const body = document.querySelector('body');
    const navmenu = document.querySelector('.navmenu');
    const header = document.querySelector('.header');
    body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
    if (body.classList.contains('mobile-nav-active')) {
      body.style.overflow = 'hidden';
      if (header) header.style.zIndex = '10000';
    } else {
      body.style.overflow = '';
      if (header) header.style.zIndex = '';
    }
  }

  // Event listener para o botão de toggle
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  // ===== FECHAR MENU MOBILE EM VÁRIAS SITUAÇÕES =====
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', (e) => {
      const body = document.querySelector('body');
      if (body.classList.contains('mobile-nav-active')) {
        mobileNavToogle();
      }
      const href = navmenu.getAttribute('href');
      if (href && href.startsWith('#') && href !== '#') {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          setTimeout(() => {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;
            window.scrollTo({
              top: Math.max(0, targetPosition),
              behavior: 'smooth'
            });
          }, 300);
        }
      }
    });
  });
  document.addEventListener('click', (e) => {
    const body = document.querySelector('body');
    const navmenu = document.querySelector('.navmenu');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const header = document.querySelector('.header');
    if (body.classList.contains('mobile-nav-active')) {
      if (!navmenu.contains(e.target) && !mobileToggle.contains(e.target) && !header.contains(e.target)) {
        mobileNavToogle();
      }
    }
  });
  document.addEventListener('keydown', (e) => {
    const body = document.querySelector('body');
    if (e.key === 'Escape' && body.classList.contains('mobile-nav-active')) {
      mobileNavToogle();
    }
  });
  function handleScreenChange() {
    const body = document.querySelector('body');
    if (window.innerWidth >= 1200 && body.classList.contains('mobile-nav-active')) {
      body.classList.remove('mobile-nav-active');
      body.style.overflow = '';
      mobileNavToggleBtn.classList.add('bi-list');
      mobileNavToggleBtn.classList.remove('bi-x');
      const header = document.querySelector('.header');
      if (header) header.style.zIndex = '';
    }
  }
  window.addEventListener('resize', handleScreenChange);
  window.addEventListener('orientationchange', () => {
    const body = document.querySelector('body');
    if (body.classList.contains('mobile-nav-active')) {
      mobileNavToogle();
    }
    setTimeout(() => { setViewportHeight(); }, 100);
  });

  // ===== SCROLL HEADER MELHORADO =====
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader) return;
    if (!selectHeader.classList.contains('scroll-up-sticky') &&
        !selectHeader.classList.contains('sticky-top') &&
        !selectHeader.classList.contains('fixed-top')) return;
    const threshold = window.innerWidth <= 768 ? 30 : 100;
    if (window.scrollY > threshold) {
      selectBody.classList.add('scrolled');
      if (window.innerWidth <= 1199) {
        selectHeader.style.background = 'rgba(81, 28, 37, 0.98)';
      }
    } else {
      selectBody.classList.remove('scrolled');
      if (window.innerWidth <= 1199) {
        selectHeader.style.background = 'rgba(81, 28, 37, 0.95)';
      }
    }
  }
  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  // ===== SMOOTH SCROLL MELHORADO =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const header = document.querySelector('.header');
          const headerHeight = header ? header.offsetHeight : 80;
          const offset = window.innerWidth <= 768 ? 10 : 20;
          const targetPosition = target.offsetTop - headerHeight - offset;
          window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ===== PREVENÇÃO DE BOUNCE SCROLL NO IOS =====
  document.addEventListener('touchmove', function(e) {
    const body = document.querySelector('body');
    if (body.classList.contains('mobile-nav-active')) {
      const navmenu = document.querySelector('.navmenu ul');
      if (navmenu && !navmenu.contains(e.target)) {
        e.preventDefault();
      }
    }
  }, { passive: false });

  // ===== ANIMAÇÕES HERO MOBILE =====
  function initHeroAnimations() {
    if (window.innerWidth <= 768) {
      const heroElements = document.querySelectorAll('.hero h2, .hero p, .hero .btn-get-started');
      heroElements.forEach((element, index) => {
        if (element) {
          element.style.opacity = '0';
          element.style.transform = 'translateY(30px)';
          setTimeout(() => {
            element.style.transition = 'all 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }, 300 + (index * 200));
        }
      });
    }
  }
  window.addEventListener('load', () => {
    setTimeout(initHeroAnimations, 500);
  });

  // ===== DEBOUNCE =====
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  const debouncedScreenChange = debounce(handleScreenChange, 250);
  const debouncedViewportHeight = debounce(setViewportHeight, 250);
  window.addEventListener('resize', debouncedScreenChange);
  window.addEventListener('resize', debouncedViewportHeight);

  // ===== FIX IOS VIEWPORT =====
  function iosViewportFix() {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      const iosVh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${iosVh}px`);
      window.addEventListener('resize', () => {
        if (document.activeElement.tagName !== 'INPUT' &&
            document.activeElement.tagName !== 'TEXTAREA') {
          const newVh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${newVh}px`);
        }
      });
    }
  }
  iosViewportFix();

})();