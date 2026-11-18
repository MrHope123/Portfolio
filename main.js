// Progressive enhancement: without JavaScript both responses are shown one after the other.
// With JavaScript the visitor picks who sends the request and sees that one response.
(function () {
  document.documentElement.classList.add('js');

  var demo = document.querySelector('[data-demo]');
  if (!demo) { return; }

  var buttons = demo.querySelectorAll('button[data-scenario]');
  var scenarios = demo.querySelectorAll('.scenario');

  function show(name) {
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.getAttribute('data-scenario') === name));
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
