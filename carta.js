// =========================================================================
// LÓGICA DE LA CARTA INTERACTIVA (carta.html)
// =========================================================================

let searchQuery = "";
let categories = []; // Lista única de categorías extraídas

// Elementos del DOM
const DOM = {
    // Header
    header: document.querySelector(".navbar-header"),
    mobileMenuBtn: document.getElementById("mobile-menu-toggle-btn"),
    mobileMenuDropdown: document.getElementById("mobile-dropdown-menu"),
    logoLink: document.getElementById("nav-logo-link"),
    waBtns: document.querySelectorAll(".nav-wa-btn"),
    
    // Contenedores del catálogo
    categoryWrapper: document.getElementById("category-scroll-container"),
    productsViewport: document.getElementById("products-list-viewport"),
    searchInput: document.getElementById("menu-search-input"),
    searchClearBtn: document.getElementById("search-clear-btn"),
    
    // Carrito Desktop (columna lateral fija)
    desktopCartItems: document.getElementById("desktop-cart-items-list"),
    desktopCartSubtotal: document.getElementById("desktop-cart-subtotal-val"),
    desktopCartTotal: document.getElementById("desktop-cart-total-val"),
    desktopName: document.getElementById("desktop-checkout-name"),
    desktopAddress: document.getElementById("desktop-checkout-address"),
    desktopNotes: document.getElementById("desktop-checkout-notes"),
    desktopSubmitBtn: document.getElementById("desktop-submit-order-btn"),
    desktopDisclaimer: document.getElementById("desktop-checkout-disclaimer-text"),
    
    // Carrito Móvil (Drawer)
    openCartBtn: document.getElementById("open-cart-btn"),
    closeCartBtn: document.getElementById("close-cart-btn"),
    cartOverlay: document.getElementById("cart-drawer-overlay"),
    cartDrawer: document.getElementById("cart-drawer-panel"),
    mobileCartItems: document.getElementById("mobile-cart-items-list"),
    mobileCartSubtotal: document.getElementById("mobile-cart-subtotal-val"),
    mobileCartTotal: document.getElementById("mobile-cart-total-val"),
    mobileName: document.getElementById("mobile-checkout-name"),
    mobileAddress: document.getElementById("mobile-checkout-address"),
    mobileNotes: document.getElementById("mobile-checkout-notes"),
    mobileSubmitBtn: document.getElementById("mobile-submit-order-btn"),
    mobileDisclaimer: document.getElementById("mobile-checkout-disclaimer-text"),
    
    floatingCartTrigger: document.getElementById("floating-cart-trigger"),
    socialBadgesContainer: document.getElementById("social-badges-container"),
    mobileAppHeaderCartBtn: document.getElementById("mobile-app-cart-btn-header"),
    mobileAppHeaderCartBadge: document.getElementById("mobile-app-cart-badge-header")
};

// =========================================================================
// INICIALIZACIÓN
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Cargar datos básicos y links
    loadBusinessSettings();

    // 2. Extraer categorías únicas de la base de datos de platos
    extractCategories();

    // 3. Renderizar barra de categorías pegajosa
    renderCategoryNavbar();

    // 4. Renderizar lista de platos compactos
    renderCatalog();

    // 5. Vincular listeners y sincronizaciones
    setupEventListeners();

    // 6. Sincronizar render inicial del carrito en el DOM
    updateCartUI();
});

