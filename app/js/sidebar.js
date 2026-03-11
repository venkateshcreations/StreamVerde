/**
 * StreamVerde App — Sidebar
 * app/js/sidebar.js
 *
 * Desktop: toggle body.sidebar-collapsed (icon-rail ↔ full)
 * Mobile:  slide-in overlay via sidebar.open class
 */

'use strict';

window.Sidebar = {

  _sidebar:   null,
  _overlay:   null,
  _isMobile() { return window.innerWidth <= 768; },

  init () {
    this._sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
    this._overlay = document.getElementById('sidebarOverlay') || document.querySelector('.sidebar-overlay');

    // Overlay closes mobile sidebar
    if (this._overlay) {
      this._overlay.addEventListener('click', () => this.close());
    }

    // Handle window resize — sync state
    window.addEventListener('resize', () => {
      if (!this._isMobile()) {
        // On desktop: remove mobile open class and overlay
        this._sidebar && this._sidebar.classList.remove('open');
        this._overlay && this._overlay.classList.remove('open');
      }
    });
  },

  toggle () {
    if (this._isMobile()) {
      // Mobile: slide-in overlay behaviour
      const isOpen = this._sidebar && this._sidebar.classList.contains('open');
      isOpen ? this.close() : this.open();
    } else {
      // Desktop: collapse/expand rail
      document.body.classList.toggle('sidebar-collapsed');
    }
  },

  open () {
    this._sidebar && this._sidebar.classList.add('open');
    this._overlay && this._overlay.classList.add('open');
  },

  close () {
    this._sidebar && this._sidebar.classList.remove('open');
    this._overlay && this._overlay.classList.remove('open');
  },
};

// Expose for inline onclick compatibility
window.toggleSidebar = () => Sidebar.toggle();
window.closeSidebar  = () => Sidebar.close();
