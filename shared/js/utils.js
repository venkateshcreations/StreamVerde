/**
 * StreamVerde — Shared Utilities
 * shared/js/utils.js
 */

'use strict';

const SV = window.SV || {};

/* ── DOM helpers ── */
SV.$ = (sel, ctx = document) => ctx.querySelector(sel);
SV.$$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── Class helpers ── */
SV.addClass    = (el, ...cls) => el && el.classList.add(...cls);
SV.removeClass = (el, ...cls) => el && el.classList.remove(...cls);
SV.toggleClass = (el, cls)    => el && el.classList.toggle(cls);
SV.hasClass    = (el, cls)    => el && el.classList.contains(cls);

/* ── Animation ── */
SV.fadeIn = (el, duration = 300) => {
  if (!el) return;
  el.style.opacity = '0';
  el.style.display = 'block';
  el.style.transition = `opacity ${duration}ms ease`;
  requestAnimationFrame(() => { el.style.opacity = '1'; });
};

SV.fadeOut = (el, duration = 300, cb) => {
  if (!el) return;
  el.style.transition = `opacity ${duration}ms ease`;
  el.style.opacity = '0';
  setTimeout(() => {
    el.style.display = 'none';
    if (cb) cb();
  }, duration);
};

/* ── IntersectionObserver for fade-in animations ── */
SV.observeFadeIn = (selector = '.fade-in', threshold = 0.12) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold });
  SV.$$(selector).forEach(el => observer.observe(el));
};

/* ── Debounce ── */
SV.debounce = (fn, delay = 200) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/* ── Format helpers ── */
SV.formatNumber = (n) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K';
  return String(n);
};

SV.formatCurrency = (n, symbol = '$') => symbol + n.toLocaleString();

SV.formatDuration = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
};

/* ── Storage helpers ── */
SV.store = {
  get:    (key) => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } },
  set:    (key, val) => localStorage.setItem(key, JSON.stringify(val)),
  remove: (key) => localStorage.removeItem(key),
};

/* ── Event bus ── */
SV.events = {
  _listeners: {},
  on(event, fn) {
    if (!this._listeners[event]) this._listeners[event] = [];
    this._listeners[event].push(fn);
  },
  off(event, fn) {
    if (!this._listeners[event]) return;
    this._listeners[event] = this._listeners[event].filter(l => l !== fn);
  },
  emit(event, data) {
    (this._listeners[event] || []).forEach(fn => fn(data));
  },
};

window.SV = SV;
