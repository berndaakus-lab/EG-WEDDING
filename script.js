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
      title: '“What God Has Yoked Together”',
      scripture: '(Matthew 19:5, 6)',
      body:
        '1. With dignity and joy,\n' +
        'A threefold cord is bound.\n' +
        'With God and men to witness,\n' +
        'These sacred vows resound.\n' +
        '\n' +
        '(CHORUS 1)\n' +
        'He vowed before Jehovah\n' +
        'To love her from the heart.\n' +
        '“What God has yoked together,\n' +
        'Let no man put apart.”\n' +
        '\n' +
        '2. They both have searched God’s Word\n' +
        'To learn to do his will,\n' +
        'And now they seek his blessing,\n' +
        'Their promise to fulfill.\n' +
        '\n' +
        '(CHORUS 2)\n' +
        'She vowed before Jehovah\n' +
        'To love him from the heart.\n' +
        '“What God has yoked together,\n' +
        'Let no man put apart.”',
      footnote: '(See also Gen. 2:24; Eccl. 4:12; Eph. 5:22-33.)',
    },
    132: {
      title: '“Now We Are One”',
      scripture: '(Genesis 2:23, 24)',
      body:
        '1. This is at last bone of my bone,\n' +
        'Flesh of my flesh; now I’m not alone.\n' +
        'God has provided a partner,\n' +
        'Someone to call my own.\n' +
        'Now we are one; now there can be\n' +
        'Blessings to share for you and for me.\n' +
        'As man and woman together,\n' +
        'We are a family.\n' +
        '\n' +
        '2. Ev’ry day we’ll serve our God above.\n' +
        'As he shows the way,\n' +
        'Unfailing love we’ll display.\n' +
        'As we have vowed, so may it be.\n' +
        'Seasons of joy, may we come to see.\n' +
        'Oh, may we honor Jehovah,\n' +
        'And may you always be my love.',
      footnote: '(See also Gen. 29:18; Eccl. 4:9, 10; 1 Cor. 13:8.)',
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
      if (modalTitle) modalTitle.textContent = 'Song ' + num;
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
