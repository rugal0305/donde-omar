// =========================================================================
// LÓGICA ESPECÍFICA DE LA PÁGINA DE INICIO (index.html)
// =========================================================================

let currentViewerPage = 1; // Página activa de la carta física (1 o 2)

// Estado del zoom para el visor a pantalla completa
let zoomScale = 1.0;
const ZOOM_STEP = 0.25;
const MAX_ZOOM = 3.0;
const MIN_ZOOM = 1.0;

// Elementos del DOM
const DOM = {
    // Navbar
    header: document.querySelector(".navbar-header"),
    mobileMenuBtn: document.getElementById("mobile-menu-toggle-btn"),
    mobileMenuDropdown: document.getElementById("mobile-dropdown-menu"),
    logoLink: document.getElementById("nav-logo-link"),
    waBtns: document.querySelectorAll(".nav-wa-btn"),
    callBtn: document.getElementById("call-direct-btn"),
    
    // Menú Físico (PDF Slider)
    physicalImg: document.getElementById("physical-menu-img"),
    viewerPrevBtn: document.getElementById("viewer-prev-btn"),
    viewerNextBtn: document.getElementById("viewer-next-btn"),
    viewerIndicator: document.getElementById("viewer-page-indicator"),
    openFullscreenBtn: document.getElementById("open-fullscreen-btn"),
    
    // Modal Fullscreen
    modal: document.getElementById("fullscreen-menu-modal"),
    modalImg: document.getElementById("fullscreen-modal-img"),
    modalCloseBtn: document.getElementById("close-fullscreen-btn"),
    modalRotateBtn: document.getElementById("rotate-fullscreen-btn"),
    modalZoomInBtn: document.getElementById("modal-zoom-in-btn"),
    modalZoomOutBtn: document.getElementById("modal-zoom-out-btn"),
    modalZoomIndicator: document.getElementById("modal-zoom-indicator"),
    modalPrevBtn: document.getElementById("modal-prev-btn"),
    modalNextBtn: document.getElementById("modal-next-btn"),
    modalFooterPrevBtn: document.getElementById("modal-footer-prev-btn"),
    modalFooterNextBtn: document.getElementById("modal-footer-next-btn"),
    modalIndicator: document.getElementById("modal-page-indicator"),
    
    // Formulario de Contacto General
    contactForm: document.getElementById("general-contact-form"),
    businessHoursText: document.getElementById("business-hours-text"),
    socialBadgesContainer: document.getElementById("social-badges-container"),
    themeToggleBtn: document.getElementById("theme-toggle-btn"),
    themeToggleIcon: document.getElementById("theme-toggle-icon")
};

// =========================================================================
// INICIALIZACIÓN
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar tema antes de renderizar
    initTheme();

    // Inicializar iconos Lucide
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 1. Cargar Configuración del negocio
    loadBusinessSettings();

    // 2. Agregar listeners para eventos
    setupEventListeners();

    // 3. Inicializar animaciones de scroll
    initScrollReveal();

    // 4. Inicializar desplazamiento horizontal drag en el visor de carta
    initMenuDragScroll();

    // 5. Inicializar desplazamiento y zoom en el visor de pantalla completa
    initModalDragScroll();
});

