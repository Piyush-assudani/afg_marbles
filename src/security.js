/* =========================================================
   A.F.G MARBLE & ARTS — COMPREHENSIVE SECURITY & ASSET SHIELD
   1. Context Menu & Right-Click Disabling
   2. User-Select & Drag Prevention
   3. Clipboard Event Interception (Copy / Cut Block)
   4. DevTools Detection & Shortcut Blocking
   5. Watermarking & Transparent Overlays
   6. Screen Capture Veil (FLAG_SECURE Web/PWA Emulation)
   7. Hotlinking & Frame Shielding
   8. Dynamic Tokenization & Content Obfuscation
   ========================================================= */

let toastTimeout = null;

/**
 * Show a discreet, luxury micro-toast notification
 */
function showSecurityToast(message) {
  let toast = document.getElementById('security-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'security-toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
      <span id="security-toast-text"></span>
    `;
    document.body.appendChild(toast);
  }

  const textEl = toast.querySelector('#security-toast-text');
  if (textEl) textEl.textContent = message;

  toast.classList.add('is-shown');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('is-shown');
  }, 2600);
}

/**
 * 1. Context Menu & Right-Click Disabling
 */
function initContextMenuBlock() {
  document.addEventListener('contextmenu', (e) => {
    // Allow right-click inside form inputs/textareas if needed
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    e.preventDefault();
    e.stopPropagation();
    showSecurityToast('A.F.G Marble & Arts — Atelier designs and media are protected by copyright.');
    return false;
  }, { capture: true });
}

/**
 * 2. User-Select & Pointer-Events / Dragging Blocking
 */
function initDragAndSelectBlock() {
  // Prevent dragging of any images, canvases, anchors, or media
  document.addEventListener('dragstart', (e) => {
    const target = e.target;
    if (
      target.tagName === 'IMG' ||
      target.tagName === 'CANVAS' ||
      target.tagName === 'PICTURE' ||
      target.tagName === 'VIDEO' ||
      target.closest('img, figure, .bento__cell, .cx-slide, .f-media-item')
    ) {
      e.preventDefault();
      return false;
    }
  }, { capture: true });
}

/**
 * 3. Clipboard Event Interception (Copy / Cut Block)
 */
function initClipboardBlock() {
  const blockClipboard = (e) => {
    const tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) {
      return; // allow patrons to edit forms
    }
    e.preventDefault();
    if (e.clipboardData) {
      e.clipboardData.setData('text/plain', '');
    }
    showSecurityToast('Content extraction is disabled. For architectural catalogs, contact our Atelier desk.');
    return false;
  };

  document.addEventListener('copy', blockClipboard, { capture: true });
  document.addEventListener('cut', blockClipboard, { capture: true });
}

/**
 * 4. DevTools Detection & Shortcut Blocking
 */
function initDevToolsBlock() {
  // Block common inspector and view-source shortcuts
  window.addEventListener('keydown', (e) => {
    const isMac = navigator.platform && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const modifier = isMac ? e.metaKey : e.ctrlKey;
    const key = e.key ? e.key.toUpperCase() : '';
    const code = e.code || '';

    // F12
    if (e.key === 'F12' || code === 'F12') {
      e.preventDefault();
      showSecurityToast('Developer inspection tools are restricted.');
      return false;
    }

    // Ctrl+Shift+I / Cmd+Option+I (Inspect)
    if ((e.ctrlKey && e.shiftKey && (key === 'I' || key === 'J' || key === 'C')) ||
        (isMac && e.metaKey && e.altKey && (key === 'I' || key === 'J' || key === 'C'))) {
      e.preventDefault();
      showSecurityToast('Developer inspection tools are restricted.');
      return false;
    }

    // Ctrl+U / Cmd+Option+U (View Source)
    if ((e.ctrlKey && (key === 'U' || key === 'S' || key === 'P')) ||
        (isMac && e.metaKey && (key === 'U' || key === 'S' || key === 'P'))) {
      e.preventDefault();
      showSecurityToast('Source viewing and direct export are restricted.');
      return false;
    }

    // Firefox Web Console Ctrl+Shift+K
    if (e.ctrlKey && e.shiftKey && key === 'K') {
      e.preventDefault();
      return false;
    }
  }, { capture: true });

  // Console Warning Banner
  try {
    const bannerStyle = 'color: #d8bb84; background: #14100c; font-size: 13px; font-weight: 500; padding: 10px 16px; border: 1px solid #d8bb84; border-radius: 4px;';
    console.log('%cA.F.G MARBLE & ARTS — PROTECTED INTELLECTUAL PROPERTY\nAll 3D models, architectural drawings, and photography are proprietary stonecraft assets. Unauthorized harvesting or scraping is strictly prohibited.', bannerStyle);
  } catch (err) {}
}

/**
 * 5. Watermarking & Transparent Overlays
 */
function initImageShields() {
  // Add transparent shields over sensitive imagery
  const targetContainers = document.querySelectorAll(
    '.bento__cell, .cx-slide__media, .f-media-item, .craft-media, .vcol__item, .ribbon__item, .gallery-card__media'
  );

  targetContainers.forEach((container) => {
    if (!container.querySelector('.img-shield')) {
      container.classList.add('shield-host');
      const shield = document.createElement('div');
      shield.className = 'img-shield';
      shield.setAttribute('aria-hidden', 'true');
      container.appendChild(shield);
    }
  });

  // Stamp luxury watermark on portfolio items
  const watermarkTargets = document.querySelectorAll(
    '.bento__cell--a, .cx-slide:first-child .cx-slide__media, .gallery-grid .gallery-card:nth-child(1) .gallery-card__media'
  );

  watermarkTargets.forEach((target) => {
    if (!target.querySelector('.watermark-stamp')) {
      const stamp = document.createElement('div');
      stamp.className = 'watermark-stamp';
      stamp.setAttribute('aria-hidden', 'true');
      stamp.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 7v10M8 12h8"/>
        </svg>
        <span>A.F.G Atelier · Protected</span>
      `;
      target.appendChild(stamp);
    }
  });
}