function loadBusinessSettings() {
    if (!window.CONFIG) return;
    DOM.logoLink.setAttribute("aria-label", window.CONFIG.businessName);
    
    const encodedWelcomeMsg = encodeURIComponent(`¡Hola! Quisiera ver la carta y hacer una consulta.`);
    const waUrl = `https://wa.me/${window.CONFIG.whatsappPhone}?text=${encodedWelcomeMsg}`;
    
    DOM.waBtns.forEach(btn => btn.setAttribute("href", waUrl));
    document.getElementById("footer-year").textContent = new Date().getFullYear();

    // Enlaces de redes
    let socialHTML = "";
    if (window.CONFIG.instagramUrl) socialHTML += `<a href="${window.CONFIG.instagramUrl}" target="_blank" rel="noreferrer" class="social-badge">Instagram</a>`;
    if (window.CONFIG.tiktokUrl) socialHTML += `<a href="${window.CONFIG.tiktokUrl}" target="_blank" rel="noreferrer" class="social-badge">TikTok</a>`;
    if (window.CONFIG.facebookUrl) socialHTML += `<a href="${window.CONFIG.facebookUrl}" target="_blank" rel="noreferrer" class="social-badge">Facebook</a>`;
    if (window.CONFIG.youtubeUrl) socialHTML += `<a href="${window.CONFIG.youtubeUrl}" target="_blank" rel="noreferrer" class="social-badge">YouTube</a>`;
    socialHTML += `<a href="${waUrl}" target="_blank" rel="noreferrer" class="social-badge">WhatsApp</a>`;
    DOM.socialBadgesContainer.innerHTML = socialHTML;
}

// Extrae la lista ordenada de categorías a partir de la propiedad description de MENU_ITEMS
function extractCategories() {
    const uniqueCats = new Set();
    window.MENU_ITEMS.forEach(item => {
        const { category } = parseDescription(item.description);
        if (category) {
            uniqueCats.add(category.toUpperCase());
        }
    });
    categories = Array.from(uniqueCats);
}

// Procesa la cadena para separar categoría de descripción limpia
function parseDescription(desc) {
    if (!desc) return { category: "OTROS", cleanDesc: "" };
    const match = desc.match(/^\[(.*?)\]\s*(.*)/);
    return {
        category: match ? match[1].trim() : "OTROS",
        cleanDesc: match ? match[2].trim() : desc
    };
}

// =========================================================================
// RENDERING DEL COMPONENTE DE LA CARTA Y SIDEBAR
// =========================================================================

