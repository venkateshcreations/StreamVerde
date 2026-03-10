/**
 * StreamVerde App — Video Player Overlay
 * app/js/player.js
 */

'use strict';

window.Player = {

  ICONS: {
    'Galactic Frontier': '🌌', 'Neon District': '🏙️', 'Synthetic Dawn': '🤖',
    'Deep Blue Rise': '🌊',   'Ember Protocol': '🔥',  'Midnight Heist': '🌙',
    'Storm Surge': '⚡',       'The Last Forest': '🌿', 'Quantum Divide': '🔬',
    'News 24 Global': '📡',   'Sports Prime HD': '⚽',  'Cinema Ultra 4K': '🎬',
    'Cinema Ultra': '🎬',      'KidsWorld': '🧒',       'DocuNation': '🌍',
    'Music Beats': '🎵',       'Finance TV': '📈',      'F1 Racing': '🏎️',
    'F1 Racing Live': '🏎️',   'Blood Circuit': '💉',   'Arctic Code': '❄️',
    'Frequency': '📻',         'UCL Semi-Final': '⚽',  'Breaking News': '📡',
    'UCL Pre-Match': '⚽',     'Dino Explorers': '🧒',  'World News 18:00': '📡',
    'Iron Veil': '⚔️',         'Synthetic Dawn S02': '🤖',
  },

  _overlay: null,

  init () {
    this._overlay = document.getElementById('playerOverlay');
    if (this._overlay) {
      this._overlay.addEventListener('click', (e) => {
        if (e.target === this._overlay) this.close();
      });
    }
  },

  open (title) {
    if (!this._overlay) this._overlay = document.getElementById('playerOverlay');
    const iconEl    = document.getElementById('playerIcon');
    const titleEl   = document.getElementById('playerTitle');
    const metaEl    = document.getElementById('playerMeta');

    if (iconEl)  iconEl.textContent  = this.ICONS[title] || '▶';
    if (titleEl) titleEl.textContent = title;
    if (metaEl)  metaEl.textContent  = '4K HDR · HLS Stream · Dolby Atmos';

    if (this._overlay) this._overlay.classList.add('open');
  },

  close () {
    if (this._overlay) this._overlay.classList.remove('open');
  },
};

// Expose for inline onclick compatibility
window.openPlayer  = (t) => Player.open(t);
window.closePlayer = (e) => {
  if (!e || e.target === document.getElementById('playerOverlay')) Player.close();
};

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => Player.init());