// Carga las variables de CONFIG a los elementos correspondientes del DOM
function loadBusinessSettings() {
    if (!window.CONFIG) return;
    
    // Título en el navbar y slogan
    DOM.logoLink.setAttribute("aria-label", window.CONFIG.businessName);
    
    // Links de WhatsApp (reemplazar urls dinámicamente)
    const encodedWelcomeMsg = encodeURIComponent(`¡Hola! Quisiera hacer una consulta o reserva.`);
    const waUrl = `https://wa.me/${window.CONFIG.whatsappPhone}?text=${encodedWelcomeMsg}`;
    
    DOM.waBtns.forEach(btn => btn.setAttribute("href", waUrl));
    
    // Teléfono
    if (DOM.callBtn) DOM.callBtn.setAttribute("href", `tel:${window.CONFIG.phoneCall.replace(/\s/g, "")}`);
    if (DOM.businessHoursText) DOM.businessHoursText.textContent = window.CONFIG.businessHours;

    // Generar enlaces de redes sociales en el footer
    let socialHTML = "";
    if (window.CONFIG.instagramUrl) socialHTML += `<a href="${window.CONFIG.instagramUrl}" target="_blank" rel="noreferrer" class="social-badge">Instagram</a>`;
    if (window.CONFIG.tiktokUrl) socialHTML += `<a href="${window.CONFIG.tiktokUrl}" target="_blank" rel="noreferrer" class="social-badge">TikTok</a>`;
    if (window.CONFIG.facebookUrl) socialHTML += `<a href="${window.CONFIG.facebookUrl}" target="_blank" rel="noreferrer" class="social-badge">Facebook</a>`;
    if (window.CONFIG.youtubeUrl) socialHTML += `<a href="${window.CONFIG.youtubeUrl}" target="_blank" rel="noreferrer" class="social-badge">YouTube</a>`;
    socialHTML += `<a href="${waUrl}" target="_blank" rel="noreferrer" class="social-badge">WhatsApp</a>`;
    
    DOM.socialBadgesContainer.innerHTML = socialHTML;
}

// =========================================================================
// ACCIONES DE CARTA ORIGINAL (VISOR DE CARTA FÍSICA / PDF IMAGES)
// =========================================================================

function updateViewerImage() {
    DOM.physicalImg.style.opacity = "0";
    
    setTimeout(() => {
        DOM.physicalImg.setAttribute("src", `assets/menu-page-${currentViewerPage}.jpg`);
        DOM.physicalImg.setAttribute("alt", `Carta página ${currentViewerPage}`);
        DOM.viewerIndicator.textContent = `Página ${currentViewerPage} de 2`;
        DOM.physicalImg.style.opacity = "1";
    }, 200);
}

function updateModalImage() {
    DOM.modalImg.style.opacity = "0";
    resetZoom();
    
    setTimeout(() => {
        DOM.modalImg.setAttribute("src", `assets/menu-page-${currentViewerPage}.jpg`);
        DOM.modalImg.setAttribute("alt", `Carta página completa ${currentViewerPage}`);
        DOM.modalIndicator.textContent = `Página ${currentViewerPage} de 2`;
        DOM.modalImg.style.opacity = "1";
    }, 200);
}

function handleViewerNext() {
    currentViewerPage = currentViewerPage === 1 ? 2 : 1;
    updateViewerImage();
    if (DOM.modal.classList.contains("active")) {
        updateModalImage();
    }
}

function handleViewerPrev() {
    currentViewerPage = currentViewerPage === 2 ? 1 : 2;
    updateViewerImage();
    if (DOM.modal.classList.contains("active")) {
        updateModalImage();
    }
}

function openFullscreenModal() {
    DOM.modal.classList.add("active");
    DOM.modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Desactivar scroll del fondo
    updateModalImage();
}

function closeFullscreenModal() {
    DOM.modal.classList.remove("active");
    DOM.modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restaurar scroll del fondo
    resetZoom();
    
    // Restaurar modo horizontal si estaba activo al cerrar
    if (isModalLandscape) {
        toggleModalLandscape();
    }
}

let isModalLandscape = false;

