// =========================================================================
// GESTOR DE CARRITO DE COMPRAS COMPARTIDO (localStorage)
// =========================================================================

// Cargar carrito de localStorage
window.cart = {};

function initCart() {
    try {
        const saved = localStorage.getItem("omar_parrilla_cart");
        if (saved) {
            window.cart = JSON.parse(saved);
        }
    } catch (e) {
        console.error("Error al cargar el carrito:", e);
        window.cart = {};
    }
}

// Extrae el precio de un string (ej. "$15.000" -> 15000)
window.parsePrice = function(priceStr) {
    if (!priceStr) return 0;
    const basePriceStr = priceStr.split("-")[0];
    const cleaned = basePriceStr.replace(/[^0-9]/g, "");
    const parsed = parseInt(cleaned, 10);
    return isNaN(parsed) ? 0 : parsed;
};

// Formatea el precio a moneda colombiana (ej. 15000 -> "$ 15.000")
window.formatPrice = function(amount) {
    return "$ " + amount.toLocaleString("es-CO");
};

// Añade un elemento al carrito
window.addToCart = function(itemId, callback) {
    const item = window.MENU_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    if (window.cart[itemId]) {
        window.cart[itemId].quantity += 1;
    } else {
        window.cart[itemId] = { item, quantity: 1 };
    }
    
    saveCart();
    if (callback) callback();
};

// Resta un elemento del carrito
window.removeFromCart = function(itemId, callback) {
    if (!window.cart[itemId]) return;
    
    if (window.cart[itemId].quantity > 1) {
        window.cart[itemId].quantity -= 1;
    } else {
        delete window.cart[itemId];
    }
    
    saveCart();
    if (callback) callback();
};

// Elimina por completo un item del carrito
window.removeAllOfItem = function(itemId, callback) {
    if (window.cart[itemId]) {
        delete window.cart[itemId];
        saveCart();
    }
    if (callback) callback();
};

// Devuelve el número total de items en el carrito
window.getCartCount = function() {
    return Object.values(window.cart).reduce((sum, cartItem) => sum + cartItem.quantity, 0);
};

// Devuelve el valor total de la compra en el carrito
window.getCartTotal = function() {
    return Object.values(window.cart).reduce((sum, cartItem) => {
        const price = window.parsePrice(cartItem.item.price);
        return sum + (price * cartItem.quantity);
    }, 0);
};

// Sincroniza el estado del carrito con localStorage y actualiza las insignias visuales
function saveCart() {
    localStorage.setItem("omar_parrilla_cart", JSON.stringify(window.cart));
    window.updateGlobalCartBadges();
}

// Actualiza las insignias del carrito en el header o flotantes
window.updateGlobalCartBadges = function() {
    const totalCount = window.getCartCount();
    
    const navCartBadge = document.getElementById("cart-nav-badge");
    const floatingCartTrigger = document.getElementById("floating-cart-trigger");
    const floatingCartBadge = document.getElementById("cart-floating-badge");

    if (navCartBadge) {
        navCartBadge.textContent = totalCount;
        navCartBadge.style.display = totalCount > 0 ? "grid" : "none";
    }

    if (floatingCartBadge) {
        floatingCartBadge.textContent = totalCount;
    }

    if (floatingCartTrigger) {
        // En la página de carta.html, el carrito flotante solo se muestra en móviles
        // En index.html se muestra en móviles si tiene items.
        floatingCartTrigger.style.display = totalCount > 0 ? "flex" : "none";
    }

    // Inicializar o refrescar iconos de Lucide
    if (window.lucide) {
        window.lucide.createIcons();
    }
};


// Inicializar el carrito inmediatamente
initCart();
document.addEventListener("DOMContentLoaded", () => {
    window.updateGlobalCartBadges();
});
