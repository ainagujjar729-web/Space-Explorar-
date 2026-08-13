const starField = document.getElementById('stars');
const yearElement = document.getElementById('year');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.nav-link');
const revealItems = document.querySelectorAll('.reveal');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

function createStars() {
  if (!starField) return;

  const count = 120;

  for (let i = 0; i < count; i += 1) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = `${Math.random() * 3 + 1}px`;
    star.style.height = star.style.width;
    star.style.animationDelay = `${Math.random() * 4}s`;
    star.style.opacity = `${(Math.random() * 0.8 + 0.2).toFixed(2)}`;
    starField.appendChild(star);
  }
}

function toggleMenu() {
  if (!nav || !menuToggle) return;

  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
}

function setActiveLink() {
  const sections = document.querySelectorAll('main section[id]');

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    const currentScroll = window.scrollY;

    const link = document.querySelector(`.nav-link[href="#${section.id}"]`);

    if (link && currentScroll >= top && currentScroll < bottom) {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

if (menuToggle) {
  menuToggle.addEventListener('click', toggleMenu);
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', () => {
  createStars();
  setActiveLink();
  revealItems.forEach((item) => item.classList.add('visible'));
});

const heroVisual = document.querySelector('.planet-scene');

if (heroVisual) {
  heroVisual.addEventListener('pointermove', (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
    heroVisual.style.transform = `rotateX(${(-y).toFixed(2)}deg) rotateY(${x.toFixed(2)}deg)`;
  });

  heroVisual.addEventListener('pointerleave', () => {
    heroVisual.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}