function toggleModalLandscape() {
    isModalLandscape = !isModalLandscape;
    const rotateBtn = DOM.modalRotateBtn;
    
    if (isModalLandscape) {
        // Intentar Screen Orientation API
        if (screen.orientation && screen.orientation.lock) {
            DOM.modal.requestFullscreen().then(() => {
                screen.orientation.lock('landscape').catch(err => {
                    console.log("No se pudo bloquear la orientación:", err);
                });
            }).catch(err => {
                console.log("No se pudo iniciar pantalla completa para orientación:", err);
            });
        }
        
        DOM.modal.classList.add("mobile-landscape-menu");
        if (rotateBtn) {
            rotateBtn.innerHTML = `<i data-lucide="rotate-ccw" class="icon-inline"></i> <span>Girar Vertical</span>`;
            if (window.lucide) window.lucide.createIcons();
        }
    } else {
        if (screen.orientation && screen.orientation.unlock) {
            try {
                screen.orientation.unlock();
            } catch(e) {}
        }
        if (document.fullscreenElement) {
            try {
                document.exitFullscreen();
            } catch(e) {}
        }
        
        DOM.modal.classList.remove("mobile-landscape-menu");
        if (rotateBtn) {
            rotateBtn.innerHTML = `<i data-lucide="rotate-cw" class="icon-inline"></i> <span>Girar Carta</span>`;
            if (window.lucide) window.lucide.createIcons();
        }
    }
}

// Procesa el formulario de contacto general para abrir un canal de chat directo
function submitGeneralContact(e) {
    e.preventDefault();
    const name = document.getElementById("contact-name").value.trim();
    const phone = document.getElementById("contact-phone").value.trim();
    const requestMessage = document.getElementById("contact-message").value.trim();

    let text = `🔥 *CONSULTA / PEDIDO - ${window.CONFIG.businessName}* 🔥\n\n`;
    text += `Hola, mi nombre es *${name}*.\n`;
    text += `Mi número de contacto es: *${phone}*.\n\n`;
    text += `*Detalle de la consulta:*\n${requestMessage}\n\n`;
    text += `Quedo atento(a) a su respuesta.`;

    const finalUrl = `https://wa.me/${window.CONFIG.whatsappPhone}?text=${encodeURIComponent(text)}`;
    window.open(finalUrl, "_blank");
    
    DOM.contactForm.reset();
}

// =========================================================================
// EVENTOS Y LISTENERS
// =========================================================================
function setupEventListeners() {
    // Tema claro / oscuro
    if (DOM.themeToggleBtn) {
        DOM.themeToggleBtn.addEventListener("click", toggleTheme);
    }

    // 1. Control del menú responsivo móvil (Hamburger)
    DOM.mobileMenuBtn.addEventListener("click", () => {
        DOM.header.classList.toggle("mobile-open");
    });

    // Cerrar menú móvil al hacer clic en un enlace de navegación
    const navLinks = document.querySelectorAll(".mobile-nav-link, .mobile-dropdown-menu .btn");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            DOM.header.classList.remove("mobile-open");
        });
    });

    // 2. Lógica de Paginación y Modales de Carta Física
    DOM.viewerPrevBtn.addEventListener("click", handleViewerPrev);
    DOM.viewerNextBtn.addEventListener("click", handleViewerNext);
    DOM.openFullscreenBtn.addEventListener("click", openFullscreenModal);
    
    DOM.modalCloseBtn.addEventListener("click", closeFullscreenModal);
    if (DOM.modalRotateBtn) {
        DOM.modalRotateBtn.addEventListener("click", toggleModalLandscape);
    }
    if (DOM.modalZoomInBtn) DOM.modalZoomInBtn.addEventListener("click", zoomIn);
    if (DOM.modalZoomOutBtn) DOM.modalZoomOutBtn.addEventListener("click", zoomOut);
    DOM.modalPrevBtn.addEventListener("click", handleViewerPrev);
    DOM.modalNextBtn.addEventListener("click", handleViewerNext);
    DOM.modalFooterPrevBtn.addEventListener("click", handleViewerPrev);
    DOM.modalFooterNextBtn.addEventListener("click", handleViewerNext);

    // Cerrar modal al hacer clic en el backdrop
    DOM.modal.addEventListener("click", (e) => {
        if (e.target === DOM.modal || e.target.classList.contains("fullscreen-modal-body")) {
            closeFullscreenModal();
        }
    });

    // Atajos de teclado en el modal
    document.addEventListener("keydown", (e) => {
        if (DOM.modal.classList.contains("active")) {
            if (e.key === "Escape") closeFullscreenModal();
            if (e.key === "ArrowRight") handleViewerNext();
            if (e.key === "ArrowLeft") handleViewerPrev();
            if (e.key === "+" || e.key === "=") zoomIn();
            if (e.key === "-") zoomOut();
        }
    });

    // 3. Envío de formulario de consulta general
    DOM.contactForm.addEventListener("submit", submitGeneralContact);
}

