// ============================================================
// Demo panel: show/hide scenarios
// ============================================================
(function () {
  document.documentElement.classList.add('js');

  var demo = document.querySelector('[data-demo]');
  if (!demo) { return; }

  var buttons   = demo.querySelectorAll('button[data-scenario]');
  var scenarios = demo.querySelectorAll('.scenario');

  function show(name) {
    buttons.forEach(function (button) {
      button.setAttribute(
        'aria-pressed',
        String(button.getAttribute('data-scenario') === name)
      );
    });
    scenarios.forEach(function (scenario) {
      scenario.hidden = scenario.getAttribute('data-scenario') !== name;
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      show(button.getAttribute('data-scenario'));
    });
  });

  show('other');
})();


// ============================================================
// Scroll-reveal: fade + slide up on entering viewport
// ============================================================
(function () {
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) { return; }

  var revealEls = document.querySelectorAll('.reveal');
  var staggerGroups = document.querySelectorAll('.reveal-stagger');

  // Mark stagger children as reveal targets too
  staggerGroups.forEach(function (group) {
    var children = group.querySelectorAll('.reveal-child');
    children.forEach(function (child) {
      child.classList.add('reveal');
    });
  });

  // Refresh full list after adding stagger children
  revealEls = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(function (el) { observer.observe(el); });
})();


// ============================================================
// Active nav link highlight on scroll
// ============================================================
(function () {
  var navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
  if (!navLinks.length) { return; }

  var sections = Array.from(navLinks).map(function (link) {
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);

  function onScroll() {
    var scrollY = window.scrollY + 100;
    var current = sections[0];

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollY) { current = section; }
    });

    navLinks.forEach(function (link) {
      var active = current && link.getAttribute('href') === '#' + current.id;
      link.style.color = active ? 'var(--text)' : '';
      link.style.borderColor = active ? 'var(--border)' : '';
      link.style.background = active ? 'var(--bg-card)' : '';
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
