/**
 * Fresh Niger – main.js
 * Navigation toggle, smooth scrolling, search, UI interactions
 */
(function () {
  'use strict';

  // Preloader
  window.addEventListener('load', function () {
    var preloader = document.querySelector('.cat-preloader');
    if (preloader) preloader.style.display = 'none';
  });

  // Mobile menu toggle
  var menuBtn = document.querySelector('.menu-btn');
  var mainMenu = document.querySelector('.main-menu');
  if (menuBtn && mainMenu) {
    menuBtn.addEventListener('click', function () {
      menuBtn.classList.toggle('active');
      mainMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }

  // Search box toggle
  var searchBtn = document.querySelector('.search-btn');
  var searchBox = document.querySelector('.search-box');
  var closeSearch = document.querySelector('.search-box .close-btn');
  if (searchBtn && searchBox) {
    searchBtn.addEventListener('click', function () { searchBox.classList.add('active'); });
    if (closeSearch) closeSearch.addEventListener('click', function () { searchBox.classList.remove('active'); });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll to top button visibility
  var scrollTopBtn = document.querySelector('.scroll-to-topp');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      scrollTopBtn.classList.toggle('visible', window.pageYOffset > 300);
    });
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