// =========================================================================
// ANIMACIÓN DE ELEMENTOS CON SCROLL (Intersection Observer)
// =========================================================================
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    const elementsToReveal = document.querySelectorAll(".scroll-reveal, section, footer");
    elementsToReveal.forEach(el => {
        if (!el.classList.contains("scroll-reveal")) {
            el.classList.add("scroll-reveal");
        }
        observer.observe(el);
    });
}

// =========================================================================
// DESPLAZAMIENTO HORIZONTAL DRAG EN EL VISOR DE CARTA FÍSICA
// =========================================================================
function initMenuDragScroll() {
    const scroller = document.getElementById("menu-drag-scroll");
    if (!scroller) return;

    let isDragging = false;
    let startX = 0;
    let scrollStartX = 0;
    let dragMoved = false;

    // --- MOUSE EVENTS (desktop) ---
    scroller.addEventListener("mousedown", (e) => {
        isDragging = true;
        dragMoved = false;
        startX = e.clientX;
        scrollStartX = scroller.scrollLeft;
        scroller.classList.add("is-dragging");
        // Prevent text selection while dragging
        e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 3) dragMoved = true;
        scroller.scrollLeft = scrollStartX - dx;
    });

    document.addEventListener("mouseup", () => {
        if (!isDragging) return;
        isDragging = false;
        scroller.classList.remove("is-dragging");
    });

    // Prevent click from firing if user dragged
    scroller.addEventListener("click", (e) => {
        if (dragMoved) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    // --- TOUCH EVENTS (mobile) ---
    let touchStartX = 0;
    let touchScrollStartX = 0;

    scroller.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
        touchScrollStartX = scroller.scrollLeft;
    }, { passive: true });

    scroller.addEventListener("touchmove", (e) => {
        const dx = e.touches[0].clientX - touchStartX;
        scroller.scrollLeft = touchScrollStartX - dx;
        // Only prevent default if horizontal movement dominates
        const dy = e.touches[0].clientY - (e.touches[0].screenY - e.touches[0].clientY);
        if (Math.abs(dx) > Math.abs(dy || 0)) {
            // Allow browser to handle, overscroll-behavior handles containment
        }
    }, { passive: true });
}

