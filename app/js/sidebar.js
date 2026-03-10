/**
 * StreamVerde App — Sidebar
 * app/js/sidebar.js
 */

'use strict';

window.Sidebar = {

  _sidebar: null,
  _overlay: null,
  _hamburger: null,

  init () {
    this._sidebar   = document.getElementById('sidebar');
    this._overlay   = document.getElementById('sidebarOverlay');
    this._hamburger = document.getElementById('hamburgerApp');

    if (this._overlay) {
      this._overlay.addEventListener('click', () => this.close());
    }
    if (this._hamburger) {
      this._hamburger.addEventListener('click', () => this.toggle());
    }

    const closeBtn = document.getElementById('sidebarClose');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
  },

  toggle () {
    if (!this._sidebar) return;
    const isOpen = this._sidebar.classList.contains('open');
    isOpen ? this.close() : this.open();
  },

  open () {
    this._sidebar   && this._sidebar.classList.add('open');
    this._overlay   && this._overlay.classList.add('open');
    this._hamburger && this._hamburger.classList.add('open');
  },

  close () {
    this._sidebar   && this._sidebar.classList.remove('open');
    this._overlay   && this._overlay.classList.remove('open');
    this._hamburger && this._hamburger.classList.remove('open');
  },
};

// Expose for inline onclick compatibility
window.toggleSidebar = () => Sidebar.toggle();
window.closeSidebar  = () => Sidebar.close();
