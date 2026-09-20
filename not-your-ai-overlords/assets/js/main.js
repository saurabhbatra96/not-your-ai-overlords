/* Not Your A.I. Overlords — progressive enhancements only.
   Everything below is optional: the theme works with JS disabled. */
(function () {
    'use strict';

    /* Mobile navigation ---------------------------------------------------- */
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            var open = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!open));
            nav.classList.toggle('is-open', !open);
        });

        // Close the menu when the layout grows back past the breakpoint,
        // so the desktop nav is never left in the collapsed state.
        var wide = window.matchMedia('(min-width: 720px)');
        var reset = function (event) {
            if (event.matches) {
                toggle.setAttribute('aria-expanded', 'false');
                nav.classList.remove('is-open');
            }
        };
        if (wide.addEventListener) {
            wide.addEventListener('change', reset);
        } else if (wide.addListener) {
            wide.addListener(reset);
        }
    }
}());
