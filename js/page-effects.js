// =========================================================================
// DONDE OMAR PARRILLAS — EFECTOS VISUALES Y TRANSICIONES (page-effects.js)
// =========================================================================

(function () {
    'use strict';

    // ── Textos rotativos del loader ──
    var LOADING_MSGS = [
        'Alistando la parrilla... 🔥',
        'Asando los cortes... 🥩',
        'Calentando carbones... 🪵',
        'Poniendo el chimichurri... 🌿',
        'Casi listo... ¡prepara tu apetito! 🍽️',
        'Preparando el sabor al carbón... 🌶️'
    ];
    var msgIndex = 0;
    var msgInterval = null;

    // ── Construir el HTML del loader ──
    function buildLoader() {
        var el = document.createElement('div');
        el.id = 'page-loader';
        el.setAttribute('aria-label', 'Cargando página');
        el.setAttribute('role', 'status');
        el.innerHTML =
            '<div class="loader-center">' +
                '<div class="loader-burger-wrapper">' +
                    '<div class="loader-ring-outer"></div>' +
                    '<div class="loader-ring-inner"></div>' +
                    '<div class="loader-halo"></div>' +
                    '<img src="assets/logo.png" alt="Donde Omar Logo" class="loader-burger-img" ' +
                         'onerror="this.outerHTML=\'<div style=\\\'font-size:90px;line-height:1;font-family:&quot;Noto Color Emoji&quot;,serif;\\\'>🔥</div>\'">' +
                '</div>' +
                '<div class="loader-brand">DONDE <span>OMAR</span></div>' +
                '<div class="loader-bar-wrap"><div class="loader-bar" id="loader-bar-fill"></div></div>' +
                '<div class="loader-status" id="loader-status-text">Alistando la parrilla... 🔥</div>' +
                '<div class="loader-dots"><span></span><span></span><span></span></div>' +
            '</div>';
        return el;
    }

    // ── Crear e insertar el loader (visible por defecto) ──
    var loader = document.getElementById('page-loader');
    if (!loader) {
        loader = buildLoader();
        if (document.body) {
            document.body.insertBefore(loader, document.body.firstChild);
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                document.body.insertBefore(loader, document.body.firstChild);
            });
        }
    }

    // ── Rotar mensajes de estado ──
    function startMsgRotation() {
        var el = document.getElementById('loader-status-text');
        if (!el) return;
        msgIndex = 0;
        el.textContent = LOADING_MSGS[0];
        if (msgInterval) clearInterval(msgInterval);
        msgInterval = setInterval(function () {
            msgIndex = (msgIndex + 1) % LOADING_MSGS.length;
            var statusEl = document.getElementById('loader-status-text');
            if (statusEl) statusEl.textContent = LOADING_MSGS[msgIndex];
        }, 800);
    }

    function stopMsgRotation() {
        if (msgInterval) { clearInterval(msgInterval); msgInterval = null; }
    }

    // ── Reiniciar barra de progreso ──
    function resetBar() {
        var bar = document.getElementById('loader-bar-fill');
        if (!bar) return;
        bar.style.animation = 'none';
        bar.offsetHeight; // forzar reflow
        bar.style.animation = '';
    }

    // ── Ocultar loader con fade ──
    function hideLoader() {
        stopMsgRotation();
        if (loader) {
            loader.classList.add('loader-hidden');
        }
        
        // Aplicar animación de entrada a elementos no-fixed
        var mainEl = document.querySelector('main');
        if (mainEl) {
            mainEl.classList.add('page-enter');
            setTimeout(function() { mainEl.classList.remove('page-enter'); }, 500);
        }
    }

    // ─────────────────────────────────────────────
    // CARGA INICIAL Y RECARGA
    // Duración mínima garantizada: 2.0 segundos para ver la animación
    // ─────────────────────────────────────────────
    var MIN_SHOW_MS = 2000;
    var pageStartTime = Date.now();

    startMsgRotation();

    function scheduleHide() {
        var elapsed = Date.now() - pageStartTime;
        var remaining = Math.max(0, MIN_SHOW_MS - elapsed);
        setTimeout(hideLoader, remaining);
    }

    if (document.readyState === 'complete') {
        scheduleHide();
    } else {
        window.addEventListener('load', scheduleHide);
    }

    // Seguro: forzar ocultado tras 7s máximo (si 'load' no dispara)
    setTimeout(function () {
        if (loader && !loader.classList.contains('loader-hidden')) {
            hideLoader();
        }
    }, 7000);

    // ─────────────────────────────────────────────
    // SCROLL PROGRESS BAR (barra en la parte superior)
    // ─────────────────────────────────────────────
    var progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress-bar';

    function insertProgressBar() {
        if (!document.getElementById('scroll-progress-bar')) {
            document.body.appendChild(progressBar);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insertProgressBar);
    } else {
        insertProgressBar();
    }

    window.addEventListener('scroll', function () {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = pct + '%';
    }, { passive: true });

    // ─────────────────────────────────────────────
    // CONFETTI AL AGREGAR AL CARRITO
    // window.spawnConfetti(x, y)
    // ─────────────────────────────────────────────
    var CONFETTI_COLORS = ['#e11d48', '#facc15', '#fbbf24', '#ffffff', '#f97316', '#ffedd5'];

    window.spawnConfetti = function (originX, originY) {
        var count = 26;
        for (var i = 0; i < count; i++) {
            (function () {
                var el = document.createElement('div');
                el.className = 'confetti-particle';
                var angle = (Math.random() * 360) * (Math.PI / 180);
                var dist = 55 + Math.random() * 90;
                var dx = Math.cos(angle) * dist;
                var dy = -(35 + Math.random() * 90);
                var rot = (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360);
                var dur = 0.65 + Math.random() * 0.7;
                var color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
                var size = 5 + Math.random() * 7;
                el.style.setProperty('--start-x', (originX - size / 2) + 'px');
                el.style.setProperty('--start-y', (originY - size / 2) + 'px');
                el.style.setProperty('--dx', dx + 'px');
                el.style.setProperty('--dy', dy + 'px');
                el.style.setProperty('--rot', rot + 'deg');
                el.style.setProperty('--duration', dur + 's');
                el.style.backgroundColor = color;
                el.style.width = size + 'px';
                el.style.height = size + 'px';
                el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                document.body.appendChild(el);
                setTimeout(function () { if (el.parentNode) el.remove(); }, (dur + 0.2) * 1000);
            })();
        }
    };

    // ─────────────────────────────────────────────
    // EMOJIS FLOTANTES EN EL HERO
    // ─────────────────────────────────────────────
    var FOOD_EMOJIS = ['🥩', '🔥', '🍔', '🍕', '🌭', '🥤', '🌶️', '🍟', '🍖'];

    function initHeroEmojis() {
        var hero = document.querySelector('.hero-section');
        if (!hero) return;
        if (hero.querySelector('.food-float-emoji')) return; // evitar duplicados

        var heroStyle = window.getComputedStyle(hero);
        if (heroStyle.position === 'static') {
            hero.style.position = 'relative';
        }

        for (var i = 0; i < FOOD_EMOJIS.length; i++) {
            var emoji = document.createElement('div');
            emoji.className = 'food-float-emoji';
            emoji.textContent = FOOD_EMOJIS[i];

            var col = i % 3; // 3 columnas
            var row = Math.floor(i / 3); // 3 filas
            var leftBase = [8, 45, 82][col];
            var topBase  = [10, 35, 60][row];

            emoji.style.setProperty('--left',  (leftBase  + (Math.random() * 10 - 5)) + '%');
            emoji.style.setProperty('--top',   (topBase   + (Math.random() * 8  - 4)) + '%');
            emoji.style.setProperty('--size',  (14 + Math.random() * 14) + 'px');
            emoji.style.setProperty('--dur',   (8 + Math.random() * 6) + 's');
            emoji.style.setProperty('--delay', (i * 0.8 + Math.random() * 2) + 's');

            hero.appendChild(emoji);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroEmojis);
    } else {
        initHeroEmojis();
    }

})();
