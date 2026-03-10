/**
 * StreamVerde App — Authentication
 * app/js/auth.js
 */

'use strict';

window.Auth = {

  init () {
    // Tab switches
    document.querySelectorAll('.auth-tab').forEach(tab => {
      tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
    });

    // Role selector
    document.querySelectorAll('.role-opt').forEach(opt => {
      opt.addEventListener('click', () => this.selectRole(opt));
    });

    // Sign-in form
    const signinForm = document.getElementById('signinForm');
    if (signinForm) signinForm.addEventListener('submit', e => { e.preventDefault(); this.login(); });

    // Sign-up form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) signupForm.addEventListener('submit', e => { e.preventDefault(); this.register(); });

    // Social buttons
    document.querySelectorAll('.btn-social').forEach(btn => {
      btn.addEventListener('click', () => this.login('social'));
    });
  },

  switchTab (tab) {
    document.getElementById('signin-card').style.display = tab === 'signin' ? '' : 'none';
    document.getElementById('signup-card').style.display = tab === 'signup' ? '' : 'none';
    document.querySelectorAll('.auth-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tab);
    });
  },

  selectRole (el) {
    document.querySelectorAll('.role-opt').forEach(r => r.classList.remove('selected'));
    el.classList.add('selected');
  },

  login (method = 'email') {
    const emailEl    = document.getElementById('login-email');
    const email      = emailEl ? emailEl.value.trim() : 'user@example.com';
    const isAdmin    = email.includes('admin') || email.includes('operator');

    App.state.isLoggedIn = true;
    App.state.isAdmin    = isAdmin;

    if (isAdmin) {
      App.state.user = { id: 'USR-0001', name: 'Super Admin', email, role: 'Super Admin', plan: 'Enterprise', avatar: '🔐' };
    } else {
      App.state.user = { id: 'USR-0291', name: 'Alex Green',  email, role: 'Subscriber',  plan: 'Pro',        avatar: '👤' };
    }

    this._applyUser();
    this._showApp(isAdmin);
  },

  register () {
    // Treat registration same as subscriber login for demo
    App.state.isLoggedIn = true;
    App.state.isAdmin    = false;
    App.state.user = { id: 'USR-0300', name: 'New User', email: 'new@example.com', role: 'Subscriber', plan: 'Basic', avatar: '👤' };
    this._applyUser();
    this._showApp(false);
  },

  logout () {
    App.state.isLoggedIn = false;
    App.state.isAdmin    = false;
    document.getElementById('app-view').classList.remove('active');
    document.getElementById('auth-view').classList.add('active');
    // Reset to subscriber nav
    this._setNavMode(false);
  },

  _applyUser () {
    const u = App.state.user;
    ['sidebarName', 'topbarName'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = u.name;
    });
    ['sidebarRole'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = u.role;
    });
    ['sidebarAvatar', 'topbarAvatar'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = u.avatar;
    });
  },

  _showApp (isAdmin) {
    document.getElementById('auth-view').classList.remove('active');
    document.getElementById('app-view').classList.add('active');
    this._setNavMode(isAdmin);
    Router.goto(isAdmin ? 'admin-dashboard' : 'home');
  },

  _setNavMode (isAdmin) {
    const subNav   = document.getElementById('subscriber-nav');
    const adminNav = document.getElementById('admin-nav');
    const switchBtn = document.getElementById('switchBtn');
    if (subNav)    subNav.style.display   = isAdmin ? 'none' : 'flex';
    if (adminNav)  adminNav.style.display = isAdmin ? 'flex' : 'none';
    if (switchBtn) switchBtn.textContent  = isAdmin ? 'USER' : 'ADMIN';
  },

  toggleAdminMode () {
    App.state.isAdmin = !App.state.isAdmin;
    this._setNavMode(App.state.isAdmin);
    Router.goto(App.state.isAdmin ? 'admin-dashboard' : 'home');
  },
};

// Expose globals for inline onclick compatibility
window.doLogin   = () => Auth.login();
window.doLogout  = () => Auth.logout();
window.switchTab = (t) => Auth.switchTab(t);
window.selectRole= (el) => Auth.selectRole(el);
window.toggleAdminMode = () => Auth.toggleAdminMode();