// Genera botones de categorías
function renderCategoryNavbar() {
    DOM.categoryWrapper.innerHTML = "";
    categories.forEach((cat, index) => {
        const slug = cat.toLowerCase().replace(/[^a-z0-9]/g, "-");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `category-nav-link ${index === 0 ? 'active' : ''}`;
        btn.dataset.category = slug;
        
        // Obtener el emoji del primer plato de esta categoría
        const catItems = window.MENU_ITEMS.filter(item => {
            const { category } = parseDescription(item.description);
            return category.toUpperCase() === cat;
        });
        const emoji = catItems.length > 0 ? catItems[0].icon : "🍽️";
        
        btn.innerHTML = `<span class="category-nav-icon">${emoji}</span> <span class="category-nav-text">${cat}</span>`;
        
        btn.addEventListener("click", () => {
            // Desplazar viewport al elemento correspondiente
            const targetSection = document.getElementById(`cat-section-${slug}`);
            if (targetSection) {
                const offset = 140; // Espaciado del navbar pegajoso
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
        DOM.categoryWrapper.appendChild(btn);
    });
}

// Renderiza los productos en formato ultra-compacto agrupados por categorías
function renderCatalog() {
    DOM.productsViewport.innerHTML = "";
    const isSearching = searchQuery.trim().length > 0;
    let filteredItems = window.MENU_ITEMS;

    if (isSearching) {
        const query = searchQuery.toLowerCase().trim();
        filteredItems = window.MENU_ITEMS.filter(item => {
            const { category, cleanDesc } = parseDescription(item.description);
            return item.name.toLowerCase().includes(query) || 
                   category.toLowerCase().includes(query) || 
                   cleanDesc.toLowerCase().includes(query);
        });
        
        // Ocultar sidebar de categorías al buscar
        document.getElementById("category-sidebar-nav").style.display = "none";
    } else {
        document.getElementById("category-sidebar-nav").style.display = "block";
    }

    if (filteredItems.length === 0) {
        DOM.productsViewport.innerHTML = `
            <div class="no-results" style="margin-top: 20px;">
                <p>No encontramos resultados para "${searchQuery}".</p>
                <p style="margin-top: 8px; font-size: 12px; color: var(--color-primary);">Prueba escribiendo palabras más generales.</p>
            </div>
        `;
        return;
    }

    // Agrupar items por categorías
    const grouped = {};
    filteredItems.forEach(item => {
        const { category, cleanDesc } = parseDescription(item.description);
        if (!grouped[category]) {
            grouped[category] = [];
        }
        grouped[category].push({ ...item, cleanDesc });
    });

    // Inyectar bloques en el viewport
    Object.keys(grouped).forEach(catName => {
        const slug = catName.toLowerCase().replace(/[^a-z0-9]/g, "-");
        const block = document.createElement("section");
        block.className = "menu-category-block";
        block.id = `cat-section-${slug}`;
        block.dataset.rawCategory = slug;

        const catIcon = grouped[catName][0].icon || "🍔";

        block.innerHTML = `
            <div class="category-block-header">
                <span class="category-block-pill"></span>
                <h3 class="category-block-title">${catName}</h3>
                <div class="category-block-line"></div>
            </div>
            <div class="category-rows-container"></div>
        `;

        const rowsContainer = block.querySelector(".category-rows-container");

        grouped[catName].forEach(item => {
            const qty = window.cart[item.id] ? window.cart[item.id].quantity : 0;
            const isSelected = qty > 0;
            
            const row = document.createElement("div");
            row.className = `food-row ${isSelected ? 'selected' : ''}`;
            row.dataset.id = item.id;
            
            row.innerHTML = `
                <div class="food-row-icon-box">
                    ${item.icon}
                </div>
                <div class="food-row-content">
                    <h4 class="food-row-title">${item.name}</h4>
                    <p class="food-row-desc">${item.cleanDesc}</p>
                    <div class="food-row-actions-bar">
                        <span class="food-row-price">${item.price}</span>
                        <div class="food-row-action-wrapper">
                            ${qty === 0 ? `
                                <button type="button" class="btn btn-primary btn-row-add-red" onclick="catalogAdd('${item.id}')">
                                    AÑADIR +
                                </button>
                            ` : `
                                <div class="qty-selector">
                                    <button type="button" class="qty-btn qty-btn-minus" onclick="catalogMinus('${item.id}')">
                                        <i data-lucide="minus"></i>
                                    </button>
                                    <span class="qty-value">${qty}</span>
                                    <button type="button" class="qty-btn qty-btn-plus" onclick="catalogAdd('${item.id}')">
                                        <i data-lucide="plus"></i>
                                    </button>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            `;
            rowsContainer.appendChild(row);
        });

        DOM.productsViewport.appendChild(block);
    });

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Helpers globales para botones de fila
window.catalogAdd = (itemId) => {
    window.addToCart(itemId, () => {
        updateCartUI();
        renderCatalog();
    });
};

window.catalogMinus = (itemId) => {
    window.removeFromCart(itemId, () => {
        updateCartUI();
        renderCatalog();
    });
};

window.catalogTrash = (itemId) => {
    window.removeAllOfItem(itemId, () => {
        updateCartUI();
        renderCatalog();
    });
};

// =========================================================================
// ACTUALIZACIÓN DE INTERFAZ DEL CARRITO (Desktop y Móvil Drawer)
// =========================================================================

function updateCartUI() {
    const totalCount = window.getCartCount();
    const grandTotal = window.getCartTotal();
    
    // 1. Sincronizar el header del navbar y el botón flotante móvil
    const navCartBadge = document.getElementById("cart-nav-badge");
    if (navCartBadge) {
        navCartBadge.textContent = totalCount;
        navCartBadge.style.display = totalCount > 0 ? "grid" : "none";
    }
    
    if (DOM.floatingCartTrigger) {
        DOM.floatingCartTrigger.style.display = totalCount > 0 ? "flex" : "none";
        document.getElementById("cart-floating-badge").textContent = totalCount;
    }
    
    if (DOM.mobileAppHeaderCartBadge) {
        DOM.mobileAppHeaderCartBadge.textContent = totalCount;
    }

    // 2. Renderizar Carrito Desktop
    renderCartList(DOM.desktopCartItems, DOM.desktopCartSubtotal, DOM.desktopCartTotal, DOM.desktopSubmitBtn, DOM.desktopDisclaimer, DOM.desktopCartContent || document.querySelector(".desktop-cart-content"), grandTotal, totalCount);

    // 3. Renderizar Carrito Móvil
    renderCartList(DOM.mobileCartItems, DOM.mobileCartSubtotal, DOM.mobileCartTotal, DOM.mobileSubmitBtn, DOM.mobileDisclaimer, null, grandTotal, totalCount);

    // Inicializar iconos de Lucide
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Método utilitario para renderizar las listas de productos en los carritos correspondientes
function renderCartList(container, subtotalEl, totalEl, submitBtn, disclaimerEl, contentWrapper, grandTotal, totalCount) {
    container.innerHTML = "";

    if (totalCount === 0) {
        container.innerHTML = `
            <div class="cart-empty-message">
                <i data-lucide="shopping-bag" style="display: block; margin: 0 auto 12px; opacity: 0.25; width: 36px; height: 36px;"></i>
                <p>Carrito vacío.</p>
            </div>
        `;
        subtotalEl.textContent = "$ 0";
        totalEl.textContent = "$ 0";
        submitBtn.disabled = true;
        disclaimerEl.style.display = "block";
        disclaimerEl.textContent = "* Rellena tu nombre y dirección para realizar el pedido";
        disclaimerEl.classList.remove("ready");
        
        // En desktop, ocultamos los campos de formulario si el carrito está vacío para mayor claridad
        if (contentWrapper) {
            const form = contentWrapper.querySelector(".cart-delivery-form");
            if (form) form.style.display = "none";
        }
        return;
    }

    if (contentWrapper) {
        const form = contentWrapper.querySelector(".cart-delivery-form");
        if (form) form.style.display = "block";
    }

    Object.values(window.cart).forEach(({ item, quantity }) => {
        const { category } = parseDescription(item.description);
        const itemTotal = window.parsePrice(item.price) * quantity;
        
        const row = document.createElement("div");
        row.className = "cart-item-row";
        row.innerHTML = `
            <span class="cart-item-icon">${item.icon}</span>
            <div class="cart-item-info">
                <span class="cart-item-category">${category}</span>
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-pricing-row">
                    <div class="qty-selector">
                        <button type="button" class="qty-btn qty-btn-minus" onclick="catalogMinus('${item.id}')">
                            <i data-lucide="minus"></i>
                        </button>
                        <span class="qty-value">${quantity}</span>
                        <button type="button" class="qty-btn qty-btn-plus" onclick="catalogAdd('${item.id}')">
                            <i data-lucide="plus"></i>
                        </button>
                    </div>
                    <span class="cart-item-total-price">${window.formatPrice(itemTotal)}</span>
                </div>
            </div>
            <button type="button" class="btn-remove-item" onclick="catalogTrash('${item.id}')" title="Eliminar de la lista">
                <i data-lucide="trash-2"></i>
            </button>
        `;
        container.appendChild(row);
    });

    subtotalEl.textContent = window.formatPrice(grandTotal);
    totalEl.textContent = window.formatPrice(grandTotal);

    // Activar/desactivar botones de checkout según la validación del formulario
    validateCheckoutForms();
}

// Sincroniza bidireccionalmente los valores de los formularios e inicializa el envío
function validateCheckoutForms() {
    const name = DOM.desktopName.value.trim() || DOM.mobileName.value.trim();
    const address = DOM.desktopAddress.value.trim() || DOM.mobileAddress.value.trim();
    const notes = DOM.desktopNotes.value.trim() || DOM.mobileNotes.value.trim();
    
    const isValid = name.length > 2 && address.length > 5 && window.getCartCount() > 0;
    
    // 1. Activar botones
    DOM.desktopSubmitBtn.disabled = !isValid;
    DOM.mobileSubmitBtn.disabled = !isValid;
    
    // 2. Controlar disclaimers
    if (isValid) {
        DOM.desktopDisclaimer.textContent = "¡Todo listo! Pulsa el botón para pedir por WhatsApp";
        DOM.desktopDisclaimer.classList.add("ready");
        DOM.mobileDisclaimer.textContent = "¡Todo listo! Pulsa el botón para pedir por WhatsApp";
        DOM.mobileDisclaimer.classList.add("ready");
    } else {
        DOM.desktopDisclaimer.textContent = "* Rellena tu nombre y dirección para realizar el pedido";
        DOM.desktopDisclaimer.classList.remove("ready");
        DOM.mobileDisclaimer.textContent = "* Rellena tu nombre y dirección para realizar el pedido";
        DOM.mobileDisclaimer.classList.remove("ready");
    }
}

// Sincroniza la entrada de texto de un formulario a otro (desktop <-> móvil)
function syncInputs(sourceType) {
    if (sourceType === 'desktop') {
        DOM.mobileName.value = DOM.desktopName.value;
        DOM.mobileAddress.value = DOM.desktopAddress.value;
        DOM.mobileNotes.value = DOM.desktopNotes.value;
    } else {
        DOM.desktopName.value = DOM.mobileName.value;
        DOM.desktopAddress.value = DOM.mobileAddress.value;
        DOM.desktopNotes.value = DOM.mobileNotes.value;
    }
    validateCheckoutForms();
}

// =========================================================================
// ENVÍO DE PEDIDO A WHATSAPP
// =========================================================================
function triggerWhatsAppCheckout() {
    const name = DOM.desktopName.value.trim() || DOM.mobileName.value.trim();
    const address = DOM.desktopAddress.value.trim() || DOM.mobileAddress.value.trim();
    const notes = DOM.desktopNotes.value.trim() || DOM.mobileNotes.value.trim();

    if (!name || !address) return;

    let message = `🔥 *¡NUEVO PEDIDO - ${window.CONFIG.businessName}!* 🔥\n`;
    message += `------------------------------------------\n`;
    message += `Hola, me gustaría realizar el siguiente pedido:\n\n`;
    
    message += `*Detalle del Pedido:*\n`;
    
    let total = 0;
    Object.values(window.cart).forEach(({ item, quantity }) => {
        const unitPrice = window.parsePrice(item.price);
        const lineTotal = unitPrice * quantity;
        total += lineTotal;
        
        message += `• *${quantity}x ${item.name.toUpperCase()}* (${item.price || "Precio a acordar"})\n`;
        if (quantity > 1) {
            message += `  Subtotal: ${window.formatPrice(lineTotal)}\n`;
        }
    });
    
    message += `\n*Total a pagar:* ${window.formatPrice(total)}\n`;
    message += `*Envío:* A acordar con el negocio 🛵\n`;
    message += `------------------------------------------\n\n`;
    
    message += `*Datos de Entrega:*\n`;
    message += `👤 *Nombre:* ${name}\n`;
    message += `📍 *Dirección:* ${address}\n`;
    if (notes) {
        message += `📝 *Notas de Cocina:* ${notes}\n`;
    }
    
    message += `\n¡Muchas gracias! Quedo atento a la confirmación de mi pedido.`;

    const finalUrl = `https://wa.me/${window.CONFIG.whatsappPhone}?text=${encodeURIComponent(message)}`;
    window.open(finalUrl, "_blank");
    
    // Limpiar carrito tras checkout exitoso
    window.cart = {};
    localStorage.removeItem("omar_parrilla_cart");
    
    // Limpiar inputs
    DOM.desktopName.value = "";
    DOM.desktopAddress.value = "";
    DOM.desktopNotes.value = "";
    DOM.mobileName.value = "";
    DOM.mobileAddress.value = "";
    DOM.mobileNotes.value = "";
    
    updateCartUI();
    renderCatalog();
}

// =========================================================================
// EVENTOS Y EVENT LISTENERS
// =========================================================================
function setupEventListeners() {
    // 1. Navbar móvil
    DOM.mobileMenuBtn.addEventListener("click", () => {
        DOM.header.classList.toggle("mobile-open");
    });

    const links = document.querySelectorAll(".mobile-nav-link, .mobile-dropdown-menu .btn");
    links.forEach(l => {
        l.addEventListener("click", () => {
            DOM.header.classList.remove("mobile-open");
        });
    });

    // 2. Control de Drawer de Carrito en Móviles
    const openCartDrawer = () => {
        DOM.cartOverlay.classList.add("active");
        DOM.cartDrawer.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    const closeCartDrawer = () => {
        DOM.cartOverlay.classList.remove("active");
        DOM.cartDrawer.classList.remove("active");
        document.body.style.overflow = "";
    };

    DOM.openCartBtn.addEventListener("click", openCartDrawer);
    DOM.floatingCartTrigger.addEventListener("click", openCartDrawer);
    if (DOM.mobileAppHeaderCartBtn) {
        DOM.mobileAppHeaderCartBtn.addEventListener("click", openCartDrawer);
    }
    const drawerHandle = document.getElementById("cart-drawer-handle-btn");
    if (drawerHandle) {
        drawerHandle.addEventListener("click", closeCartDrawer);
    }
    DOM.closeCartBtn.addEventListener("click", closeCartDrawer);
    DOM.cartOverlay.addEventListener("click", closeCartDrawer);

    // 3. Sincronización bidireccional de formularios
    DOM.desktopName.addEventListener("input", () => syncInputs('desktop'));
    DOM.desktopAddress.addEventListener("input", () => syncInputs('desktop'));
    DOM.desktopNotes.addEventListener("input", () => syncInputs('desktop'));
    
    DOM.mobileName.addEventListener("input", () => syncInputs('mobile'));
    DOM.mobileAddress.addEventListener("input", () => syncInputs('mobile'));
    DOM.mobileNotes.addEventListener("input", () => syncInputs('mobile'));

    // 4. Envío de Pedido a WhatsApp
    DOM.desktopSubmitBtn.addEventListener("click", () => {
        triggerWhatsAppCheckout();
    });
    
    DOM.mobileSubmitBtn.addEventListener("click", () => {
        triggerWhatsAppCheckout();
        closeCartDrawer();
    });

    // 5. Input de Buscador
    DOM.searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        DOM.searchClearBtn.style.display = searchQuery.trim().length > 0 ? "flex" : "none";
        renderCatalog();
    });

    DOM.searchClearBtn.addEventListener("click", () => {
        searchQuery = "";
        DOM.searchInput.value = "";
        DOM.searchClearBtn.style.display = "none";
        renderCatalog();
    });

    // 6. ScrollSpy: Resaltar la pestaña de categoría activa a medida que se desplaza la carta
    window.addEventListener("scroll", handleScrollSpy);
}

// Resalta la pestaña de categoría correspondiente a la sección de productos actualmente visible
function handleScrollSpy() {
    const blocks = document.querySelectorAll(".menu-category-block");
    const navLinks = document.querySelectorAll(".category-nav-link");
    
    if (blocks.length === 0 || navLinks.length === 0) return;
    
    // Si hay búsqueda en vivo activa, el observador no es necesario
    if (searchQuery.trim().length > 0) return;

    let activeSlug = "";
    const scrollPosition = window.scrollY + 160; // Compensar alto del navbar y espaciado de cabecera

    blocks.forEach(block => {
        const top = block.offsetTop;
        const height = block.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
            activeSlug = block.dataset.rawCategory;
        }
    });

    if (activeSlug) {
        navLinks.forEach(link => {
            const isActive = link.dataset.category === activeSlug;
            link.classList.toggle("active", isActive);
            
            // Centrar automáticamente la categoría activa en la barra de scroll de móviles
            if (isActive && window.innerWidth < 768) {
                const scrollWrapper = document.getElementById("category-scroll-container");
                const wrapperLeft = scrollWrapper.getBoundingClientRect().left;
                const linkLeft = link.getBoundingClientRect().left;
                
                scrollWrapper.scrollBy({
                    left: linkLeft - wrapperLeft - 20,
                    behavior: "smooth"
                });
            }
        });
    }
}
