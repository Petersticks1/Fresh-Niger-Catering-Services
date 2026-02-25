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

  // Search box toggle and logic
  const searchBtn = document.querySelector('.search-btn');
  const searchBox = document.querySelector('.search-box');
  const closeSearch = document.querySelector('.search-box .close-btn');
  const searchInput = document.querySelector('.search-bar-inner input');

  // Create results container if it doesn't exist
  let resultsContainer = document.querySelector('.search-results');
  if (!resultsContainer && searchBox) {
    resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    document.querySelector('.search-box-container').appendChild(resultsContainer);
  }

  if (searchBtn && searchBox) {
    searchBtn.addEventListener('click', function () {
      searchBox.classList.add('active');
      searchBox.classList.add('show'); // Support both classes
      setTimeout(() => searchInput.focus(), 300);
    });

    const hideSearch = function () {
      searchBox.classList.remove('active');
      searchBox.classList.remove('show');
      if (resultsContainer) resultsContainer.classList.remove('active');
      if (searchInput) searchInput.value = '';
    };

    if (closeSearch) closeSearch.addEventListener('click', hideSearch);

    // Close on background click (if not on container)
    searchBox.addEventListener('click', function (e) {
      if (e.target === searchBox) hideSearch();
    });

    // Search logic
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase().trim();

        if (query.length < 2) {
          resultsContainer.classList.remove('active');
          return;
        }

        // Search in searchData (assuming search-data.js is loaded)
        if (typeof searchData !== 'undefined') {
          const results = searchData.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
          ).slice(0, 8); // Limit to 8 results

          renderResults(results);
        }
      });

      // Handle Enter key
      searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          const query = this.value.toLowerCase().trim();
          const firstResult = searchData.find(item =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
          );
          if (firstResult) {
            window.location.href = firstResult.url;
          }
        }
      });
    }
  }

  function renderResults(results) {
    if (results.length === 0) {
      resultsContainer.innerHTML = '<div class="search-result-item"><p>No results found for your search.</p></div>';
    } else {
      resultsContainer.innerHTML = results.map(item => `
        <a href="${item.url}" class="search-result-item">
          <span class="category">${item.category}</span>
          <h5>${item.title}</h5>
          <p>${item.description}</p>
        </a>
      `).join('');
    }
    resultsContainer.classList.add('active');
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
