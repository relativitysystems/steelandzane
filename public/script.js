// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav when a link is clicked
siteNav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Shrink header on scroll
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.style.background = window.scrollY > 40
    ? 'rgba(31, 28, 25, 1)'
    : 'rgba(31, 28, 25, 0.96)';
});

// Contact form — POST to /api/contact serverless function
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = form.querySelector('input[name="email"]').value.trim();
  if (!email) {
    form.querySelector('input[name="email"]').focus();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  const body = {
    name: form.querySelector('input[name="name"]').value.trim(),
    email,
    phone: form.querySelector('input[name="phone"]').value.trim(),
    message: form.querySelector('textarea[name="message"]').value.trim(),
  };

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      submitBtn.style.display = 'none';
      successMsg.classList.add('visible');
    } else {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      alert('Something went wrong. Please email us directly at book@steelandzane.com');
    }
  } catch {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
    alert('Something went wrong. Please email us directly at book@steelandzane.com');
  }
});

// Scroll reveal — fires once per element when it enters the viewport
const revealEls = document.querySelectorAll('.reveal, .reveal-pop, .reveal-fade');
if (revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = entry.target.dataset.delay ? parseInt(entry.target.dataset.delay) * 100 : 0;
      setTimeout(() => entry.target.classList.add('is-visible'), delay);
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));
}

// Count-up animation for credibility stats
const statEls = document.querySelectorAll('.stat-number[data-target]');
if (statEls.length) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      countObserver.unobserve(entry.target);
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const useComma = el.dataset.comma === 'true';
      const duration = 1800;
      const start = performance.now();
      function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.round(easeOut(progress) * target);
        el.textContent = (useComma ? value.toLocaleString() : value) + suffix;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = (useComma ? target.toLocaleString() : target) + suffix;
          el.classList.add('stat-landed');
        }
      }
      el.textContent = '0' + suffix;
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
  statEls.forEach(el => countObserver.observe(el));
}
