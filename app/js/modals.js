/**
 * StreamVerde App — Modal System
 * app/js/modals.js
 */

'use strict';

window.Modals = {

  TEMPLATES: {

    addUser: {
      title: '+ Add New User',
      body: `
        <div class="modal-form">
          <div class="form-row">
            <div class="form-group"><label class="form-label">First Name</label><input class="form-input" placeholder="Alex"></div>
            <div class="form-group"><label class="form-label">Last Name</label><input class="form-input" placeholder="Green"></div>
          </div>
          <div class="form-group"><label class="form-label">Email</label><input class="form-input" type="email" placeholder="user@example.com"></div>
          <div class="form-group"><label class="form-label">Phone</label><input class="form-input" type="tel" placeholder="+1 555 000 0000"></div>
          <div class="form-group"><label class="form-label">Role</label>
            <select class="form-input"><option>Subscriber</option><option>Operator</option><option>Content Manager</option><option>Reseller</option><option>Support Agent</option></select>
          </div>
          <div class="form-group"><label class="form-label">Subscription Plan</label>
            <select class="form-input"><option>Basic — $9/mo</option><option>Pro — $19/mo</option><option>Ultra — $35/mo</option></select>
          </div>
          <div class="form-group"><label class="form-label">Country</label>
            <select class="form-input"><option>United States</option><option>United Kingdom</option><option>India</option><option>Germany</option><option>Australia</option></select>
          </div>
          <div class="modal-actions">
            <button class="btn btn-ghost" onclick="Modals.close()">Cancel</button>
            <button class="btn btn-primary">Create User</button>
          </div>
        </div>`,
    },

    addChannel: {
      title: '📡 Add New Channel',
      body: `
        <div class="modal-form">
          <div class="form-group"><label class="form-label">Channel Name</label><input class="form-input" placeholder="My News Channel"></div>
          <div class="form-row">
            <div class="form-group"><label class="form-label">Channel ID</label><input class="form-input" placeholder="CH 525"></div>
            <div class="form-group"><label class="form-label">Category</label>
              <select class="form-input"><option>News</option><option>Sports</option><option>Movies</option><option>Kids</option><option>Music</option><option>Documentary</option></select>
            </div>
          </div>
          <div class="form-group"><label class="form-label">Streaming URL (HLS/RTMP)</label><input class="form-input" placeholder="https://stream.example.com/live/ch1.m3u8"></div>
          <div class="form-row">
            <div class="form-group"><label class="form-label">Language</label><input class="form-input" placeholder="English"></div>
            <div class="form-group"><label class="form-label">Region</label><input class="form-input" placeholder="Global"></div>
          </div>
          <div class="form-group"><label class="form-label">Quality</label>
            <select class="form-input"><option>HD 720p</option><option>Full HD 1080p</option><option>4K UHD</option></select>
          </div>
          <div class="form-group"><label class="form-label">EPG Source URL</label><input class="form-input" placeholder="https://epg.example.com/guide.xml"></div>
          <div class="form-group"><label class="form-label">DRM</label>
            <select class="form-input"><option>None</option><option>Widevine</option><option>FairPlay</option><option>PlayReady</option></select>
          </div>
          <div class="modal-actions">
            <button class="btn btn-ghost" onclick="Modals.close()">Cancel</button>
            <button class="btn btn-primary">Add Channel</button>
          </div>
        </div>`,
    },

    uploadVOD: {
      title: '⬆ Upload VOD Content',
      body: `
        <div class="modal-form">
          <div class="upload-zone">
            <div class="upload-icon">📁</div>
            <div class="upload-text">Click or drag your video file here</div>
            <div class="upload-sub">MP4 · MKV · H264 · H265 · AV1 · Max 50GB</div>
          </div>
          <div class="form-group"><label class="form-label">Title</label><input class="form-input" placeholder="Movie or Series title"></div>
          <div class="form-row">
            <div class="form-group"><label class="form-label">Type</label>
              <select class="form-input"><option>Movie</option><option>Series</option><option>Documentary</option></select>
            </div>
            <div class="form-group"><label class="form-label">Year</label><input class="form-input" type="number" placeholder="2025"></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label class="form-label">Genre</label>
              <select class="form-input"><option>Action</option><option>Drama</option><option>Sci-Fi</option><option>Thriller</option><option>Comedy</option><option>Documentary</option></select>
            </div>
            <div class="form-group"><label class="form-label">Language</label><input class="form-input" placeholder="English"></div>
          </div>
          <div class="form-group"><label class="form-label">Cast (comma separated)</label><input class="form-input" placeholder="Actor 1, Actor 2, Actor 3"></div>
          <div class="form-group"><label class="form-label">Description</label><textarea class="form-input" rows="3" placeholder="Short description of the content..."></textarea></div>
          <div class="modal-actions">
            <button class="btn btn-ghost" onclick="Modals.close()">Cancel</button>
            <button class="btn btn-primary">Upload & Encode</button>
          </div>
        </div>`,
    },

    editProfile: {
      title: '✏️ Edit Profile',
      body: `
        <div class="modal-form">
          <div class="form-row">
            <div class="form-group"><label class="form-label">First Name</label><input class="form-input" value="Alex"></div>
            <div class="form-group"><label class="form-label">Last Name</label><input class="form-input" value="Green"></div>
          </div>
          <div class="form-group"><label class="form-label">Email</label><input class="form-input" type="email" value="alex.green@example.com"></div>
          <div class="form-group"><label class="form-label">Phone</label><input class="form-input" value="+1 555 000 1234"></div>
          <div class="form-group"><label class="form-label">Country</label>
            <select class="form-input"><option selected>United States</option><option>United Kingdom</option><option>India</option><option>Germany</option></select>
          </div>
          <div class="modal-actions">
            <button class="btn btn-ghost" onclick="Modals.close()">Cancel</button>
            <button class="btn btn-primary">Save Changes</button>
          </div>
        </div>`,
    },

    addCampaign: {
      title: '📢 New Ad Campaign',
      body: `
        <div class="modal-form">
          <div class="form-group"><label class="form-label">Campaign Name</label><input class="form-input" placeholder="Brand Q2 Campaign"></div>
          <div class="form-row">
            <div class="form-group"><label class="form-label">Ad Type</label>
              <select class="form-input"><option>Pre-roll</option><option>Mid-roll</option><option>Post-roll</option><option>Banner</option><option>Overlay</option></select>
            </div>
            <div class="form-group"><label class="form-label">Target Impressions</label><input class="form-input" type="number" placeholder="2000000"></div>
          </div>
          <div class="form-group"><label class="form-label">Target Geography</label><input class="form-input" placeholder="US, EU, Global..."></div>
          <div class="form-row">
            <div class="form-group"><label class="form-label">Device Type</label>
              <select class="form-input"><option>All</option><option>Smart TV</option><option>Mobile</option><option>Desktop</option></select>
            </div>
            <div class="form-group"><label class="form-label">Content Category</label>
              <select class="form-input"><option>All</option><option>Sports</option><option>News</option><option>Movies</option><option>Kids</option></select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group"><label class="form-label">Start Date</label><input class="form-input" type="date"></div>
            <div class="form-group"><label class="form-label">End Date</label><input class="form-input" type="date"></div>
          </div>
          <div class="modal-actions">
            <button class="btn btn-ghost" onclick="Modals.close()">Cancel</button>
            <button class="btn btn-primary">Launch Campaign</button>
          </div>
        </div>`,
    },
  },

  open (key) {
    const tpl = this.TEMPLATES[key];
    if (!tpl) return console.warn('Modal not found:', key);

    const titleEl = document.getElementById('modalTitle');
    const bodyEl  = document.getElementById('modalBody');
    const overlay = document.getElementById('modalOverlay');

    if (titleEl) titleEl.textContent = tpl.title;
    if (bodyEl)  bodyEl.innerHTML    = tpl.body;
    if (overlay) overlay.classList.add('open');
  },

  close () {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.classList.remove('open');
  },

  init () {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close();
      });
    }
  },
};

// Expose for inline onclick compatibility
window.openModal  = (key) => Modals.open(key);
window.closeModal = (e)   => {
  if (!e || e.target === document.getElementById('modalOverlay')) Modals.close();
};

document.addEventListener('DOMContentLoaded', () => Modals.init());