function initScreenCaptureProtection() {
  // Screen-capture veil disabled to prevent disruptive black veil on window blur / recording
  const veil = document.getElementById('screen-capture-veil');
  if (veil) veil.remove();
}

/**
 * 7. Hotlinking & Frame Shielding (Frame-Buster)
 */
function initFrameShield() {
  try {
    if (window.top !== window.self) {
      // Break out of third-party iframes attempting to embed or proxy the atelier
      window.top.location = window.self.location;
    }
  } catch (err) {
    // If blocked by cross-origin policy, blank out document
    try {
      document.body.innerHTML = '<div style="padding:40px;text-align:center;font-family:sans-serif;">Direct access required. Visit <a href="https://afgmarbel.com/">afgmarbel.com</a></div>';
    } catch (e) {}
  }
}

/**
 * 8. Dynamic Tokenization & Content Obfuscation
 */
function initContentObfuscation() {
  // Automated headless bot detection
  if (navigator.webdriver) {
    try {
      console.warn('Automated browser access detected.');
    } catch (e) {}
  }

  // Obfuscated atelier telephone and contact tokens
  // Decoded at runtime so automated text-scraping bots cannot harvest plain numbers
  const tokens = {
    phone: ['Kw==', 'OTE=', 'OTgyOTA=', 'MDAwMDA='], // +91 7597417274
    wa: ['OTg=', 'Mjkw', 'MDAw', 'MDA=']
  };

  const decodeToken = (arr) => {
    try {
      return arr.map((chunk) => atob(chunk)).join('');
    } catch (e) {
      return '';
    }
  };

  // Bind dynamic phone numbers to any protected tel targets
  document.querySelectorAll('[data-sec-token="tel"]').forEach((el) => {
    const num = decodeToken(tokens.phone);
    if (num) {
      el.setAttribute('href', `tel:${num}`);
    }
  });
}

/**
 * Initialize all 8 security layers
 */
export function initSecurity() {
  initContextMenuBlock();
  initDragAndSelectBlock();
  initClipboardBlock();
  initDevToolsBlock();
  initImageShields();
  initScreenCaptureProtection();
  initFrameShield();
  initContentObfuscation();
}
