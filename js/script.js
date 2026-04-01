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

/* ════════════════════════════════════════════
   HELLENA HOSPITAL CHATBOT
   Powered by Claude (Anthropic API)
════════════════════════════════════════════ */
(function () {

  /* ── System prompt: full hospital knowledge ── */
  var SYSTEM = [
    'You are Hellena Assistant, the friendly and knowledgeable AI chatbot for Hellena Hospital in Aba, Abia State, Nigeria.',
    'You speak warmly, professionally and concisely. Always respond in plain text — no markdown headers, no bullet asterisks.',
    'Use short paragraphs. If listing things, write them as a natural sentence list (e.g. "We offer surgery, paediatrics, and immunization.").',
    '',
    'KEY HOSPITAL FACTS:',
    '- Full name: Hellena Hospital',
    '- Registration: RC 7061083',
    '- Address: 60B Gas Line, Ohuru Isimiri, before Malting-Plant, Ogbor-Hill, Aba, Abia State, Nigeria',
    '- Emergency phones: +234 916 447 4223 and +234 802 626 9356',
    '- Hours: Open 24 hours a day, 7 days a week',
    '- Tagline: "To Improve Quality of Life"',
    '',
    'SERVICES OFFERED:',
    'Surgery (general & specialised, minor & major, emergency surgery, post-op care), Paediatric Care & Treatment (neonatal, infant, child, adolescent), Immunization (childhood, travel vaccines, flu shots), Inpatient & Outpatient (consultations, private rooms, 24hr nursing), Family Planning (contraception, fertility counselling), HIV/AIDS Counseling & Testing (confidential), Malnutrition Treatment (nutritional assessment, therapeutic feeding), Laboratory & Diagnostics (full blood count, microbiology, rapid tests), ANC & Delivery (antenatal care, assisted & normal delivery, neonatal incubator, postnatal follow-up), Geriatric Care.',
    '',
    'FACILITIES:',
    'Operating theatres, inpatient wards, private rooms, consultation rooms, delivery/maternity unit, neonatal incubator unit, laboratory, pharmacy.',
    '',
    'APPOINTMENTS:',
    'To book an appointment, visit the Contact page on our website or call +234 916 447 4223. Walk-ins are also welcome.',
    '',
    'IMPORTANT RULES:',
    '- For any medical emergency, always first say to call +234 916 447 4223 immediately.',
    '- Do not diagnose illnesses or prescribe medication. Advise the user to speak with a doctor.',
    '- If asked something you do not know about the hospital, suggest they call or visit.',
    '- Keep responses under 120 words unless the user asks for detail.',
    '- Do not discuss topics unrelated to the hospital or general health awareness.'
  ].join('\n');

  var history   = [];   /* [{role:'user'|'assistant', content:'...'}] */
  var isOpen    = false;
  var isLoading = false;
  var greeted   = false;

  /* ── DOM refs (resolved after DOMContentLoaded) ── */
  var $win, $msgs, $input, $send, $quick, $fab, $fabIcon, $fabClose;

  function init() {
    $win      = document.getElementById('chat-window');
    $msgs     = document.getElementById('chat-messages');
    $input    = document.getElementById('chat-input');
    $send     = document.getElementById('chat-send');
    $quick    = document.getElementById('chat-quick');
    $fab      = document.getElementById('chat-fab');
    $fabIcon  = document.getElementById('chat-fab-icon');
    $fabClose = document.getElementById('chat-fab-close');
  }

  /* ── Open / Close ── */
  function chatToggle() {
    isOpen = !isOpen;
    if (!$win) return;
    $win.classList.toggle('open', isOpen);
    $win.setAttribute('aria-hidden', String(!isOpen));
    $fab.classList.toggle('open', isOpen);
    $fabIcon.style.display  = isOpen ? 'none'        : 'flex';
    $fabClose.style.display = isOpen ? 'flex'        : 'none';
    if (isOpen) {
      if (!greeted) { greet(); greeted = true; }
      setTimeout(function(){ if($input) $input.focus(); }, 320);
    }
  }
  window.chatToggle = chatToggle;

  /* ── Clear ── */
  function chatClear() {
    history = [];
    greeted = false;
    if ($msgs) $msgs.innerHTML = '';
    if ($quick) $quick.style.display = 'flex';
    greet();
    greeted = true;
  }
  window.chatClear = chatClear;

  /* ── Quick reply chips ── */
  function chatQuick(btn) {
    var q = btn.getAttribute('data-q');
    if ($quick) $quick.style.display = 'none';
    sendMessage(q);
  }
  window.chatQuick = chatQuick;

  /* ── Textarea: Enter sends, Shift+Enter newline ── */
  function chatKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      chatSend();
    }
  }
  window.chatKeydown = chatKeydown;

  /* ── Auto-resize textarea ── */
  function chatAutoResize(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 100) + 'px';
  }
  window.chatAutoResize = chatAutoResize;

  /* ── Public send trigger ── */
  function chatSend() {
    if (!$input) return;
    var text = $input.value.trim();
    if (!text || isLoading) return;
    $input.value = '';
    $input.style.height = 'auto';
    if ($quick) $quick.style.display = 'none';
    sendMessage(text);
  }
  window.chatSend = chatSend;

  /* ── Core: append bubble, call API ── */
  function sendMessage(text) {
    appendBubble('user', text);
    history.push({ role: 'user', content: text });
    setLoading(true);

    fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 400,
        system: SYSTEM,
        messages: history.slice(-12)   /* keep last 12 turns for context */
      })
    })
    .then(function(res){ return res.json(); })
    .then(function(data){
      setLoading(false);
      var reply = '';
      if (data && data.content && data.content[0] && data.content[0].text) {
        reply = data.content[0].text.trim();
      } else if (data && data.error) {
        reply = 'Sorry, I\'m having trouble connecting right now. Please call us on +234 916 447 4223 for immediate assistance.';
      }
      if (reply) {
        appendBubble('bot', reply);
        history.push({ role: 'assistant', content: reply });
      }
    })
    .catch(function(){
      setLoading(false);
      appendBubble('bot', 'I\'m temporarily offline. For immediate help, please call +234 916 447 4223 or visit our Contact page.');
    });
  }

  /* ── Greeting message ── */
  function greet() {
    appendBubble('bot',
      'Hello! I\'m Hellena Assistant, here to help you with information about Hellena Hospital. ' +
      'You can ask me about our services, how to book an appointment, our location, or emergency contacts. How can I help you today?'
    );
  }

  /* ── Append a bubble to the messages list ── */
  function appendBubble(role, text) {
    if (!$msgs) return;
    var wrap = document.createElement('div');
    wrap.className = 'chat-msg ' + role;

    if (role === 'bot') {
      var av = document.createElement('div');
      av.className = 'chat-msg-avatar';
      var img = document.createElement('img');
      img.src = 'images/logo.png'; img.alt = 'Hellena';
      av.appendChild(img);
      wrap.appendChild(av);
    }

    var bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    /* Linkify phone numbers */
    var safe = text
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/(\+234[\d\s]{9,14})/g, '<a href="tel:$1">$1</a>');
    bubble.innerHTML = safe;
    wrap.appendChild(bubble);

    $msgs.appendChild(wrap);
    $msgs.scrollTop = $msgs.scrollHeight;
  }

  /* ── Show/hide typing indicator ── */
  function setLoading(on) {
    isLoading = on;
    if ($send) $send.disabled = on;
    var existing = document.getElementById('chat-typing-indicator');
    if (on) {
      if (existing) return;
      var wrap = document.createElement('div');
      wrap.className = 'chat-msg bot'; wrap.id = 'chat-typing-indicator';
      var av = document.createElement('div');
      av.className = 'chat-msg-avatar';
      var img = document.createElement('img');
      img.src = 'images/logo.png'; img.alt = '';
      av.appendChild(img); wrap.appendChild(av);
      var bubble = document.createElement('div');
      bubble.className = 'chat-bubble';
      var dots = document.createElement('div');
      dots.className = 'chat-typing';
      dots.innerHTML = '<span></span><span></span><span></span>';
      bubble.appendChild(dots); wrap.appendChild(bubble);
      $msgs.appendChild(wrap);
      $msgs.scrollTop = $msgs.scrollHeight;
    } else {
      if (existing) existing.remove();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();