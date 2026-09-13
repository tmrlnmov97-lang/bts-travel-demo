/* BTS Group Travel — dil dəyişdirici (AZ / RU / EN).
   Yalnız idarəetmə elementini əlavə edir: başlıqda düymə, futerdə seqment.
   Səhifənin mətninə, ölçülərinə və düzümünə toxunmur. */
(function () {
  'use strict';

  var LANGS = ['az', 'ru', 'en'];
  var KEY = 'bts_lang';
  var cur = 'az';

  var GLOBE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/>' +
    '<path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/></svg>';

  var CSS =
    /* başlıq: dil düyməsi və «Bizimlə əlaqə» bir qrupda, aralarında 20px */
    '.lang-group{display:flex;align-items:center;align-self:center;gap:20px;flex:0 0 auto}' +
    '.lang{position:relative;display:inline-flex;flex:0 0 auto;font-family:inherit}' +
    '.lang-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 16px;' +
      'border:1px solid var(--line,#E8EBF2);border-radius:12px;background:#fff;' +
      /* line-height sabitdir: səhifədən miras qalan dəyər hündürlüyü şişirdir */
      'color:var(--navy,#0D2035);font-family:inherit;font-size:14px;font-weight:700;line-height:18px;' +
      'cursor:pointer;transition:border-color .2s,color .2s}' +
    '.lang-btn svg{width:17px;height:17px;color:var(--muted,#5E6B7D);flex:0 0 auto;transition:color .2s}' +
    '.lang-btn:hover{border-color:var(--indigo,#3534F0);color:var(--indigo,#3534F0)}' +
    '.lang-btn:hover svg{color:var(--indigo,#3534F0)}' +
    '.lang-menu{position:absolute;top:calc(100% + 8px);right:0;min-width:104px;padding:6px;' +
      'background:#fff;border:1px solid var(--line,#E8EBF2);border-radius:12px;' +
      'box-shadow:0 22px 44px -20px rgba(13,32,53,.4);display:none;flex-direction:column;gap:2px;z-index:120}' +
    '.lang.open .lang-menu{display:flex}' +
    '.lang-menu button{padding:9px 11px;border:0;border-radius:8px;background:transparent;' +
      'color:var(--ink,#16263A);font-family:inherit;font-size:13px;font-weight:600;' +
      'text-align:left;cursor:pointer;transition:background .18s,color .18s}' +
    '.lang-menu button:hover{background:var(--mist,#F4F6FB)}' +
    '.lang-menu button.on{color:var(--indigo,#3534F0);font-weight:800}' +
    /* futer: mövcud elementlər yerindən tərpənmir, seqment sadəcə sona əlavə olunur */
    /* align-self: bəzi səhifələrdə futerdə align-items:center yoxdur və element dartılır */
    '.lang-seg{display:inline-flex;align-items:center;align-self:center;gap:9px;flex:0 0 auto;font-family:inherit}' +
    '.lang-seg>svg{width:17px;height:17px;color:var(--muted2,#97A0AE);flex:0 0 auto}' +
    '.lang-seg .lang-sw{display:inline-flex;padding:2px;gap:2px;background:var(--mist,#F4F6FB);' +
      'border:1px solid var(--line,#E8EBF2);border-radius:9px}' +
    '.lang-seg .lang-sw button{padding:5px 12px;border:0;border-radius:7px;background:transparent;' +
      'color:var(--muted2,#97A0AE);font-family:inherit;font-size:12px;font-weight:700;line-height:14px;' +
      'letter-spacing:.04em;cursor:pointer;transition:background .18s,color .18s}' +
    '.lang-seg .lang-sw button:hover{color:var(--ink,#16263A)}' +
    '.lang-seg .lang-sw button.on{background:var(--navy,#0D2035);color:#fff}' +
    '@media (max-width:600px){.lang-group{gap:12px}.lang-btn{padding:11px 12px;gap:6px}}';

  function el(html) {
    var d = document.createElement('div');
    d.innerHTML = html;
    return d.firstElementChild;
  }

  function injectCss() {
    if (document.getElementById('lang-css')) return;
    var s = document.createElement('style');
    s.id = 'lang-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function buildHeader() {
    var hdr = document.querySelector('.hdr');
    if (!hdr || hdr.querySelector('.lang')) return;

    var box = el('<div class="lang">' +
      '<button class="lang-btn" type="button" aria-haspopup="true" aria-expanded="false" ' +
        'aria-label="Dil / Язык / Language">' + GLOBE + '<span class="code">AZ</span></button>' +
      '<div class="lang-menu" role="menu">' +
        LANGS.map(function (l) {
          return '<button type="button" role="menuitem" data-lang="' + l + '">' + l.toUpperCase() + '</button>';
        }).join('') +
      '</div></div>');

    var call = hdr.querySelector('.btn-call');
    if (call && call.parentNode) {
      // Düyməni sadəcə dördüncü element kimi əlavə etsək, space-between düzümü dağıdar.
      // Ona görə dil düyməsi ilə «Bizimlə əlaqə» bir qrupa yığılır: aralarında 20px.
      var group = document.createElement('div');
      group.className = 'lang-group';
      call.parentNode.insertBefore(group, call);
      group.appendChild(box);
      group.appendChild(call);
    } else {
      hdr.appendChild(box);
    }

    var btn = box.querySelector('.lang-btn');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = box.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    function close() {
      box.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-lang]');
      if (!b) return;
      set(b.getAttribute('data-lang'));
      close();
    });
    document.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  function buildFooter() {
    var bar = document.querySelector('.footer-bottom');
    if (!bar || bar.querySelector('.lang-seg')) return;

    var seg = el('<div class="lang-seg">' + GLOBE +
      '<div class="lang-sw" role="group" aria-label="Dil / Язык / Language">' +
      LANGS.map(function (l) {
        return '<button type="button" data-lang="' + l + '">' + l.toUpperCase() + '</button>';
      }).join('') + '</div></div>');

    // Mövcud elementləri DOM-da yerindən tərpətmirik: başqa valideynə keçirmək
    // CSS seçicilərinin uyğunluğunu dəyişir və düzümü poza bilər.
    // Seqment sadəcə sona əlavə olunur; ikinci elementə margin-left:auto verilir —
    // kopirayt solda qalır, qalanı isə əvvəlki kimi sağa yığılır.
    var had = bar.children.length;
    bar.appendChild(seg);
    if (had >= 2) bar.children[1].style.marginLeft = 'auto';

    seg.addEventListener('click', function (e) {
      var b = e.target.closest('[data-lang]');
      if (b) set(b.getAttribute('data-lang'));
    });
  }

  function sync() {
    var code = document.querySelector('.lang-btn .code');
    if (code && code.textContent !== cur.toUpperCase()) code.textContent = cur.toUpperCase();
    [].forEach.call(document.querySelectorAll('[data-lang]'), function (b) {
      b.classList.toggle('on', b.getAttribute('data-lang') === cur);
    });
  }

  function set(lang) {
    if (LANGS.indexOf(lang) < 0) return;
    cur = lang;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    sync();
  }

  function init() {
    injectCss();
    buildHeader();
    buildFooter();
    try { cur = localStorage.getItem(KEY) || 'az'; } catch (e) { cur = 'az'; }
    if (LANGS.indexOf(cur) < 0) cur = 'az';
    sync();
  }

  window.btsLang = { set: set, get: function () { return cur; } };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
