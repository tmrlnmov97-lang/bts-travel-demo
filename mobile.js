/* BTS Group Travel — mobil menyu (hamburger). Mövcud naviqasiyadan qurulur. */
(function () {
  'use strict';
  function build() {
    var hdr = document.querySelector('.hdr');
    if (!hdr || document.querySelector('.mnav-btn')) return;
    var nav = document.querySelector('.site-header .nav');
    var call = document.querySelector('.hdr .btn-call');
    var brandImg = document.querySelector('.hdr .brand img');

    var btn = document.createElement('button');
    btn.className = 'mnav-btn'; btn.type = 'button'; btn.setAttribute('aria-label', 'Menyu');
    btn.innerHTML = '<span></span><span></span><span></span>';
    hdr.appendChild(btn);

    var links = nav ? [].map.call(nav.querySelectorAll('a'), function (a) {
      return '<a href="' + a.getAttribute('href') + '">' + a.textContent.trim() + '</a>';
    }).join('') : '';

    var callIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
    var callHtml = call ? '<a class="mnav-call" href="' + call.getAttribute('href') + '">' + callIcon + (call.textContent.trim() || 'Bizimlə əlaqə') + '</a>' : '';
    var logo = brandImg ? '<img src="' + brandImg.getAttribute('src') + '" alt="BTS Group Travel">' : '<b>BTS Group Travel</b>';

    var ov = document.createElement('div');
    ov.className = 'mnav-overlay';
    ov.innerHTML = '<aside class="mnav-panel"><div class="mnav-head">' + logo +
      '<button class="mnav-close" type="button" aria-label="Bağla">&times;</button></div>' +
      '<nav class="mnav-links">' + links + '</nav>' + callHtml + '</aside>';
    document.body.appendChild(ov);

    function open() { ov.classList.add('on'); btn.classList.add('on'); document.body.style.overflow = 'hidden'; }
    function close() { ov.classList.remove('on'); btn.classList.remove('on'); document.body.style.overflow = ''; }
    btn.addEventListener('click', function () { ov.classList.contains('on') ? close() : open(); });
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    ov.querySelector('.mnav-close').addEventListener('click', close);
    [].forEach.call(ov.querySelectorAll('.mnav-links a, .mnav-call'), function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }
  /* ---- klikləbilən kartları klaviatura üçün əlçatan et (.cat / .deal-card / .tcard / .fcard) ---- */
  var CARD_SEL = '.cat, .deal-card, .tcard, .fcard';
  function markCards(root) {
    [].forEach.call((root || document).querySelectorAll(CARD_SEL), function (el) {
      if (el.__a11y) return; el.__a11y = true;
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
      if (!el.hasAttribute('role')) el.setAttribute('role', 'link');
    });
  }
  function watchGrids() {
    ['.cat-grid', '.deal-grid', '#tourGrid'].forEach(function (sel) {
      var g = document.querySelector(sel); if (!g || !window.MutationObserver) return;
      new MutationObserver(function () { markCards(g); }).observe(g, { childList: true });
    });
  }
  // Enter sfokuslanmış kartı işə salır (role="link" semantikası)
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    var el = document.activeElement;
    if (el && el.matches && el.matches(CARD_SEL)) { e.preventDefault(); el.click(); }
  });

  /* ---- tur detalı: sabit aşağı CTA bar (yalnız mobil) ---- */
  function buildBookBar() {
    if (!document.body || document.body.dataset.cms !== 'tour') return;
    if (document.querySelector('.book-bar')) return;
    var reg = document.querySelector('.book .btn-primary, .book-cta .btn-primary');
    if (!reg) return;
    var wa = document.querySelector('.book .btn-wa, .book-cta .btn-wa');
    var waHref = wa ? wa.getAttribute('href') : 'https://wa.me/994120000000';

    var bar = document.createElement('div');
    bar.className = 'book-bar';
    bar.innerHTML =
      '<a class="bb-wa" href="' + waHref + '" target="_blank" rel="noopener" aria-label="WhatsApp ilə yaz">' +
        '<svg viewBox="0 0 24 24" fill="#1FA463"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.78 14.04c-.24.68-1.4 1.3-1.93 1.38-.49.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-2.99 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36.19 0 .39.01.56.01.18.01.42-.07.66.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.17.29.74 1.22 1.59 1.97 1.09.97 2.01 1.27 2.3 1.42.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.66-.14.27.1 1.69.8 1.98.94.29.14.48.22.55.34.07.12.07.7-.17 1.38z"/></svg>' +
        '<span>WhatsApp</span></a>' +
      '<button class="bb-reg" type="button">Tura qeydiyyat</button>';
    document.body.appendChild(bar);
    document.body.classList.add('has-book-bar');
    bar.querySelector('.bb-reg').addEventListener('click', function () {
      if (typeof window.openReg === 'function') window.openReg(); else reg.click();
    });
    // bar həmişə ekranın altına sabitlənir (scroll zamanı gizlənmir)
  }

  function init() { build(); markCards(); watchGrids(); buildBookBar(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
