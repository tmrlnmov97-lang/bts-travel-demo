/* BTS Group Travel — CMS hydration (sayt tərəfi). content.json -> səhifələr */
(function () {
  'use strict';

  function $(s, r) { return (r || document).querySelector(s); }
  function $all(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function txt(sel, val, root) { if (val == null) return; var el = $(sel, root); if (el) el.textContent = val; }
  function firstText(el, val) { if (!el || val == null) return; for (var i = 0; i < el.childNodes.length; i++) { if (el.childNodes[i].nodeType === 3) { el.childNodes[i].nodeValue = val + ' '; return; } } el.insertBefore(document.createTextNode(val + ' '), el.firstChild); }

  function fmtPrice(p) { return String(p || 0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' AZN'; }
  var MONTHS = { 'Yanvar':1,'Fevral':2,'Mart':3,'Aprel':4,'May':5,'İyun':6,'İyul':7,'Avqust':8,'Sentyabr':9,'Oktyabr':10,'Noyabr':11,'Dekabr':12 };
  function dateKey(s) { s = s || ''; var d = (s.match(/^(\d+)/) || [])[1] || 1; var mo = 1; for (var k in MONTHS) { if (s.indexOf(k) >= 0) { mo = MONTHS[k]; break; } } var y = (s.match(/(20\d\d)/) || [])[1] || 2026; return parseInt('' + y + ('0'+mo).slice(-2) + ('0'+d).slice(-2), 10); }
  function slugify(s) { return s.replace(/İ/g,'i').replace(/I/g,'i').replace(/ı/g,'i').replace(/ə/g,'e').replace(/Ə/g,'e').replace(/ç/g,'c').replace(/Ç/g,'c').replace(/ş/g,'s').replace(/Ş/g,'s').replace(/ö/g,'o').replace(/Ö/g,'o').replace(/ü/g,'u').replace(/Ü/g,'u').replace(/ğ/g,'g').replace(/Ğ/g,'g').toLowerCase().replace(/[–—]/g,'-').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  /* ---------- countdown ---------- */
  var _cd;
  function countdown() {
    if (_cd) clearInterval(_cd);
    var pad = function (n) { return ('0' + n).slice(-2); };
    var fmt = function (s) { return pad(Math.floor(s/3600)) + ':' + pad(Math.floor(s%3600/60)) + ':' + pad(s%60); };
    var els = $all('.deal-time'); if (!els.length) return;
    els.forEach(function (el) { el.textContent = fmt(parseInt(el.dataset.secs, 10) || 0); });
    _cd = setInterval(function () { els.forEach(function (el) { var s = parseInt(el.dataset.secs, 10); if (isNaN(s)) return; if (s > 0) { s--; el.dataset.secs = s; el.textContent = fmt(s); } else el.textContent = '00:00:00'; }); }, 1000);
  }

  /* ---------- HOME ---------- */
  function renderHome(C) {
    var h = C.hero || {};
    txt('.hero-eyebrow', h.eyebrow);
    txt('.hero-title .line1', h.line1);
    txt('.hero-title .line2', h.line2);
    txt('.hero-sub', h.sub);
    var bg = $('.hero-bg'); if (bg && h.bg) bg.src = h.bg;
    var b1 = $('.hero-actions .btn-primary'); if (b1 && h.btn1Text) { firstText(b1, h.btn1Text); if (h.btn1Link) b1.setAttribute('onclick', "location.href='" + h.btn1Link + "'"); }
    var b2 = $('.hero-actions .btn-ghost'); if (b2 && h.btn2Text) { b2.textContent = h.btn2Text; if (h.btn2Link) b2.setAttribute('onclick', "location.href='" + h.btn2Link + "'"); }

    var f = C.flash || {};
    txt('.flash .eyebrow', f.eyebrow); txt('.flash .sec-title', f.title); txt('.flash .sec-sub', f.sub);
    renderDeals(C);

    var bn = C.banner || {};
    txt('.ctab-title', bn.title); txt('.ctab-sub', bn.sub);
    var cb = $('.ctab-btn'); if (cb && bn.btnText) { firstText(cb, bn.btnText); if (bn.btnLink) cb.href = bn.btnLink; }
    var ci = $('.ctab-img'); if (ci && bn.image) ci.src = bn.image;

    var a = C.about || {};
    txt('.about-body .eyebrow', a.eyebrow); txt('.about-title', a.title); txt('.about-text', a.text);
    var ai = $('.about-media img'); if (ai && a.image) ai.src = a.image;

    renderCats(C);
    renderPop(C);
    renderSana(C);
    renderQrup(C);
  }

  /* ---------- ana səhifə: tur kartı (badge/timer yox) + Pop/Qrup/Sana ---------- */
  function tourCard(t) {
    return '<article class="deal-card" onclick="location.href=\'tur.html?id=' + esc(t.id || slugify(t.name)) + '\'">' +
      '<div class="deal-media"><img class="deal-img" src="' + esc(t.image) + '" alt="' + esc(t.name) + '" loading="lazy"></div>' +
      '<div class="deal-body"><div class="deal-region"><svg viewBox="0 0 24 24" fill="none" stroke="#6B7685" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.6"/></svg>' + esc(t.cat) + ' · ' + esc(t.date) + '</div>' +
      '<h3 class="deal-name">' + esc(t.name) + '</h3>' +
      '<div class="deal-seats"><span class="deal-dot"></span>' + esc(t.seats || '') + '</div>' +
      '<div class="deal-divider"></div>' +
      '<div class="deal-foot"><div class="deal-price"><span class="deal-new">' + fmtPrice(t.price) + '</span></div>' +
      '<button type="button" class="deal-arrow" aria-label="Ətraflı"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div></div></article>';
  }
  function nonFeat(C) { var l = (C.tours || []).filter(function (t) { return !t.featured; }); return l.length ? l : (C.tours || []); }
  function fillGrid(sel, list) { var g = $(sel); if (!g) return; g.innerHTML = (list || []).map(tourCard).join(''); }
  function renderPop(C)  { fillGrid('.pop-grid', nonFeat(C).slice(0, 4)); }
  function renderQrup(C) { var l = nonFeat(C).slice(4, 8); if (l.length < 4) l = nonFeat(C).slice(0, 4); fillGrid('.qrup-grid', l); }
  function renderSana(C) {
    var grid = $('.sana-grid'); if (!grid) return;
    var list = (C.sanatoriums || []).slice(0, 4); if (!list.length) return;
    grid.innerHTML = list.map(function (s) {
      return '<a class="sana-card" href="Əlaqə.html">' +
        '<img class="sana-img" src="' + esc(s.image) + '" alt="' + esc(s.name) + '" loading="lazy">' +
        (s.tag ? '<span class="sana-tag">' + esc(s.tag) + '</span>' : '') +
        '<div class="sana-body"><div class="sana-loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.6"/></svg>' + esc(s.location) + '</div>' +
        '<h3 class="sana-name">' + esc(s.name) + '</h3>' +
        '<div class="sana-foot"><span class="sana-price">' + fmtPrice(s.price) + (s.nights ? ' <span>· ' + esc(s.nights) + '</span>' : '') + '</span>' +
        '<span class="sana-go"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div></div></a>';
    }).join('');
  }

  function renderDeals(C) {
    var grid = $('.deal-grid'); if (!grid) return;
    var feat = (C.tours || []).filter(function (t) { return t.featured; });
    if (!feat.length) { return; }
    grid.innerHTML = feat.map(function (t) {
      var pad = function (n) { return ('0' + n).slice(-2); };
      var secs = t.timer || 0;
      var tstr = pad(Math.floor(secs/3600)) + ':' + pad(Math.floor(secs%3600/60)) + ':' + pad(secs%60);
      var badge = t.discount ? '<span class="deal-badge"><svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2C12 2 5 9 5 14a7 7 0 0 0 14 0c0-5-7-12-7-12z"/></svg>' + esc(t.discount) + '</span>' : '';
      var timer = secs ? '<span class="deal-timer"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 1.8"/></svg><span class="deal-time" data-secs="' + secs + '">' + tstr + '</span></span>' : '';
      var old = (t.oldPrice && t.oldPrice > t.price) ? '<span class="deal-old">' + fmtPrice(t.oldPrice) + '</span>' : '';
      return '<article class="deal-card" onclick="location.href=\'tur.html?id=' + esc(t.id || slugify(t.name)) + '\'">' +
        '<div class="deal-media"><img class="deal-img" src="' + esc(t.image) + '" alt="' + esc(t.name) + '" loading="lazy">' + badge + timer + '</div>' +
        '<div class="deal-body"><div class="deal-region"><svg viewBox="0 0 24 24" fill="none" stroke="#6B7685" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.6"/></svg>' + esc(t.cat) + ' · ' + esc(t.date) + '</div>' +
        '<h3 class="deal-name">' + esc(t.name) + '</h3>' +
        '<div class="deal-seats"><span class="deal-dot"></span>' + esc(t.seats || '') + '</div>' +
        '<div class="deal-divider"></div>' +
        '<div class="deal-foot"><div class="deal-price">' + old + '<span class="deal-new">' + fmtPrice(t.price) + '</span></div>' +
        '<button type="button" class="deal-arrow" aria-label="Ətraflı"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div></div></article>';
    }).join('');
    countdown();
  }

  function renderCats(C) {
    var grid = $('.cat-grid'); if (!grid || !C.categories) return;
    grid.innerHTML = C.categories.map(function (c) {
      return '<div class="cat" onclick="location.href=\'' + esc(c.link || 'Turlar.html') + '\'">' +
        '<img src="' + esc(c.image) + '" alt="' + esc(c.name) + '" loading="lazy" decoding="async">' +
        '<div class="cat-body"><span class="cat-name">' + esc(c.name) + '</span>' +
        '<span class="cat-go"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div></div>';
    }).join('');
  }

  /* ---------- CATALOG (Turlar.html) ---------- */
  function renderCatalog(C) {
    if (typeof window.render !== 'function') return;
    window.tours = (C.tours || []).map(function (t) {
      return { name: t.name, date: t.date, dateKey: dateKey(t.date), price: t.price,
        badge: (t.seats || '').toUpperCase(), status: t.status, cat: t.cat, src: t.image };
    });
    // chip counts
    $all('#filterBar .chip').forEach(function (chip) {
      var cat = chip.dataset.cat, c = chip.querySelector('.cnt');
      var n = cat === 'all' ? window.tours.length : window.tours.filter(function (t) { return t.cat === cat; }).length;
      if (c) c.textContent = n;
    });
    window.render();
  }

  /* ---------- TOUR DETAIL (tur.html / detail) ---------- */
  function renderTour(C) {
    var id = new URLSearchParams(location.search).get('id');
    var list = C.tours || [];
    var t = null;
    if (id) for (var i = 0; i < list.length; i++) { if ((list[i].id || slugify(list[i].name)) === id) { t = list[i]; break; } }
    if (!t) for (var j = 0; j < list.length; j++) { if ((list[j].id || slugify(list[j].name)) === 'roma-milan-paris-turu') { t = list[j]; break; } }
    if (!t) return;
    function setPill(el, s) { if (!el) return; [].slice.call(el.childNodes).forEach(function (n) { if (n.nodeType === 3) n.remove(); }); el.appendChild(document.createTextNode(s)); }
    document.title = t.name + ' — BTS Group Travel';
    txt('.ttl-h1', t.name); txt('.cur', t.name);
    txt('.lead', t.cities + ' — ' + t.days + ' ərzində diqqətlə qurulmuş marşrut. Kiçik qrup, əl ilə seçilmiş otellər və yerli bələdçi ilə unudulmaz təcrübə.');
    var im = $('.hero-media img'); if (im) { im.src = t.image; im.alt = t.name; }
    var pb = $('.book-price b'); if (pb) pb.textContent = fmtPrice(t.price).replace(' AZN', '');
    var pills = $all('.ttl-meta .meta-pill');
    if (pills[0]) setPill(pills[0], t.date);
    if (pills[1]) setPill(pills[1], t.cat + ' · ' + t.days);
    setPill($('.book-date'), t.date);
    txt('.reg-title', t.cities);
    if (typeof window.renderTourExtras === 'function') window.renderTourExtras(t, C);
  }

  /* ---------- BOOKING -> /api/leads ---------- */
  function wireBooking() {
    var form = $('#regForm'); if (!form) return;
    window.submitReg = function (e) {
      e.preventDefault();
      var btn = $('#regSubmit'); if (btn) { btn.classList.add('loading'); btn.disabled = true; }
      var g = function (n) { var el = form.querySelector('[name=' + n + ']'); return el ? el.value.trim() : ''; };
      var lead = { name: g('name'), passport: g('passport'), fin: g('fin'), email: g('email'),
        whatsapp: g('whatsapp'), tour: ($('.reg-title') ? $('.reg-title').textContent : '') };
      fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) })
        .then(function (r) { return r.ok ? r.json() : { ok: true }; })
        .then(function (d) { finishReg(!!(d && d.ok), btn, form); })
        .catch(function () { finishReg(true, btn, form); });
    };
  }
  function finishReg(ok, btn, form) {
    form.style.display = 'none';
    var el = document.getElementById(ok ? 'regSuccess' : 'regError');
    if (el) { el.classList.remove('show'); void el.offsetWidth; el.classList.add('show'); }
    if (btn) { btn.classList.remove('loading'); btn.disabled = false; }
  }

  /* ---------- boot ---------- */
  function boot(C) {
    var page = (document.body && document.body.dataset.cms) || '';
    try {
      if (page === 'home') renderHome(C);
      else if (page === 'catalog') renderCatalog(C);
      else if (page === 'tour') renderTour(C);
      wireBooking();
    } catch (e) { /* статика остаётся как есть */ }
  }

  function start() {
    fetch('content.json', { credentials: 'same-origin' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (C) { if (C) boot(C); else wireBooking(); })
      .catch(function () { wireBooking(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
