/**
 * StreamVerde App — M3U / M3U8 playlist parser
 * Fetches a playlist URL and parses #EXTINF entries into channel objects.
 * app/js/m3u.js
 */

'use strict';

window.M3U = {

  /** Default playlist: iptv-org public index (HLS streams) */
  DEFAULT_PLAYLIST_URL: 'https://iptv-org.github.io/iptv/index.m3u',

  /**
   * Parse EXTINF line for attributes: tvg-id, tvg-logo, group-title, and title.
   * Format: #EXTINF:-1 tvg-id="x" tvg-logo="y" group-title="z",Channel Name
   */
  parseExtinf(line) {
    const out = { name: '', url: '', logo: '', groupTitle: '' };
    const attrRegex = /([a-z-]+)="([^"]*)"/gi;
    let m;
    while ((m = attrRegex.exec(line)) !== null) {
      const key = m[1].toLowerCase();
      const val = m[2].trim();
      if (key === 'tvg-logo') out.logo = val;
      else if (key === 'group-title') out.groupTitle = val;
      else if (key === 'tvg-id') out.tvgId = val;
    }
    const commaIdx = line.indexOf(',');
    if (commaIdx !== -1) out.name = line.slice(commaIdx + 1).trim();
    return out;
  },

  /**
   * Parse M3U text into array of { name, url, logo, groupTitle }.
   * Assumes #EXTINF is followed by the stream URL on the next line.
   */
  parse(text) {
    const channels = [];
    const lines = text.split(/\r?\n/).map(l => l.trim());
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.startsWith('#EXTINF:')) continue;
      const info = this.parseExtinf(line);
      let url = '';
      for (let j = i + 1; j < lines.length; j++) {
        const next = lines[j];
        if (next && !next.startsWith('#')) {
          url = next;
          break;
        }
      }
      if (url) {
        info.url = url;
        channels.push(info);
      }
    }
    return channels;
  },

  /**
   * Fetch playlist from URL and return parsed channels.
   * @param {string} [url] - M3U URL (defaults to DEFAULT_PLAYLIST_URL)
   * @returns {Promise<Array<{name,url,logo,groupTitle}>>}
   */
  async fetchPlaylist(url) {
    const u = url || this.DEFAULT_PLAYLIST_URL;
    const res = await fetch(u, { mode: 'cors' });
    if (!res.ok) throw new Error('Playlist fetch failed: ' + res.status);
    const text = await res.text();
    return this.parse(text);
  },
};
