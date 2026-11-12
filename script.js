var yr = document.getElementById('year');
if (yr) {
  yr.textContent = new Date().getFullYear();
}

var FONTS = [
  'Anton',
  'Bungee',
  'Permanent Marker',
  'Special Elite',
  'Black Ops One',
];
function ransom(el, seed) {
  var text = el.textContent.trim(),
    s = seed;
  function rnd() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  }
  el.setAttribute('aria-label', text);
  el.textContent = '';
  text.split(' ').forEach(function (word, wi) {
    if (wi > 0) {
      el.appendChild(document.createTextNode(' '));
    }
    var wrap = document.createElement('span');
    wrap.className = 'w';
    word.split('').forEach(function (ch) {
      var sp = document.createElement('span');
      sp.className = 'c' + Math.floor(rnd() * 3);
      sp.textContent = rnd() > 0.45 ? ch.toUpperCase() : ch.toLowerCase();
      sp.style.fontFamily =
        "'" + FONTS[Math.floor(rnd() * FONTS.length)] + "',Impact,sans-serif";
      sp.style.transform = 'rotate(' + ((rnd() - 0.5) * 12).toFixed(1) + 'deg)';
      wrap.appendChild(sp);
    });
    el.appendChild(wrap);
  });
}
document.querySelectorAll('[data-ransom]').forEach(function (el, i) {
  ransom(el, i * 7 + 3);
});

var links = [].slice.call(document.querySelectorAll('.menu a'));
if (links.length) {
  var desc = document.getElementById('desc'),
    num = document.getElementById('num');
  var select = function (a) {
    links.forEach(function (l) {
      l.classList.toggle('sel', l === a);
    });
    desc.textContent = a.dataset.desc;
    num.textContent = '0' + (links.indexOf(a) + 1);
  };
  links.forEach(function (a) {
    a.addEventListener('mouseenter', function () {
      select(a);
    });
    a.addEventListener('focus', function () {
      select(a);
    });
  });
  select(links[0]);
  document.addEventListener('keydown', function (e) {
    var i = links.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      links[(i + 1) % links.length].focus();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      links[(i <= 0 ? links.length : i) - 1].focus();
    }
  });
}

var btn = document.querySelector('.menu-btn'),
  list = document.getElementById('menu');
if (btn && list) {
  btn.addEventListener('click', function () {
    var open = list.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
}

var lightbox = document.getElementById('lightbox');
if (lightbox && lightbox.showModal) {
  var lbImg = document.getElementById('lb-img');
  var lbCap = document.getElementById('lb-cap');
  document.querySelectorAll('.certs a.card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      var href = card.getAttribute('href');
      if (!/\.(png|jpe?g|gif|webp|svg|avif)$/i.test(href)) {
        return;
      }
      e.preventDefault();
      var thumb = card.querySelector('img');
      lbImg.src = href;
      lbImg.alt = thumb ? thumb.alt : '';
      lbCap.textContent = card.querySelector('h3').textContent;
      lightbox.showModal();
    });
  });
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target.classList.contains('lb-close')) {
      lightbox.close();
    }
  });
}

if (document.getElementById('form')) {
  window.formspree =
    window.formspree ||
    function () {
      (formspree.q = formspree.q || []).push(arguments);
    };
  formspree('initForm', { formElement: '#form', formId: 'mgaajalw' });
}

document.querySelectorAll('.int-btn').forEach(function (button) {
  var dialog = document.getElementById('topic-' + button.dataset.topic);
  if (dialog && dialog.showModal) {
    button.addEventListener('click', function () {
      dialog.showModal();
    });
  }
});

document.querySelectorAll('.topic-dialog').forEach(function (dialog) {
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog || e.target.classList.contains('topic-close')) {
      dialog.close();
    }
  });
});