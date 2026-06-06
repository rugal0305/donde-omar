// =========================================================================
// LÓGICA ESPECÍFICA DE LA PÁGINA DE INICIO (index.html)
// =========================================================================

let currentViewerPage = 1; // Página activa de la carta física (1 o 2)

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
    modalPrevBtn: document.getElementById("modal-prev-btn"),
    modalNextBtn: document.getElementById("modal-next-btn"),
    modalFooterPrevBtn: document.getElementById("modal-footer-prev-btn"),
    modalFooterNextBtn: document.getElementById("modal-footer-next-btn"),
    modalIndicator: document.getElementById("modal-page-indicator"),
    
    // Formulario de Contacto General
    contactForm: document.getElementById("general-contact-form"),
    businessHoursText: document.getElementById("business-hours-text"),
    socialBadgesContainer: document.getElementById("social-badges-container")
};

// =========================================================================
// INICIALIZACIÓN
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
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
        DOM.physicalImg.setAttribute("src", `menu-page-${currentViewerPage}.jpg`);
        DOM.physicalImg.setAttribute("alt", `Carta página ${currentViewerPage}`);
        DOM.viewerIndicator.textContent = `Página ${currentViewerPage} de 2`;
        DOM.physicalImg.style.opacity = "1";
    }, 200);
}

function updateModalImage() {
    DOM.modalImg.style.opacity = "0";
    
    setTimeout(() => {
        DOM.modalImg.setAttribute("src", `menu-page-${currentViewerPage}.jpg`);
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
