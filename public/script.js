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

// Fade-in on scroll using IntersectionObserver
const fadeEls = document.querySelectorAll(
  '.testimonial-card, .services-content, .contact-info, .contact-form-wrap, .pillar-card, .portfolio-card, .process-step, .why-snz-inner, .cta-close-inner'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