// =========================================================================
// GESTIÓN DE TEMA (CLARO / OSCURO)
// =========================================================================
function initTheme() {
    const currentTheme = localStorage.getItem("theme") || "dark";
    if (currentTheme === "light") {
        document.documentElement.classList.add("light-theme");
        document.documentElement.classList.remove("dark");
        document.body.classList.add("light-theme");
        if (DOM.themeToggleIcon) {
            DOM.themeToggleIcon.setAttribute("data-lucide", "sun");
        }
    } else {
        document.documentElement.classList.remove("light-theme");
        document.documentElement.classList.add("dark");
        document.body.classList.remove("light-theme");
        if (DOM.themeToggleIcon) {
            DOM.themeToggleIcon.setAttribute("data-lucide", "moon");
        }
    }
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function toggleTheme() {
    const isLight = document.documentElement.classList.contains("light-theme");
    if (isLight) {
        document.documentElement.classList.remove("light-theme");
        document.documentElement.classList.add("dark");
        document.body.classList.remove("light-theme");
        localStorage.setItem("theme", "dark");
        if (DOM.themeToggleIcon) {
            DOM.themeToggleIcon.setAttribute("data-lucide", "moon");
        }
    } else {
        document.documentElement.classList.add("light-theme");
        document.documentElement.classList.remove("dark");
        document.body.classList.add("light-theme");
        localStorage.setItem("theme", "light");
        if (DOM.themeToggleIcon) {
            DOM.themeToggleIcon.setAttribute("data-lucide", "sun");
        }
    }
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// =========================================================================
// INTERACCIONES DE ZOOM EN EL VISOR MODAL A PANTALLA COMPLETA
// =========================================================================
function applyZoom() {
    const modalImg = DOM.modalImg;
    const container = DOM.modal ? DOM.modal.querySelector(".fullscreen-modal-image-container") : null;
    const zoomIndicator = DOM.modalZoomIndicator;
    
    if (!modalImg || !container) return;
    
    if (zoomIndicator) {
        zoomIndicator.textContent = `${Math.round(zoomScale * 100)}%`;
    }
    
    container.style.setProperty('--zoom-factor', zoomScale);
    
    if (zoomScale === 1.0) {
        modalImg.classList.remove("is-zoomed");
        container.classList.remove("is-draggable");
        container.scrollLeft = 0;
        container.scrollTop = 0;
    } else {
        modalImg.classList.add("is-zoomed");
        container.classList.add("is-draggable");
    }
}

function zoomIn() {
    if (zoomScale < MAX_ZOOM) {
        zoomScale += ZOOM_STEP;
        applyZoom();
    }
}

function zoomOut() {
    if (zoomScale > MIN_ZOOM) {
        zoomScale -= ZOOM_STEP;
        applyZoom();
    }
}

function resetZoom() {
    zoomScale = 1.0;
    applyZoom();
}

// =========================================================================
// ARRASTRE Y DESPLAZAMIENTO (PAN) EN EL VISOR MODAL A PANTALLA COMPLETA
// =========================================================================
function initModalDragScroll() {
    const scroller = DOM.modal ? DOM.modal.querySelector(".fullscreen-modal-image-container") : null;
    if (!scroller) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let scrollStartX = 0;
    let scrollStartY = 0;
    let dragMoved = false;

    // --- EVENTOS DE MOUSE ---
    scroller.addEventListener("mousedown", (e) => {
        if (zoomScale === 1.0) return;
        
        isDragging = true;
        dragMoved = false;
        startX = e.clientX;
        startY = e.clientY;
        scrollStartX = scroller.scrollLeft;
        scrollStartY = scroller.scrollTop;
        scroller.classList.add("is-dragging");
        e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragMoved = true;
        
        const isRotated = isModalLandscape && window.matchMedia("(orientation: portrait)").matches;
        if (isRotated) {
            scroller.scrollLeft = scrollStartX + dy;
            scroller.scrollTop = scrollStartY + dx;
        } else {
            scroller.scrollLeft = scrollStartX - dx;
            scroller.scrollTop = scrollStartY - dy;
        }
    });

    document.addEventListener("mouseup", () => {
        if (!isDragging) return;
        isDragging = false;
        scroller.classList.remove("is-dragging");
    });

    scroller.addEventListener("click", (e) => {
        if (dragMoved) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    // --- EVENTOS TÁCTILES (móvil) ---
    let touchStartX = 0;
    let touchStartY = 0;
    let touchScrollStartX = 0;
    let touchScrollStartY = 0;

    scroller.addEventListener("touchstart", (e) => {
        if (zoomScale === 1.0 || e.touches.length > 1) return;
        
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchScrollStartX = scroller.scrollLeft;
        touchScrollStartY = scroller.scrollTop;
    }, { passive: true });

    scroller.addEventListener("touchmove", (e) => {
        if (zoomScale === 1.0 || e.touches.length > 1) return;
        
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        
        const isRotated = isModalLandscape && window.matchMedia("(orientation: portrait)").matches;
        if (isRotated) {
            scroller.scrollLeft = touchScrollStartX + dy;
            scroller.scrollTop = touchScrollStartY + dx;
        } else {
            scroller.scrollLeft = touchScrollStartX - dx;
            scroller.scrollTop = touchScrollStartY - dy;
        }
    }, { passive: true });
}
