/* ═══════════════════════════════════════════
   HELLENA HOSPITAL — script.js
   Burger menu: appears on ≤ 899px (tablet portrait,
   mobile landscape, mobile portrait).
   Desktop (≥ 900px): full nav always visible.
═══════════════════════════════════════════ */

/* ── Page Navigation ── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) page.classList.add('active');

  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const navEl = document.getElementById('nav-' + id);
  if (navEl) navEl.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Burger Menu ──
   Uses .open class on both the button and the wrapper.
   Completely safe on mobile: no hover events involved. */
(function () {
  var burger  = null;
  var wrapper = null;
  var overlay = null;

  function init() {
    burger  = document.getElementById('nav-burger');
    wrapper = document.getElementById('nav-menu-wrapper');

    // Create overlay backdrop for mobile
    overlay = document.createElement('div');
    overlay.id = 'nav-overlay';
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:998',
      'background:rgba(0,0,0,0)', 'display:none',
      'transition:background .35s'
    ].join(';');
    document.body.appendChild(overlay);

    overlay.addEventListener('click', closeMenu);
    overlay.addEventListener('touchstart', closeMenu, { passive: true });

    if (burger) burger.addEventListener('click', toggleMenu);

    // Close drawer when a nav link is clicked (mobile)
    if (wrapper) {
      wrapper.querySelectorAll('.nav-links a, .nav-links button').forEach(function (el) {
        el.addEventListener('click', function () {
          if (window.innerWidth <= 899) closeMenu();
        });
      });
    }

    // Keyboard: Escape closes menu
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    // On resize: if widened past burger threshold, close drawer cleanly
    window.addEventListener('resize', function () {
      if (window.innerWidth > 899) closeMenu();
    });
  }

  function openMenu() {
    if (!burger || !wrapper) return;
    burger.classList.add('open');
    wrapper.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    // Show overlay
    overlay.style.display = 'block';
    requestAnimationFrame(function () {
      overlay.style.background = 'rgba(0,0,0,0.45)';
    });
    // Prevent body scroll while drawer open
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!burger || !wrapper) return;
    burger.classList.remove('open');
    wrapper.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    // Hide overlay
    overlay.style.background = 'rgba(0,0,0,0)';
    setTimeout(function () { overlay.style.display = 'none'; }, 350);
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (wrapper && wrapper.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Expose globals needed by inline onclick handlers
  window.toggleMenu  = toggleMenu;
  window.openMenu    = openMenu;
  window.closeMenu   = closeMenu;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ── Back to Top ── */
(function () {
  var btn = null;
  var SHOW_AT = 320;

  function init() {
    btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function onScroll() {
    if (!btn) return;
    btn.classList.toggle('visible', window.scrollY > SHOW_AT);
  }

  window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ── Accordion (Patient Info) ── */
function ta(hd) {
  var bd   = hd.nextElementSibling;
  var open = hd.classList.contains('open');
  document.querySelectorAll('.acc-hd').forEach(function (h) {
    h.classList.remove('open');
    h.nextElementSibling.classList.remove('open');
  });
  if (!open) {
    hd.classList.add('open');
    bd.classList.add('open');
  }
}

/* ── Tab Switching (Patient Info) ── */
function switchTab(btn, tabId) {
  btn.parentElement.querySelectorAll('.ptab').forEach(function (t) {
    t.classList.remove('active');
  });
  btn.classList.add('active');
  document.querySelectorAll('.ptab-content').forEach(function (t) {
    t.classList.remove('active');
  });
  var tab = document.getElementById(tabId);
  if (tab) tab.classList.add('active');
}