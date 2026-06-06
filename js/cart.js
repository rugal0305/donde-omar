// =========================================================================
// GESTOR DE CARRITO DE COMPRAS COMPARTIDO (localStorage como Array)
// =========================================================================

window.cart = [];

function initCart() {
    try {
        const saved = localStorage.getItem("omar_parrilla_cart");
        if (saved) {
            window.cart = JSON.parse(saved);
            if (!Array.isArray(window.cart)) {
                window.cart = [];
            }
        }
    } catch (e) {
        console.error("Error al cargar el carrito:", e);
        window.cart = [];
    }
}

// Extrae el precio de un string o retorna el número (ej. "$15.000" -> 15000)
window.parsePrice = function(priceVal) {
    if (typeof priceVal === 'number') return priceVal;
    if (!priceVal) return 0;
    const basePriceStr = priceVal.split("-")[0];
    const cleaned = basePriceStr.replace(/[^0-9]/g, "");
    const parsed = parseInt(cleaned, 10);
    return isNaN(parsed) ? 0 : parsed;
};

// Formatea el precio a moneda colombiana (ej. 15000 -> "$ 15.000")
window.formatPrice = function(amount) {
    return "$ " + amount.toLocaleString("es-CO");
};

// Devuelve el número total de items en el carrito (suma de cantidades)
window.getCartCount = function() {
    if (!Array.isArray(window.cart)) return 0;
    return window.cart.reduce((sum, item) => sum + (item.qty || 0), 0);
};

// Devuelve el valor total de la compra en el carrito (base + adiciones)
window.getCartTotal = function() {
    if (!Array.isArray(window.cart)) return 0;
    return window.cart.reduce((sum, item) => {
        const base = window.parsePrice(item.basePrice);
        const modsTotal = Array.isArray(item.modifiers) 
            ? item.modifiers.reduce((acc, m) => acc + window.parsePrice(m.price), 0) 
            : 0;
        return sum + ((base + modsTotal) * (item.qty || 0));
    }, 0);
};

// Sincroniza el estado del carrito con localStorage y actualiza insignias
window.saveCartState = function() {
    localStorage.setItem("omar_parrilla_cart", JSON.stringify(window.cart));
    window.updateGlobalCartBadges();
};

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
        floatingCartTrigger.style.display = totalCount > 0 ? "flex" : "none";
    }

    // Inicializar o refrescar iconos de Lucide si están disponibles
    if (window.lucide) {
        window.lucide.createIcons();
    }
};

// Inicializar el carrito inmediatamente
initCart();
document.addEventListener("DOMContentLoaded", () => {
    window.updateGlobalCartBadges();
});
