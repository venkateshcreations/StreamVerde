/**
 * StreamVerde App — Authentication
 * app/js/auth.js
 *
 * Roles:
 *   superadmin   → full admin platform
 *   operator     → platform management (no advertising)
 *   contentmgr   → content & channels only
 *   reseller     → users, billing, analytics
 *   subscriber   → viewer / watch mode
 */

'use strict';

/* ── Role definitions ────────────────────────────────────────── */
const ROLES = {
  superadmin: {
    name:   'Super Admin',
    role:   'Super Admin',
    avatar: '🔐',
    navId:  'nav-superadmin',
    home:   'admin-dashboard',
  },
  operator: {
    name:   'Operator',
    role:   'Operator',
    avatar: '🏢',
    navId:  'nav-operator',
    home:   'admin-dashboard',
  },
  contentmgr: {
    name:   'Content Manager',
    role:   'Content Mgr',
    avatar: '🎬',
    navId:  'nav-contentmgr',
    home:   'admin-vod',
  },
  reseller: {
    name:   'Reseller',
    role:   'Reseller',
    avatar: '🤝',
    navId:  'nav-reseller',
    home:   'admin-dashboard',
  },
  subscriber: {
    name:   'Alex Green',
    role:   'Subscriber',
    avatar: '👤',
    navId:  'nav-subscriber',
    home:   'home',
  },
};

/* ── Detect role from email (demo heuristic) ──── */
function detectRole (email) {
  if (email.includes('admin'))   return 'superadmin';
  if (email.includes('operator')) return 'operator';
  if (email.includes('content'))  return 'contentmgr';
  if (email.includes('reseller')) return 'reseller';
  return 'subscriber';
}

/* ── All nav IDs for hiding ───────────────────── */
const ALL_NAV_IDS = [
  'nav-subscriber',
  'nav-superadmin',
  'nav-operator',
  'nav-contentmgr',
  'nav-reseller',
];

window.Auth = {

  init () {
    document.querySelectorAll('.auth-tab').forEach(tab => {
      tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
    });
    document.querySelectorAll('.role-opt').forEach(opt => {
      opt.addEventListener('click', () => this.selectRole(opt));
    });
    const signinForm = document.getElementById('signinForm');
    if (signinForm) signinForm.addEventListener('submit', e => { e.preventDefault(); this.login(); });
    const signupForm = document.getElementById('signupForm');
    if (signupForm) signupForm.addEventListener('submit', e => { e.preventDefault(); this.register(); });
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
    const emailEl = document.getElementById('login-email');
    const email   = emailEl ? emailEl.value.trim() : 'user@example.com';
    const roleKey = detectRole(email);
    const def     = ROLES[roleKey];

    App.state.isLoggedIn = true;
    App.state.roleKey    = roleKey;
    App.state.isAdmin    = (roleKey !== 'subscriber');
    App.state.user       = {
      id:     'USR-0001',
      name:   def.name,
      email,
      role:   def.role,
      plan:   roleKey === 'subscriber' ? 'Pro' : 'Enterprise',
      avatar: def.avatar,
    };

    this._applyUser();
    this._showNav(def.navId);
    this._updateSwitchBtn();
    this._showApp(def.home);
  },

  register () {
    const def = ROLES['subscriber'];
    App.state.isLoggedIn = true;
    App.state.roleKey    = 'subscriber';
    App.state.isAdmin    = false;
    App.state.user = {
      id: 'USR-0300', name: 'New User',
      email: 'new@example.com', role: def.role, plan: 'Basic', avatar: def.avatar,
    };
    this._applyUser();
    this._showNav(def.navId);
    this._updateSwitchBtn();
    this._showApp(def.home);
  },

  logout () {
    App.state.isLoggedIn = false;
    App.state.isAdmin    = false;
    App.state.roleKey    = 'subscriber';
    document.getElementById('app-view').classList.remove('active');
    document.getElementById('auth-view').classList.add('active');
    this._showNav('nav-subscriber');
  },

  /* Toggle between current role's nav and subscriber (demo switch btn) */
  toggleAdminMode () {
    const roleKey = App.state.roleKey || 'subscriber';
    if (App.state.isAdmin) {
      // Switch to subscriber view
      App.state._prevRoleKey = roleKey;
      App.state.isAdmin = false;
      this._showNav('nav-subscriber');
      Router.goto('home');
    } else {
      // Switch back to original role
      const prev = App.state._prevRoleKey || 'superadmin';
      App.state.isAdmin = true;
      this._showNav(ROLES[prev].navId);
      Router.goto(ROLES[prev].home);
    }
    this._updateSwitchBtn();
  },

  /* ── Private helpers ── */

  _applyUser () {
    const u = App.state.user;
    ['sidebarName', 'topbarName'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = u.name;
    });
    const roleEl = document.getElementById('sidebarRole');
    if (roleEl) roleEl.textContent = u.role;
    ['sidebarAvatar', 'topbarAvatar'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = u.avatar;
    });
  },

  _showNav (navId) {
    ALL_NAV_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    const target = document.getElementById(navId);
    if (target) target.style.display = 'flex';
  },

  _updateSwitchBtn () {
    const btn = document.getElementById('switchBtn');
    if (btn) btn.textContent = App.state.isAdmin ? 'USER' : 'ADMIN';
  },

  _showApp (homePage) {
    document.getElementById('auth-view').classList.remove('active');
    document.getElementById('app-view').classList.add('active');
    Router.goto(homePage);
  },
};

/* ── Global shims ── */
window.doLogin         = () => Auth.login();
window.doLogout        = () => Auth.logout();
window.switchTab       = (t) => Auth.switchTab(t);
window.selectRole      = (el) => Auth.selectRole(el);
window.toggleAdminMode = () => Auth.toggleAdminMode();
