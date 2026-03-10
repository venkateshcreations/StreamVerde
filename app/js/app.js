/**
 * StreamVerde App — Bootstrap & State
 * app/js/app.js
 */

'use strict';

window.App = {
  /* ── Session state ── */
  state: {
    isLoggedIn:  false,
    isAdmin:     false,
    user: {
      id:       null,
      name:     '',
      email:    '',
      role:     'Subscriber',
      plan:     'Pro',
      avatar:   '👤',
    },
  },

  /* ── Bootstrap ── */
  init () {
    Auth.init();
    Sidebar.init();
    Notifications.init();
    Router.init();

    // Global filter-button handler
    document.addEventListener('click', e => {
      const btn = e.target.closest('.sf-btn, .filter-btn');
      if (!btn) return;
      const group = btn.closest('.search-filters, .vod-filters');
      if (group) {
        group.querySelectorAll('.sf-btn, .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
    });

    // Close notif on outside click
    document.addEventListener('click', e => {
      const panel = document.getElementById('notifPanel');
      if (!panel) return;
      if (panel.classList.contains('open') && !panel.contains(e.target) && !e.target.closest('#notifToggle')) {
        panel.classList.remove('open');
      }
    });

    // Close on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) Sidebar.close();
    });
  },
};

document.addEventListener('DOMContentLoaded', () => App.init());
