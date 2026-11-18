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

  // Collect all stagger children and mark them as reveal targets
  // before we hide anything, so the list is complete
  document.querySelectorAll('.reveal-stagger').forEach(function (group) {
    group.querySelectorAll('.reveal-child').forEach(function (child) {
      child.classList.add('reveal');
    });
  });

  var revealEls = Array.from(document.querySelectorAll('.reveal'));

  // If reduced motion, never hide anything — just leave elements visible
  if (prefersReduced) { return; }

  if (!('IntersectionObserver' in window)) { return; }

  // Use two rAF calls to guarantee the browser has painted at least one
  // frame before we apply opacity:0, so there is no flash of invisible content
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {

      // Now safe to activate the CSS hide rule
      document.documentElement.classList.add('js-reveal-ready');

      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
      );

      revealEls.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        // Already on screen when page loads — reveal with a short stagger
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setTimeout(function () { el.classList.add('visible'); }, 120);
        } else {
          observer.observe(el);
        }
      });

    });
  });
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
      link.style.color        = active ? 'var(--text)'    : '';
      link.style.borderColor  = active ? 'var(--border)'  : '';
      link.style.background   = active ? 'var(--bg-card)' : '';
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
