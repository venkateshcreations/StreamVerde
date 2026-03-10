/**
 * StreamVerde App — Notifications
 * app/js/notifications.js
 */

'use strict';

window.Notifications = {

  _panel: null,
  _isOpen: false,

  init () {
    this._panel = document.getElementById('notifPanel');
    const toggleBtn = document.getElementById('notifToggle');
    if (toggleBtn) toggleBtn.addEventListener('click', (e) => { e.stopPropagation(); this.toggle(); });
  },

  toggle () {
    this._isOpen = !this._isOpen;
    if (this._panel) this._panel.classList.toggle('open', this._isOpen);
  },

  close () {
    this._isOpen = false;
    if (this._panel) this._panel.classList.remove('open');
  },

  open () {
    this._isOpen = true;
    if (this._panel) this._panel.classList.add('open');
  },
};

// Expose for inline onclick compatibility
window.toggleNotif = () => Notifications.toggle();
