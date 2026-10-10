/* ============================================================
   Emmanuel & Gloria — Wedding Website
   Vanilla JS only. No frameworks/build tools required.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------------
     EDIT HERE: Order of Ceremony
     Replace/extend items below. Each item can have an optional
     "sub" array of nested lines. Use type:"song" with a
     "songNumber" to render a clickable song reference that
     opens the lyrics modal.
     --------------------------------------------------------- */
  const ceremonyItems = [
    { time: '12:30', title: 'Music Interlude' },
    { time: '12:45', title: 'Arrival of the Groom' },
    { time: '12:50', title: 'Arrival of the Bride' },
    {
      time: '1:00',
      title: "Chairman's Opening Address",
      sub: [
        { type: 'song', songNumber: 131, label: 'Opening Song 131 & Prayer' },
        { type: 'text', label: 'Marriage Discourse' },
        { type: 'text', label: "Chairman's Concluding Remarks" },
        { type: 'song', songNumber: 132, label: 'Closing Song 132 & Prayer' },
      ],
    },
  ];

  /* ---------------------------------------------------------
     EDIT HERE: Photography Order
     Replace/extend/reorder the list below as needed.
     --------------------------------------------------------- */
  const photographyOrder = [
    'Bride', 'Groom', 'Couple', 'Chairman & Wife', 'Speaker & Wife',
    "Groom's Parents", "Bride's Parents", "Groom's Siblings", "Bride's Siblings",
    "Groom's Family", "Bride's Family", 'Both Families',
    "Groom's Workers", "Bride's Workers",
    'Market Center South', 'Market Center',
    'Friends of the Bride', 'Friends of the Groom',
    'Bride and her Girls',
  ];

  /* ================= RENDER: CEREMONY TIMELINE ================= */
  const timelineEl = document.getElementById('ceremonyTimeline');
  if (timelineEl) {
    const html = ceremonyItems.map(function (item) {
      let subHtml = '';
      if (item.sub && item.sub.length) {
        subHtml = '<div class="t-sub">' + item.sub.map(function (s) {
          if (s.type === 'song') {
            return '<div><span class="song-link" data-song="' + s.songNumber + '">🎵 ' + s.label + ' <span class="song-link-cue">(tap to view lyrics)</span></span></div>';
          }
          return '<div>' + s.label + '</div>';
        }).join('') + '</div>';
      }
      return (
        '<div class="t-item">' +
          '<div class="t-time">' + item.time + '</div>' +
          '<div class="t-node"></div>' +
          '<div class="t-body">' +
            '<div class="t-title">' + item.title + '</div>' +
            subHtml +
          '</div>' +
        '</div>'
      );
    }).join('');
    timelineEl.innerHTML = html;
  }

  /* ================= RENDER: PHOTOGRAPHY GRID ================= */
  const photoGridEl = document.getElementById('photographyGrid');
  if (photoGridEl) {
    photoGridEl.innerHTML = photographyOrder.map(function (name, i) {
      const num = String(i + 1).padStart(2, '0');
      return (
        '<div class="p-card">' +
          '<div class="p-num">' + num + '</div>' +
          '<div class="p-name">' + name + '</div>' +
        '</div>'
      );
    }).join('');
  }

  /* ================= COUNTDOWN TIMER ================= */
  // Wedding date/time: Saturday 17 October 2026, 1:00 PM (Ghana Standard Time, UTC+0)
  const weddingDate = new Date('2026-10-17T13:00:00+00:00').getTime();

  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins = document.getElementById('cd-mins');
  const cdSecs = document.getElementById('cd-secs');

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    const now = Date.now();
    let diff = weddingDate - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    if (cdDays) cdDays.textContent = pad(days);
    if (cdHours) cdHours.textContent = pad(hours);
    if (cdMins) cdMins.textContent = pad(mins);
    if (cdSecs) cdSecs.textContent = pad(secs);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------------------------------------------------------
     EDIT HERE: Song Lyrics
     Add/replace entries to populate the lyrics modal opened
     by a song-link in the ceremony timeline above.
     --------------------------------------------------------- */
  const songLyrics = {
    131: {
      title: '“Nea Onyankopɔn Aka Abom”',
      scripture: '(Mateo 19:5, 6)',
      body:
        '1. Yɛ-de ha-ma mmiɛn-sa\n' +
        'A-bom a-ni-gye mu.\n' +
        'Nyan-ko-pɔn ka wɔn ho nti\n' +
        'Wɔ-bɛ-do-dɔ wɔn ho.\n' +
        '\n' +
        '(NNYESO 1)\n' +
        'Wa-ka Ye-ho-wa ntam sɛ,\n' +
        'Ɔ-bɛ-dɔ ne ye-re.\n' +
        '‘Nea Nyan-ko-pɔn de a-bom,\n' +
        'O-bia-ra nnte-tew mu.’\n' +
        '\n' +
        '2. Wɔ-nim nea Bi-ble ka\n' +
        'Fa a-wa-re-fo ho.\n' +
        'Wɔ-bɛ-bɔ wɔn ho mmɔ-den\n' +
        'A-di wɔn ntam no so.\n' +
        '\n' +
        '(NNYESO 2)\n' +
        'Wa-ka Ye-ho-wa ntam sɛ,\n' +
        'Ɔ-bɛ-dɔ ne ku-nu.\n' +
        '‘Nea Nyan-ko-pɔn de a-bom,\n' +
        'O-bia-ra nnte-tew mu.’',
      footnote: '(Hwɛ Gen. 2:24; Ɔsɛnk. 4:12; Efe. 5:22-33 nso.)',
    },
    132: {
      title: 'Yɛaye Baako',
      scripture: '(Genesis 2:23, 24)',
      body:
        '1. Wo-ne me nnom-pe mu dom-pe,\n' +
        'Ho-nam mu nam; wo-ne m’a-ni-gye.\n' +
        'A-fei de ma-nya me dɔ-fo.\n' +
        'Wo-ne me ho-ka-fo.\n' +
        'Yɛa-yɛ baa-ko, me dɔ-fo pa.\n' +
        'Ye-ho-wa bɛ-ma yɛn n-hyi-ra.\n' +
        'Ɛn-nɛ yɛa-yɛ a-wa-re-fo,\n' +
        'Yɛ-bɛ-yɛ a-bu-sua.\n' +
        'Daa nyi-naa, yɛ-bɛ-som Ye-ho-wa.\n' +
        'Ɔ-bɛ-ky’rɛ yɛn kwan,\n' +
        'Yɛn dɔ no to ren-twa da!\n' +
        'Yɛa-ka ntam sɛ yɛ-bɛ-te-na\n' +
        'No-kwa-re-di mu a-ko-si daa.\n' +
        'Ye-ho-wa a-ka yɛn a-bom.\n' +
        'Wo-yɛ me dɔ-fo daa nyi-naa.',
      footnote: '(Hwɛ Gen. 29:18; Ɔsɛnk. 4:9, 10; 1 Kor. 13:8 nso.)',
    },
  };

  /* ================= SONG LYRICS MODAL ================= */
  const songModal = document.getElementById('songModal');
  const modalTitle = document.getElementById('modalSongTitle');
  const modalScripture = document.getElementById('modalSongScripture');
  const modalBody = document.getElementById('modalSongBody');
  const modalFootnote = document.getElementById('modalSongFootnote');
  const modalClose = document.getElementById('modalClose');

  document.addEventListener('click', function (e) {
    const target = e.target.closest('.song-link');
    if (target) {
      const num = target.getAttribute('data-song');
      const song = songLyrics[num];
      if (modalTitle) modalTitle.textContent = 'Dwom ' + num;
      if (song) {
        if (modalScripture) modalScripture.textContent = song.title + ' — ' + song.scripture;
        if (modalBody) modalBody.textContent = song.body;
        if (modalFootnote) modalFootnote.textContent = song.footnote;
      } else {
        if (modalScripture) modalScripture.textContent = '';
        if (modalBody) modalBody.textContent = 'Lyrics coming soon.';
        if (modalFootnote) modalFootnote.textContent = '';
      }
      if (songModal) songModal.classList.add('open');
    }
  });

  function closeModal() { if (songModal) songModal.classList.remove('open'); }
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (songModal) {
    songModal.addEventListener('click', function (e) {
      if (e.target === songModal) closeModal();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  /* ================= COPY ZOOM MEETING ID ================= */
  const copyBtn = document.getElementById('copyZoomBtn');
  const zoomIdEl = document.getElementById('zoomId');
  if (copyBtn && zoomIdEl) {
    copyBtn.addEventListener('click', function () {
      const text = zoomIdEl.textContent.trim();
      const done = function () {
        copyBtn.textContent = '✓ Copied!';
        copyBtn.classList.add('copied');
        setTimeout(function () {
          copyBtn.textContent = '📋 Copy Meeting ID';
          copyBtn.classList.remove('copied');
        }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          fallbackCopy(text); done();
        });
      } else {
        fallbackCopy(text); done();
      }
    });
  }
  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (err) { /* no-op */ }
    document.body.removeChild(ta);
  }

  /* ================= STICKY NAV: scrolled state + mobile toggle ================= */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    toggleBackToTop();
    updateActiveNav();
  });

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  /* Active nav link highlight based on scroll position */
  const sections = Array.from(document.querySelectorAll('section[id], header[id]'));
  const navAnchors = Array.from(document.querySelectorAll('.nav-links a'));
  function updateActiveNav() {
    let currentId = sections[0] ? sections[0].id : null;
    const scrollPos = window.scrollY + 120;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) currentId = sec.id;
    });
    navAnchors.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });
  }
  updateActiveNav();

  /* ================= BACK TO TOP ================= */
  const backToTop = document.getElementById('backToTop');
  function toggleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 500) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  }
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ================= REVEAL ON SCROLL ================= */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

});
