/**
 * StreamVerde Website — Navbar
 * website/js/navbar.js
 */

'use strict';

(function () {
  const navbar       = document.getElementById('navbar');
  const hamburger    = document.getElementById('hamburger');
  const mobileMenu   = document.getElementById('mobileMenu');
  const navLinks     = document.querySelectorAll('nav .nav-links a');
  const sections     = document.querySelectorAll('section[id]');

  /* ── Scroll shrink ── */
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveLink();
  });

  /* ── Mobile menu toggle ── */
  window.toggleMenu = function () {
    const isOpen = mobileMenu.classList.contains('open');
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  };

  window.closeMenu = function () {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  /* ── Active link on resize ── */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) window.closeMenu();
  });

  /* ── Close on outside click ── */
  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      window.closeMenu();
    }
  });

  /* ── Scroll-spy active nav ── */
  function updateActiveLink () {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  /* ── setActive helper for onclick ── */
  window.setActive = function (el) {
    navLinks.forEach(a => a.classList.remove('active'));
    el.classList.add('active');
  };
})();
