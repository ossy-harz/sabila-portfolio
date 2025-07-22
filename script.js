
// Animate sections on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
  section.classList.remove('fade-in');
  observer.observe(section);
});

// Dark/Light mode toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

function setTheme(dark) {
  if (dark) {
    body.classList.add('dark');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    body.classList.remove('dark');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

// Persist theme preference
const userPref = localStorage.getItem('theme');
if (userPref === 'dark' || (userPref === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  setTheme(true);
} else {
  setTheme(false);
}

themeToggle.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark');
  setTheme(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Scrollspy for sticky nav
const navLinks = document.querySelectorAll('.sticky-nav a');
const sections = Array.from(document.querySelectorAll('main > section'));

function onScrollSpy() {
  let scrollPos = window.scrollY + 120; // Offset for sticky nav
  let currentSection = sections[0];
  for (const section of sections) {
    if (section.offsetTop <= scrollPos) {
      currentSection = section;
    }
  }
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentSection.id}`);
  });
}
window.addEventListener('scroll', onScrollSpy);
onScrollSpy();
