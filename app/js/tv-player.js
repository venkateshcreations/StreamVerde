/**
 * StreamVerde App — TV Player (M3U playlist + HLS playback)
 * app/js/tv-player.js
 */

'use strict';

window.TvPlayer = {

  _video: null,
  _hls: null,
  _channels: [],
  _listEl: null,
  _placeholder: null,
  _errorEl: null,
  _nowPlayingEl: null,
  _filterInput: null,
  _urlInput: null,

  init() {
    this._video = document.getElementById('tvPlayerVideo');
    this._listEl = document.getElementById('tvPlayerChannelList');
    this._placeholder = document.getElementById('tvPlayerPlaceholder');
    this._errorEl = document.getElementById('tvPlayerError');
    this._nowPlayingEl = document.getElementById('tvPlayerNowPlaying');
    this._filterInput = document.getElementById('tvPlayerFilter');
    this._urlInput = document.getElementById('tvPlayerM3uUrl');

    if (!this._video || !this._listEl) return;

    document.getElementById('tvPlayerLoadBtn')?.addEventListener('click', () => this.loadPlaylist());
    this._filterInput?.addEventListener('input', () => this.renderList());
    this._video.addEventListener('error', (e) => this.onVideoError(e));
    this._video.addEventListener('playing', () => this.hideError());

    this.loadPlaylist();
  },

  loadPlaylist() {
    const url = (this._urlInput?.value || '').trim() || M3U.DEFAULT_PLAYLIST_URL;
    const loading = document.getElementById('tvPlayerChannelLoading');
    if (loading) {
      loading.style.display = 'block';
      loading.textContent = 'Loading playlist…';
    }
    this._listEl.innerHTML = '';
    this._listEl.appendChild(loading);

    M3U.fetchPlaylist(url)
      .then((channels) => {
        this._channels = channels;
        if (loading) loading.style.display = 'none';
        this.renderList();
      })
      .catch((err) => {
        if (loading) loading.style.display = 'none';
        this._listEl.innerHTML = '<div class="tv-player-error-msg">Failed to load playlist. Check URL or CORS.</div>';
        console.warn('TvPlayer load error', err);
      });
  },

  renderList() {
    if (!this._listEl) return;
    const q = (this._filterInput?.value || '').trim().toLowerCase();
    const list = q
      ? this._channels.filter((c) =>
          (c.name && c.name.toLowerCase().includes(q)) ||
          (c.groupTitle && c.groupTitle.toLowerCase().includes(q))
        )
      : this._channels;

    this._listEl.innerHTML = '';
    list.forEach((ch, i) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'tv-player-channel-item';
      card.dataset.index = String(this._channels.indexOf(ch));
      const img = ch.logo
        ? `<img src="${ch.logo}" alt="" class="tv-player-channel-logo" onerror="this.style.display='none'">`
        : '';
      const group = ch.groupTitle ? `<span class="tv-player-channel-group">${ch.groupTitle}</span>` : '';
      card.innerHTML = `
        <span class="tv-player-channel-thumb">${img || '<span class="tv-player-channel-no-logo">▶</span>'}</span>
        <span class="tv-player-channel-info">
          <span class="tv-player-channel-name">${escapeHtml(ch.name || 'Channel')}</span>
          ${group}
        </span>
      `;
      card.addEventListener('click', () => this.playChannel(ch));
      this._listEl.appendChild(card);
    });
  },

  playChannel(ch) {
    if (!this._video || !ch?.url) return;
    this.destroyHls();
    this.hideError();
    if (this._placeholder) this._placeholder.style.display = 'none';
    if (this._nowPlayingEl) {
      this._nowPlayingEl.textContent = ch.name || 'Live';
      this._nowPlayingEl.style.display = 'block';
    }

    const url = ch.url;
    this._video.src = '';

    if (url.includes('.m3u8') && typeof Hls !== 'undefined' && Hls.isSupported()) {
      this._hls = new Hls({ enableWorker: true });
      this._hls.loadSource(url);
      this._hls.attachMedia(this._video);
      this._hls.on(Hls.Events.MANIFEST_PARSED, () => this._video.play().catch(() => {}));
      this._hls.on(Hls.Events.ERROR, (e, data) => {
        if (data.fatal) this.showError('Stream error: ' + (data.type || 'unknown'));
      });
    } else if (this._video.canPlayType('application/vnd.apple.mpegurl')) {
      this._video.src = url;
      this._video.play().catch(() => this.showError('Playback failed'));
    } else {
      this._video.src = url;
      this._video.play().catch(() => this.showError('Playback failed'));
    }

    document.querySelectorAll('.tv-player-channel-item').forEach((el) => el.classList.remove('active'));
    const active = this._listEl.querySelector(`[data-index="${this._channels.indexOf(ch)}"]`);
    if (active) active.classList.add('active');
  },

  destroyHls() {
    if (this._hls) {
      this._hls.destroy();
      this._hls = null;
    }
  },

  onVideoError(e) {
    const msg = this._video?.error?.message || 'Playback error';
    this.showError(msg);
  },

  showError(msg) {
    if (this._errorEl) {
      this._errorEl.textContent = msg;
      this._errorEl.style.display = 'block';
    }
  },

  hideError() {
    if (this._errorEl) this._errorEl.style.display = 'none';
  },
};

function escapeHtml(s) {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => TvPlayer.init());
