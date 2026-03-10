/**
 * StreamVerde Website — Main
 * website/js/main.js
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll-reveal (fade-in) ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  /* ── Hero immediate reveal on load ── */
  window.addEventListener('load', () => {
    document.querySelectorAll('.hero-text .fade-in, .hero-visual .fade-in')
      .forEach((el, i) => setTimeout(() => el.classList.add('visible'), 100 + i * 150));
  });

  /* ── Channel item click ── */
  document.querySelectorAll('.channel-item').forEach(item => {
    item.addEventListener('click', function () {
      document.querySelectorAll('.channel-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    });
  });

  /* ── Filter buttons (VOD, chart tabs) ── */
  document.querySelectorAll('.filter-btn, .chart-tab').forEach(btn => {
    btn.addEventListener('click', function () {
      const group = this.closest('.vod-filters, .chart-tabs');
      if (group) {
        group.querySelectorAll('.filter-btn, .chart-tab').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  /* ── Time slot EPG ── */
  document.querySelectorAll('.time-slot').forEach(ts => {
    ts.addEventListener('click', function () {
      document.querySelectorAll('.time-slot').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  /* ── CTA "Get Started" → app ── */
  document.querySelectorAll('[data-goto-app]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '../app/index.html';
    });
  });

});
