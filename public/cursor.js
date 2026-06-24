(function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  var dot  = document.querySelector('.cursor-dot');
  var ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  var mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    dot.classList.add('is-visible');
    ring.classList.add('is-visible');
  });

  document.addEventListener('mouseleave', function () {
    dot.classList.remove('is-visible');
    ring.classList.remove('is-visible');
  });

  document.querySelectorAll('a, button').forEach(function (el) {
    el.addEventListener('mouseenter', function () { ring.classList.add('is-hovered'); });
    el.addEventListener('mouseleave', function () { ring.classList.remove('is-hovered'); });
  });

  function lerp(a, b, t) { return a + (b - a) * t; }
  (function tick() {
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(tick);
  }());
}());
