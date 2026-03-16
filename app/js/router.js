/**
 * StreamVerde App — Router (SPA page switcher)
 * app/js/router.js
 */

'use strict';

window.Router = {

  PAGE_TITLES: {
    'home':              'Home',
    'live':              'Live TV',
    'tv-player':         'TV Player',
    'epg':               'EPG Guide',
    'movies':            'Movies',
    'series':            'Series',
    'search':            'Search',
    'dvr':               'Cloud DVR',
    'catchup':           'Catch-Up TV',
    'profile':           'Profile',
    'settings':          'Settings',
    'admin-dashboard':   'Dashboard',
    'admin-users':       'User Management',
    'admin-channels':    'Channels',
    'admin-vod':         'VOD Library',
    'admin-payments':    'Payments',
    'admin-analytics':   'Analytics',
    'admin-ads':         'Advertising',
    'admin-settings':    'System Settings',
  },

  _current: null,

  init () {
    // Nothing to init for SPA – pages are in DOM
  },

  goto (page, triggerEl) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // Show target
    const target = document.getElementById('page-' + page);
    if (target) target.classList.add('active');

    // Update nav highlight
    this._highlightNav(page, triggerEl);

    // Update topbar title
    const titleEl = document.getElementById('topbarTitle');
    if (titleEl) titleEl.textContent = this.PAGE_TITLES[page] || page;

    this._current = page;

    // Close sidebar on mobile after nav
    if (window.innerWidth <= 768) Sidebar.close();
  },

  _highlightNav (page, triggerEl) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    if (triggerEl) {
      triggerEl.classList.add('active');
    } else {
      // Find matching nav item
      document.querySelectorAll('.nav-item').forEach(i => {
        const onclick = i.getAttribute('onclick') || '';
        if (onclick.includes("'" + page + "'")) i.classList.add('active');
      });
    }
  },

  current () { return this._current; },
};

// Expose navTo for inline onclick compatibility
window.navTo = (page, btn) => Router.goto(page, btn);
