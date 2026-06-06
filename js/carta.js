// =========================================================================
// LÓGICA DE LA CARTA INTERACTIVA (js/carta.js)
// =========================================================================

// State variables
let currentViewMode = 'physical'; // physical or interactive or ai
let currentPhysicalPage = 1;
let activeInteractiveCategory = 'all';
let searchQuery = '';
let cart = [];
let tempSelectedModifiers = [];
let currentEditingItem = null;
let currentEditingQty = 1;
let chatHistory = [];

// Initialize App
window.onload = function() {
    initTheme();
    setupHeaderListeners();
    loadBusinessSettings();
    if (window.lucide) {
        window.lucide.createIcons();
    }
    loadCart();
    renderPhysicalMenu();
    renderAdicionesList();
    renderInteractiveGrid();
    updateCartUI();
    loadChatHistory();
    updateShopStatus();
};

// Format Currency utility helper
function formatCOP(number) {
    if (typeof number === 'string') return number;
    return '$' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Parse price from string range or number
function parsePrice(priceVal) {
    if (typeof priceVal === 'number') return priceVal;
    if (!priceVal) return 0;
    const basePriceStr = priceVal.split("-")[0];
    const cleaned = basePriceStr.replace(/[^0-9]/g, "");
    const parsed = parseInt(cleaned, 10);
    return isNaN(parsed) ? 0 : parsed;
}

// Load cart from localStorage
function loadCart() {
    const saved = localStorage.getItem("omar_parrilla_cart");
    if (saved) {
        try {
            cart = JSON.parse(saved);
            if (!Array.isArray(cart)) cart = [];
        } catch(e) {
            cart = [];
        }
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("omar_parrilla_cart", JSON.stringify(cart));
    
    // Keep window.cart synced in case cart.js is loaded/referenced
    window.cart = cart;
    if (window.updateGlobalCartBadges) {
        window.updateGlobalCartBadges();
    }
}

// Render Physical Pages Content (4 pages)
function renderPhysicalMenu() {
    const data = window.menuData || menuData;
    if (!data) return;

    // Page 1: Asados al Carbón
    const asadosDiv = document.getElementById('items-asados');
    if (asadosDiv && data["Asados al Carbón"]) {
        asadosDiv.innerHTML = data["Asados al Carbón"].map(item => generateMenuItemHTML(item, 'Asados al Carbón')).join('');
    }

    // Page 1: Picadas
    const picadasDiv = document.getElementById('items-picadas');
    if (picadasDiv && data["Picadas"]) {
        picadasDiv.innerHTML = data["Picadas"].map(item => generateMenuItemHTML(item, 'Picadas')).join('');
    }

    // Page 1: Mini Picadas
    const miniPicadasDiv = document.getElementById('items-mini-picadas');
    if (miniPicadasDiv && data["Mini Picadas"]) {
        miniPicadasDiv.innerHTML = data["Mini Picadas"].map(item => generateMenuItemHTML(item, 'Mini Picadas')).join('');
    }

    // Page 2: Salchipapas
    const salchipapasDiv = document.getElementById('items-salchipapas');
    if (salchipapasDiv && data["Línea de Salchipapas"]) {
        salchipapasDiv.innerHTML = data["Línea de Salchipapas"].map(item => generateMenuItemHTML(item, 'Línea de Salchipapas')).join('');
    }

    // Page 2: Suizos
    const suizosDiv = document.getElementById('items-suizos');
    if (suizosDiv && data["Suizos"]) {
        suizosDiv.innerHTML = data["Suizos"].map(item => generateMenuItemHTML(item, 'Suizos')).join('');
    }

    // Page 2: Desgranados
    const desgranadosDiv = document.getElementById('items-desgranados');
    if (desgranadosDiv && data["Desgranados"]) {
        desgranadosDiv.innerHTML = data["Desgranados"].map(item => generateMenuItemHTML(item, 'Desgranados')).join('');
    }

    // Page 2: Patacón con Todo
    const pataconesTodoDiv = document.getElementById('items-patacones-con-todo');
    if (pataconesTodoDiv && data["Patacón con Todo"]) {
        pataconesTodoDiv.innerHTML = data["Patacón con Todo"].map(item => generateMenuItemHTML(item, 'Patacón con Todo')).join('');
    }

    // Page 3: Hamburguesas
    const hambDiv = document.getElementById('items-hamburguesas');
    if (hambDiv && data["Hamburguesas"]) {
        hambDiv.innerHTML = data["Hamburguesas"].map(item => generateMenuItemHTML(item, 'Hamburguesas')).join('');
    }

    // Page 3: Perros Calientes
    const perrosDiv = document.getElementById('items-perros');
    if (perrosDiv && data["Perros Calientes"]) {
        perrosDiv.innerHTML = data["Perros Calientes"].map(item => generateMenuItemHTML(item, 'Perros Calientes')).join('');
    }

    // Page 3: Salvajadas
    const salvajadasDiv = document.getElementById('items-salvajadas');
    if (salvajadasDiv && data["Salvajadas"]) {
        salvajadasDiv.innerHTML = data["Salvajadas"].map(item => generateMenuItemHTML(item, 'Salvajadas')).join('');
    }

    // Page 3: Burritos
    const burritosDiv = document.getElementById('items-burritos');
    if (burritosDiv && data["Especialidad (Burritos)"]) {
        burritosDiv.innerHTML = data["Especialidad (Burritos)"].map(item => generateMenuItemHTML(item, 'Especialidad (Burritos)')).join('');
    }

    // Page 4: Arepas
    const arepasDiv = document.getElementById('items-arepas');
    if (arepasDiv && data["Arepas"]) {
        arepasDiv.innerHTML = data["Arepas"].map(item => generateMenuItemHTML(item, 'Arepas')).join('');
    }

    // Page 4: Pizzas
    const pizzasDiv = document.getElementById('items-pizzas');
    if (pizzasDiv && data["Pizzas"]) {
        pizzasDiv.innerHTML = data["Pizzas"].map(item => generateMenuItemHTML(item, 'Pizzas')).join('');
    }
}

function generateMenuItemHTML(item, category) {
    return `
    <div onclick="openItemModal('${item.id}', '${category}')" class="group cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 rounded-lg transition-all">
        <div class="flex items-baseline justify-between w-full">
            <span class="font-extrabold text-zinc-800 dark:text-zinc-200 text-sm group-hover:text-red-600 dark:group-hover:text-yellow-400 transition-colors">${item.name}</span>
            <span class="dot-leader"></span>
            <span class="text-red-600 dark:text-red-500 font-black text-xs">${formatCOP(item.price)}</span>
        </div>
        ${item.desc ? `<p class="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">${item.desc}</p>` : ''}
    </div>`;
}

// Generate Adiciones Checklist items for Modal UI
function renderAdicionesList() {
    const data = window.menuData || menuData;
    if (!data) return;

    const listDiv = document.getElementById('detail-adiciones-list');
    if (listDiv && data["Adicionales"]) {
        listDiv.innerHTML = data["Adicionales"].map(ad => `
            <label class="flex items-center justify-between p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl cursor-pointer hover:border-red-500 dark:hover:border-yellow-500 transition-all">
                <div class="flex items-center gap-2">
                    <input type="checkbox" value="${ad.id}" onchange="toggleModifier('${ad.id}')" class="accent-red-500 w-4 h-4 rounded">
                    <span class="text-xs text-zinc-700 dark:text-zinc-300 font-semibold">${ad.name}</span>
                </div>
                <span class="text-[10px] font-bold text-red-600 dark:text-red-500">+ ${formatCOP(ad.price)}</span>
            </label>
        `).join('');
    }

    // Render Page 4 static Adicionales list
    const staticAdicionesDiv = document.getElementById('items-adicionales-list');
    if (staticAdicionesDiv && data["Adicionales"]) {
        staticAdicionesDiv.innerHTML = data["Adicionales"].map(ad => `
            <div class="flex justify-between items-center text-xs p-1">
                <span class="text-zinc-700 dark:text-zinc-300 font-bold">${ad.name}</span>
                <span class="text-red-600 dark:text-red-500 font-black">${formatCOP(ad.price)}</span>
            </div>
        `).join('');
    }
}

// Change page on physical view mode (1 to 4)
function changePage(pageNum) {
    currentPhysicalPage = pageNum;
    const titles = {
        1: "ASADOS AL CARBÓN Y PICADAS",
        2: "SALCHIPAPAS, SUIZOS Y DESGRANADOS",
        3: "HAMBURGUESAS, PERROS Y BURRITOS",
        4: "AREPAS, PIZZAS Y ADICIONALES"
    };
    const titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.innerText = titles[pageNum];

    // Hide all pages, show active
    for (let i = 1; i <= 4; i++) {
        const el = document.getElementById(`page-content-${i}`);
        const btn = document.getElementById(`btn-page-${i}`);
        if (el && btn) {
            if (i === pageNum) {
                el.classList.remove('hidden');
                btn.classList.add('bg-yellow-400', 'text-black');
                btn.classList.remove('text-zinc-500');
            } else {
                el.classList.add('hidden');
                btn.classList.remove('bg-yellow-400', 'text-black');
                btn.classList.add('text-zinc-500');
            }
        }
    }
}

// Toggle View mode between Physical Book, Interactive List and AI Concierge
function setViewMode(mode) {
    currentViewMode = mode;
    const btnPhysical = document.getElementById('btn-view-physical');
    const btnInteractive = document.getElementById('btn-view-interactive');
    const btnAi = document.getElementById('btn-view-ai');
    
    const physicalWrapper = document.getElementById('physical-view-wrapper');
    const interactiveWrapper = document.getElementById('interactive-view-wrapper');
    const aiWrapper = document.getElementById('ai-view-wrapper');
    const paginationContainer = document.getElementById('physical-pagination');

    // Reset tabs classes
    [btnPhysical, btnInteractive, btnAi].forEach(btn => {
        if (btn) {
            btn.classList.remove('bg-red-600', 'text-white', 'shadow-md');
            btn.classList.add('text-zinc-500');
        }
    });

    if (physicalWrapper) physicalWrapper.classList.add('hidden');
    if (interactiveWrapper) interactiveWrapper.classList.add('hidden');
    if (aiWrapper) aiWrapper.classList.add('hidden');
    if (paginationContainer) paginationContainer.classList.add('hidden');

    if (mode === 'physical') {
        if (btnPhysical) {
            btnPhysical.classList.add('bg-red-600', 'text-white', 'shadow-md');
            btnPhysical.classList.remove('text-zinc-500');
        }
        if (physicalWrapper) physicalWrapper.classList.remove('hidden');
        if (paginationContainer) paginationContainer.classList.remove('hidden');
    } else if (mode === 'interactive') {
        if (btnInteractive) {
            btnInteractive.classList.add('bg-red-600', 'text-white', 'shadow-md');
            btnInteractive.classList.remove('text-zinc-500');
        }
        if (interactiveWrapper) interactiveWrapper.classList.remove('hidden');
        renderInteractiveGrid();
    } else if (mode === 'ai') {
        if (btnAi) {
            btnAi.classList.add('bg-red-600', 'text-white', 'shadow-md');
            btnAi.classList.remove('text-zinc-500');
        }
        if (aiWrapper) aiWrapper.classList.remove('hidden');
        
        // Scroll to bottom of chat
        const history = document.getElementById('ai-chat-history');
        if (history) {
            setTimeout(() => {
                history.scrollTop = history.scrollHeight;
            }, 100);
        }
    }
}

// Render Interactive grid based on category filters
function renderInteractiveGrid() {
    const data = window.menuData || menuData;
    const grid = document.getElementById('interactive-grid');
    if (!grid || !data) return;
    
    let itemsToRender = [];

    Object.keys(data).forEach(cat => {
        if (cat === 'Adicionales') return;
        if (activeInteractiveCategory === 'all' || activeInteractiveCategory === cat) {
            data[cat].forEach(item => {
                itemsToRender.push({ ...item, category: cat });
            });
        }
    });

    grid.innerHTML = itemsToRender.map(item => `
        <div onclick="openItemModal('${item.id}', '${item.category}')" class="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-yellow-400 dark:hover:border-yellow-500 transition-all rounded-2xl p-5 cursor-pointer relative overflow-hidden group shadow-sm hover:shadow-md">
            <div class="absolute top-2 right-2 bg-red-600/10 text-red-600 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                ${item.category}
            </div>
            <h4 class="font-extrabold text-zinc-800 dark:text-zinc-200 text-base group-hover:text-red-600 dark:group-hover:text-yellow-400 transition-colors mt-2">${item.name}</h4>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1 italic min-h-[32px]">${item.desc || 'Sin descripción de ingredientes'}</p>
            <div class="flex items-center justify-between mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-900">
                <span class="text-red-600 dark:text-red-500 font-black text-lg">
                    ${formatCOP(item.price)}
                </span>
                <span class="bg-zinc-100 dark:bg-zinc-900 group-hover:bg-yellow-400 group-hover:text-black text-yellow-600 dark:text-yellow-500 p-2 rounded-xl transition-all">
                    <i data-lucide="plus" class="w-4 h-4"></i>
                </span>
            </div>
        </div>
    `).join('');

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Filter categories in interactive mode
function filterInteractiveCategory(category) {
    activeInteractiveCategory = category;
    
    // Highlight active category pill
    const pills = document.querySelectorAll('[id^="pill-"]');
    pills.forEach(p => {
        p.classList.remove('bg-yellow-400', 'text-black');
        p.classList.add('bg-zinc-100', 'text-zinc-600', 'dark:text-zinc-400');
    });

    const mapping = {
        'all': 'pill-all',
        'Asados al Carbón': 'pill-Asados',
        'Picadas': 'pill-Picadas',
        'Línea de Salchipapas': 'pill-Linea',
        'Suizos': 'pill-Suizos',
        'Desgranados': 'pill-Desgranados',
        'Hamburguesas': 'pill-Hamburguesas',
        'Perros Calientes': 'pill-Perros',
        'Salvajadas': 'pill-Salvajadas',
        'Arepas': 'pill-Arepas',
        'Pizzas': 'pill-Pizzas'
    };

    const activePill = document.getElementById(mapping[category]);
    if (activePill) {
        activePill.classList.add('bg-yellow-400', 'text-black');
        activePill.classList.remove('bg-zinc-100', 'text-zinc-600', 'dark:text-zinc-400');
    }

    renderInteractiveGrid();
}

// Handle Live Search logic
function handleSearch(query) {
    const data = window.menuData || menuData;
    searchQuery = query.toLowerCase().trim();
    const resultsContainer = document.getElementById('search-results-container');
    const resultsGrid = document.getElementById('search-results-grid');

    if (!resultsContainer || !resultsGrid || !data) return;

    if (searchQuery === '') {
        resultsContainer.classList.add('hidden');
        return;
    }

    let results = [];
    Object.keys(data).forEach(cat => {
        if (cat === 'Adicionales') return;
        data[cat].forEach(item => {
            if (item.name.toLowerCase().includes(searchQuery) || (item.desc && item.desc.toLowerCase().includes(searchQuery))) {
                results.push({ ...item, category: cat });
            }
        });
    });

    if (results.length > 0) {
        resultsContainer.classList.remove('hidden');
        resultsGrid.innerHTML = results.map(item => `
            <div onclick="openItemModal('${item.id}', '${item.category}')" class="bg-white dark:bg-zinc-950 border border-yellow-400/50 dark:border-zinc-800/85 rounded-2xl p-4 cursor-pointer hover:border-yellow-400 transition-all shadow-sm">
                <span class="text-[9px] bg-red-600/10 text-red-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">${item.category}</span>
                <h4 class="font-extrabold text-zinc-800 dark:text-zinc-200 text-sm mt-1">${item.name}</h4>
                <p class="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 italic">${item.desc || ''}</p>
                <p class="text-red-600 dark:text-red-500 font-black text-sm mt-2">${formatCOP(item.price)}</p>
            </div>
        `).join('');
    } else {
        resultsContainer.classList.remove('hidden');
        resultsGrid.innerHTML = `<p class="col-span-full text-center text-zinc-500 text-xs py-4">No se encontraron resultados para "${query}"</p>`;
    }
}

function clearSearch() {
    const searchInput = document.getElementById('menu-search');
    if (searchInput) searchInput.value = '';
    const resultsContainer = document.getElementById('search-results-container');
    if (resultsContainer) resultsContainer.classList.add('hidden');
}

// Open Detail Modal to select item & adiciones
function openItemModal(itemId, category) {
    const data = window.menuData || menuData;
    const item = data[category].find(i => i.id === itemId);
    if (!item) return;

    currentEditingItem = { ...item, category };
    currentEditingQty = 1;
    tempSelectedModifiers = [];

    // Reset checkboxes inside modal
    const checkboxes = document.querySelectorAll('#detail-adiciones-list input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);

    const categoryEl = document.getElementById('detail-category');
    const titleEl = document.getElementById('detail-title');
    const descEl = document.getElementById('detail-desc');
    const qtyEl = document.getElementById('detail-qty');

    if (categoryEl) categoryEl.innerText = category;
    if (titleEl) titleEl.innerText = item.name;
    if (descEl) descEl.innerText = item.desc || "Producto fresco al carbón preparado al momento.";
    if (qtyEl) qtyEl.innerText = currentEditingQty;

    const priceEl = document.getElementById('detail-price');
    if (priceEl) priceEl.innerText = formatCOP(item.price);

    // Animate Modal Open
    const modal = document.getElementById('item-modal');
    const container = document.getElementById('item-modal-container');
    if (modal && container) {
        modal.classList.remove('pointer-events-none');
        modal.classList.add('opacity-100');
        container.classList.remove('scale-95');
        container.classList.add('scale-100');
    }
}

function closeItemModal() {
    const modal = document.getElementById('item-modal');
    const container = document.getElementById('item-modal-container');
    if (modal && container) {
        modal.classList.add('pointer-events-none');
        modal.classList.remove('opacity-100');
        container.classList.add('scale-95');
        container.classList.remove('scale-100');
    }
}

function changeQty(amt) {
    currentEditingQty = Math.max(1, currentEditingQty + amt);
    const qtyEl = document.getElementById('detail-qty');
    if (qtyEl) qtyEl.innerText = currentEditingQty;
}

function toggleModifier(modId) {
    const index = tempSelectedModifiers.indexOf(modId);
    if (index > -1) {
        tempSelectedModifiers.splice(index, 1);
    } else {
        tempSelectedModifiers.push(modId);
    }
}

// Add to Order cart array logic
// Add to Order cart array logic
function addItemToCart() {
    const data = window.menuData || menuData;
    let finalPrice = parsePrice(currentEditingItem.price);

    const activeModifiers = tempSelectedModifiers.map(id => data["Adicionales"].find(ad => ad.id === id));
    
    const cartItem = {
        id: currentEditingItem.id + Date.now(), // unique reference
        name: currentEditingItem.name,
        category: currentEditingItem.category,
        basePrice: finalPrice,
        qty: currentEditingQty,
        size: 'Estándar',
        modifiers: activeModifiers
    };

    cart.push(cartItem);
    saveCart();
    updateCartUI();
    closeItemModal();
    showToast(`¡Agregado ${cartItem.qty}x ${cartItem.name} al pedido!`);

    // Confetti explosion from cart button
    if (window.spawnConfetti) {
        const cartBtn = document.getElementById('open-cart-btn');
        if (cartBtn) {
            const rect = cartBtn.getBoundingClientRect();
            window.spawnConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
    }
}

// Update Cart list on side drawer
function updateCartUI() {
    const countBadge = document.getElementById('cart-nav-badge');
    const container = document.getElementById('cart-items-container');
    const emptyState = document.getElementById('cart-empty-state');
    const totalVal = document.getElementById('cart-total-value');

    let itemsCount = 0;
    let grandTotal = 0;

    if (cart.length === 0) {
        if (emptyState) emptyState.classList.remove('hidden');
        if (container) {
            container.innerHTML = '';
            if (emptyState) container.appendChild(emptyState);
        }
        if (countBadge) countBadge.innerText = '0';
        if (totalVal) totalVal.innerText = formatCOP(0);
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    
    let html = cart.map((item, index) => {
        itemsCount += item.qty;
        let modsTotal = item.modifiers.reduce((acc, m) => acc + parsePrice(m.price), 0);
        let itemTotal = (item.basePrice + modsTotal) * item.qty;
        grandTotal += itemTotal;

        return `
        <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl flex justify-between items-start gap-3 relative shadow-sm">
            <div class="flex-grow text-left">
                <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="text-xs bg-red-600/10 text-red-600 px-1.5 py-0.5 rounded font-bold">${item.qty}x</span>
                    <span class="font-extrabold text-zinc-800 dark:text-zinc-200 text-xs">${item.name}</span>
                </div>
                
                ${item.modifiers.length > 0 ? `
                <div class="mt-2 space-y-0.5">
                    <p class="text-[9px] text-zinc-500 dark:text-zinc-400 uppercase font-bold">Adicionales:</p>
                    ${item.modifiers.map(m => `
                        <span class="inline-block text-[10px] bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 mr-1 mt-1">
                            + ${m.name} (${formatCOP(m.price)})
                        </span>
                    `).join('')}
                </div>
                ` : ''}
                
                <p class="text-red-600 dark:text-red-500 font-black text-xs mt-2">${formatCOP(itemTotal)}</p>
            </div>

            <button onclick="removeItemFromCart('${item.id}')" class="text-zinc-400 hover:text-red-500 p-1">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
        </div>
        `;
    }).join('');

    if (container) container.innerHTML = html;
    if (countBadge) countBadge.innerText = itemsCount;
    if (totalVal) totalVal.innerText = formatCOP(grandTotal);

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function removeItemFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
    showToast("Platillo removido de tu pedido.");
}

// Cart Drawer slide out animation
function toggleCartModal() {
    const modal = document.getElementById('cart-modal');
    const sidebar = document.getElementById('cart-sidebar');

    if (!modal || !sidebar) return;

    if (modal.classList.contains('pointer-events-none')) {
        modal.classList.remove('pointer-events-none');
        modal.classList.add('opacity-100');
        sidebar.classList.remove('translate-x-full');
    } else {
        modal.classList.add('pointer-events-none');
        modal.classList.remove('opacity-100');
        sidebar.classList.add('translate-x-full');
    }
}

// Show Toast feedback helper
function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    if (!toast || !toastMsg) return;

    toastMsg.innerText = msg;
    toast.classList.remove('opacity-0', 'scale-90', 'pointer-events-none');
    toast.classList.add('opacity-100', 'scale-100');

    setTimeout(() => {
        toast.classList.add('opacity-0', 'scale-90', 'pointer-events-none');
        toast.classList.remove('opacity-100', 'scale-100');
    }, 2500);
}

// Send detailed order via WhatsApp
function sendOrderWhatsApp() {
    if (cart.length === 0) {
        showToast("Tu carrito está vacío.");
        return;
    }

    const notes = document.getElementById('cart-customer-notes').value.trim();
    let total = 0;

    let message = `🍔 *NUEVO PEDIDO: DONDE OMAR PARRILLAS* 🥩\n\n`;
    
    cart.forEach((item, index) => {
        let modsTotal = item.modifiers.reduce((acc, m) => acc + parsePrice(m.price), 0);
        let itemTotal = (item.basePrice + modsTotal) * item.qty;
        total += itemTotal;

        message += `Categoría: ${item.category} -> *${item.qty}x* ${item.name} -> *${formatCOP(itemTotal)}*\n`;
        
        if (item.modifiers.length > 0) {
            message += `   _Adicionales: ${item.modifiers.map(m => m.name).join(', ')}_\n`;
        }
        message += `\n`;
    });

    message += `━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *TOTAL A PAGAR:* ${formatCOP(total)}\n\n`;

    if (notes !== "") {
        message += `📝 *Detalles del Cliente y Entrega:*\n${notes}\n`;
    } else {
        message += `📝 *Detalles del Cliente y Entrega:*\n_No especificado_\n`;
    }
    message += `\n🚀 ¡Muchas gracias por preferir *Donde Omar Parrillas*!`;

    const config = window.CONFIG || { whatsappPhone: "573235073766" };
    const encodedText = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${config.whatsappPhone}?text=${encodedText}`;

    window.open(whatsappURL, '_blank');
}

// =========================================================================
// ASISTENTE VIRTUAL DE CHATBOT (LOCAL FAQ MATCHING ENGINE)
// =========================================================================

function loadChatHistory() {
    const saved = localStorage.getItem("omar_parrilla_chat_history");
    const historyContainer = document.getElementById('ai-chat-history');
    if (!historyContainer) return;
    
    historyContainer.innerHTML = '';
    
    if (saved) {
        try {
            chatHistory = JSON.parse(saved);
        } catch(e) {
            chatHistory = [];
        }
    }
    
    if (chatHistory.length === 0) {
        const initialMsg = {
            sender: 'ia',
            text: "¡Hola! Bienvenido a Donde Omar Parrillas. 🥩\n\nSoy tu Asistente Virtual y estoy aquí para ayudarte con lo que necesites: conocer nuestros ingredientes, calcular precios o sugerirte los mejores asados, picadas, hamburguesas y perros calientes.\n\n¿Qué te gustaría comer hoy, compae?",
            recommendedItemIds: []
        };
        chatHistory.push(initialMsg);
        saveChatHistory();
    }
    
    chatHistory.forEach(msg => {
        appendChatMessageDOM(msg.sender, msg.text, msg.recommendedItemIds);
    });
}

function saveChatHistory() {
    localStorage.setItem("omar_parrilla_chat_history", JSON.stringify(chatHistory));
}

function clearChatHistory() {
    if (confirm("¿Seguro que deseas borrar el historial de conversación?")) {
        chatHistory = [];
        localStorage.removeItem("omar_parrilla_chat_history");
        loadChatHistory();
    }
}

function sendQuickAiPrompt(text) {
    const input = document.getElementById('ai-chat-input');
    if (input) {
        input.value = text;
        sendAiMessage();
    }
}

function sendAiMessage() {
    const inputEl = document.getElementById('ai-chat-input');
    if (!inputEl) return;
    const userText = inputEl.value.trim();
    if (!userText) return;

    inputEl.value = '';
    appendChatMessage('user', userText);

    const loaderId = 'ai-loader-' + Date.now();
    appendLoaderMessage(loaderId);

    setTimeout(() => {
        removeLoaderMessage(loaderId);
        
        const responseData = getLocalAIResponse(userText);
        appendChatMessage('ia', responseData.conversationalResponse, responseData.recommendedItemIds);
    }, 600);
}

function getLocalAIResponse(userInput) {
    const data = window.menuData || menuData;
    const normalizedInput = userInput.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

    let conversationalResponse = "";
    let recommendedItemIds = [];

    // Category scanner
    let matchedCategory = null;
    if (normalizedInput.includes("asado")) {
        matchedCategory = "Asados al Carbón";
    } else if (normalizedInput.includes("picada")) {
        matchedCategory = "Picadas";
    } else if (normalizedInput.includes("mini picada")) {
        matchedCategory = "Mini Picadas";
    } else if (normalizedInput.includes("salchipapa")) {
        matchedCategory = "Línea de Salchipapas";
    } else if (normalizedInput.includes("suizo")) {
        matchedCategory = "Suizos";
    } else if (normalizedInput.includes("desgranado")) {
        matchedCategory = "Desgranados";
    } else if (normalizedInput.includes("patacon")) {
        matchedCategory = "Patacón con Todo";
    } else if (normalizedInput.includes("hamburguesa") || normalizedInput.includes("burger")) {
        matchedCategory = "Hamburguesas";
    } else if (normalizedInput.includes("perro")) {
        matchedCategory = "Perros Calientes";
    } else if (normalizedInput.includes("salvajada")) {
        matchedCategory = "Salvajadas";
    } else if (normalizedInput.includes("burrito") || normalizedInput.includes("especialidad")) {
        matchedCategory = "Especialidad (Burritos)";
    } else if (normalizedInput.includes("arepa")) {
        matchedCategory = "Arepas";
    } else if (normalizedInput.includes("pizza")) {
        matchedCategory = "Pizzas";
    }

    if (matchedCategory && data[matchedCategory]) {
        recommendedItemIds = data[matchedCategory].slice(0, 4).map(item => item.id);
    }

    // FAQ scan
    const faqs = window.FAQ_DATA || [];
    let matchedFaq = null;

    for (const faq of faqs) {
        for (const keyword of faq.keywords) {
            const normalizedKeyword = keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (normalizedInput.includes(normalizedKeyword)) {
                matchedFaq = faq;
                break;
            }
        }
        if (matchedFaq) break;
    }

    if (matchedFaq) {
        conversationalResponse = matchedFaq.answer;
    } else if (matchedCategory) {
        conversationalResponse = `¡Ajá compae! Aquí tienes algunas de nuestras opciones recomendadas de **${matchedCategory}**. Tocando sobre cualquiera de ellas verás sus detalles y podrás agregarla al pedido. ¿Qué se te antoja hoy?`;
    } else {
        conversationalResponse = `¡Hola compae! No alcancé a entender del todo tu pregunta. Recuerda que soy el chef virtual de Donde Omar Parrillas y te puedo orientar con lo siguiente:\n\n` +
            `• 💳 **Métodos de pago** (Nequi, Daviplata, efectivo)\n` +
            `• 📍 **Ubicación y dirección** del local\n` +
            `• 🕒 **Horarios de atención**\n` +
            `• 🛵 **Servicio a domicilio**\n` +
            `• 🥩 **Precios e ingredientes** de nuestros asados, hamburguesas y perros calientes\n\n¿De qué tienes antojo hoy?`;
    }

    return { conversationalResponse, recommendedItemIds };
}

function appendChatMessage(sender, text, recommendedItemIds = []) {
    chatHistory.push({ sender, text, recommendedItemIds });
    saveChatHistory();
    appendChatMessageDOM(sender, text, recommendedItemIds);
}

function appendChatMessageDOM(sender, text, recommendedItemIds = []) {
    const historyContainer = document.getElementById('ai-chat-history');
    if (!historyContainer) return;

    const wrapper = document.createElement('div');
    wrapper.className = `flex flex-col ${sender === 'user' ? 'items-end' : 'items-start'} gap-1.5`;

    const bubble = document.createElement('div');
    bubble.className = `chat-msg-bubble ${sender === 'user' ? 'chat-msg-user' : 'chat-msg-ia'}`;
    
    // Formatear saltos de línea y negritas en markdown simple
    let formattedText = text
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
        
    bubble.innerHTML = formattedText;
    wrapper.appendChild(bubble);

    // Si tiene recomendaciones, renderizar tarjetas interactivas de compra rápida
    if (recommendedItemIds && recommendedItemIds.length > 0) {
        const data = window.menuData || menuData;
        const flexWrap = document.createElement('div');
        flexWrap.className = "flex flex-wrap gap-2 mt-2 max-w-[90%]";

        recommendedItemIds.forEach(id => {
            let found = null;
            let foundCat = null;
            
            for (const cat of Object.keys(data)) {
                found = data[cat].find(item => item.id === id);
                if (found) {
                    foundCat = cat;
                    break;
                }
            }

            if (found) {
                const card = document.createElement('button');
                card.onclick = () => openItemModal(found.id, foundCat);
                card.className = "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-left hover:border-yellow-400 dark:hover:border-yellow-500 rounded-xl p-2.5 transition-all text-[11px] shadow-sm flex items-center justify-between w-full gap-2";
                card.innerHTML = `
                    <div>
                        <span class="font-extrabold text-zinc-800 dark:text-zinc-200 block">${found.name}</span>
                        <span class="text-red-600 dark:text-red-500 font-bold">${formatCOP(found.price)}</span>
                    </div>
                    <span class="bg-yellow-400 text-black p-1 rounded-lg"><i data-lucide="plus" class="w-3 h-3"></i></span>
                `;
                flexWrap.appendChild(card);
            }
        });
        wrapper.appendChild(flexWrap);
    }

    historyContainer.appendChild(wrapper);
    historyContainer.scrollTop = historyContainer.scrollHeight;

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function appendLoaderMessage(loaderId) {
    const historyContainer = document.getElementById('ai-chat-history');
    if (!historyContainer) return;

    const wrapper = document.createElement('div');
    wrapper.className = "flex flex-col items-start gap-1.5";
    wrapper.id = loaderId;

    const bubble = document.createElement('div');
    bubble.className = "chat-msg-bubble chat-msg-ia flex items-center gap-1.5 py-3 px-4";
    bubble.innerHTML = `
        <span class="text-zinc-400 dark:text-zinc-500 text-xs">Escribiendo</span>
        <div class="loader-dots flex gap-1">
            <span class="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
            <span class="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
            <span class="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
        </div>
    `;
    
    wrapper.appendChild(bubble);
    historyContainer.appendChild(wrapper);
    historyContainer.scrollTop = historyContainer.scrollHeight;
}

function removeLoaderMessage(loaderId) {
    const loaderEl = document.getElementById(loaderId);
    if (loaderEl) loaderEl.remove();
}

// Shop status calculation
function updateShopStatus() {
    const statusText = document.querySelector('.status-text');
    const statusDot = document.querySelector('.status-dot');
    
    if (statusText && statusDot) {
        const now = new Date();
        const currentHour = now.getHours();
        
        // Open from 4:00 PM (16) to 12:00 AM (24)
        if (currentHour >= 16 && currentHour < 24) {
            statusDot.classList.add('open');
            statusText.textContent = "Abierto Ahora (4pm - 12am) 🔥";
        } else {
            statusDot.classList.remove('open');
            statusText.textContent = "Cerrado (Abre a las 4:00 p.m.) 💤";
        }
    }
}

// Global Header Event Listeners
function setupHeaderListeners() {
    const menuToggle = document.getElementById('mobile-menu-toggle-btn');
    const header = document.querySelector('.navbar-header');
    
    if (menuToggle && header) {
        menuToggle.addEventListener('click', () => {
            header.classList.toggle('mobile-open');
        });
    }

    // Scroll to Top visibility
    const scrollTopBtn = document.getElementById('scroll-to-top-btn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    }, { passive: true });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Theme Toggle click event
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
}

// Load configurations to header/footer visual blocks
function loadBusinessSettings() {
    const config = window.CONFIG;
    if (!config) return;

    const waLink = document.querySelectorAll('.nav-wa-btn');
    const welcomeText = encodeURIComponent("¡Hola! Quisiera realizar un pedido de Donde Omar Parrillas.");
    waLink.forEach(btn => {
        btn.setAttribute('href', `https://wa.me/${config.whatsappPhone}?text=${welcomeText}`);
    });

    // Populate Instagram, Facebook, Tiktok badges
    const socialContainer = document.getElementById('social-badges-container');
    if (socialContainer) {
        let html = "";
        if (config.instagramUrl) html += `<a href="${config.instagramUrl}" target="_blank" rel="noreferrer" class="social-badge">Instagram</a>`;
        if (config.tiktokUrl) html += `<a href="${config.tiktokUrl}" target="_blank" rel="noreferrer" class="social-badge">TikTok</a>`;
        if (config.facebookUrl) html += `<a href="${config.facebookUrl}" target="_blank" rel="noreferrer" class="social-badge">Facebook</a>`;
        html += `<a href="https://wa.me/${config.whatsappPhone}?text=${welcomeText}" target="_blank" rel="noreferrer" class="social-badge">WhatsApp</a>`;
        
        socialContainer.innerHTML = html;
    }
}

// Theme controls
function initTheme() {
    const currentTheme = localStorage.getItem("theme") || "dark";
    const icon = document.getElementById("theme-toggle-icon");
    if (currentTheme === "light") {
        document.documentElement.classList.add("light-theme");
        document.documentElement.classList.remove("dark");
        document.body.classList.add("light-theme");
        if (icon) icon.setAttribute("data-lucide", "sun");
    } else {
        document.documentElement.classList.remove("light-theme");
        document.documentElement.classList.add("dark");
        document.body.classList.remove("light-theme");
        if (icon) icon.setAttribute("data-lucide", "moon");
    }
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function toggleTheme() {
    const isLight = document.documentElement.classList.contains("light-theme");
    const icon = document.getElementById("theme-toggle-icon");
    if (isLight) {
        document.documentElement.classList.remove("light-theme");
        document.documentElement.classList.add("dark");
        document.body.classList.remove("light-theme");
        localStorage.setItem("theme", "dark");
        if (icon) icon.setAttribute("data-lucide", "moon");
    } else {
        document.documentElement.classList.add("light-theme");
        document.documentElement.classList.remove("dark");
        document.body.classList.add("light-theme");
        localStorage.setItem("theme", "light");
        if (icon) icon.setAttribute("data-lucide", "sun");
    }
    if (window.lucide) {
        window.lucide.createIcons();
    }
}
