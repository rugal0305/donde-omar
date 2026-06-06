// =========================================================================
// CONFIGURACIÓN DE DATOS DEL NEGOCIO DONDE OMAR PARRILLAS
// =========================================================================
window.CONFIG = {
    // Nombre comercial del restaurante
    businessName: "Donde Omar Parrillas",
    
    // Celular WhatsApp para recibir pedidos (con indicativo de país, sin espacios ni símbolos)
    whatsappPhone: "573235073766", 
    
    // Teléfono para llamadas directas
    phoneCall: "+57 323 507 3766",
    
    // Correo de contacto
    email: "pedidos@dondeomarparrillas.demo",
    
    // Dirección física del local
    address: "Cra 30 #32-34, Montería, Córdoba",
    
    // Horario de atención
    businessHours: "Todos los días, 4:00 p.m. - 12:00 a.m.",
    
    // Redes Sociales (Pon "" en las que no tengas para ocultar el botón)
    instagramUrl: "https://www.instagram.com/omar.parrilla.37",
    tiktokUrl: "",
    facebookUrl: "https://www.facebook.com/omar.parrilla.37/",
    youtubeUrl: "" // Oculto por defecto
};

// =========================================================================
// BASE DE DATOS DEL MENÚ CATEGORIZADA (DONDE OMAR PARRILLAS)
// =========================================================================
window.menuData = {
    "Asados al Carbón": [
        { id: "asado-cerdo", icon: "🥩", name: "Cerdo Asado", price: 15000, desc: "Lomo de cerdo jugoso al carbón, servido con papa, yuca y ensalada fresca." },
        { id: "asado-chuleta", icon: "🥩", name: "Chuleta de Cerdo", price: 15000, desc: "Chuleta de cerdo asada a las brasas, acompañada de papa, yuca y ensalada." },
        { id: "asado-bbq", icon: "🥩", name: "Chuleta BBQ", price: 15000, desc: "Chuleta con deliciosa salsa BBQ artesanal, servida con patacón y ensalada." },
        { id: "asado-res", icon: "🥩", name: "Carne Asada", price: 15000, desc: "Corte de carne de res premium al carbón, servido con yuca, papa y ensalada." },
        { id: "asado-pechuga", icon: "🍗", name: "Pechuga Asada", price: 15000, desc: "Filete de pechuga de pollo asada al carbón, acompañada de papa y ensalada." },
        { id: "asado-mixta", icon: "🥩", name: "Bandeja Mixta", price: 15000, desc: "Combinación de carne de res y cerdo asadas, acompañada de patacón y ensalada." },
        { id: "asado-pech-enceb", icon: "🍗", name: "Pechuga Encebollada", price: 16000, desc: "Filete de pechuga cubierto con cebolla caramelizada, servido con patacón y ensalada." },
        { id: "asado-trifasica", icon: "🥩", name: "Bandeja Trifásica", price: 18000, desc: "Carne de res, cerdo y pechuga de pollo asadas a la parrilla, con patacón y ensalada." },
        { id: "asado-punta", icon: "🥩", name: "Punta de Anca", price: 20000, desc: "Exquisito corte de punta gorda al carbón, acompañado de yuca, papa y ensalada." },
        { id: "asado-churrasco", icon: "🥩", name: "Churrasco", price: 20000, desc: "Tierno lomito chato de res asado en su punto, servido con patacón y ensalada fresca." }
    ],
    "Picadas": [
        { id: "picada-personal", icon: "🍲", name: "Picada Personal", price: 20000, desc: "Cortes de cerdo, carne de res, chorizo, cebolla, pimentón asado, lechuga y patacón." },
        { id: "picada-duo", icon: "🍲", name: "Picada Duo", price: 25000, desc: "Porción ideal para dos: cerdo, carne, chorizo, cebolla, pimentón, lechuga y patacón." },
        { id: "picada-familiar", icon: "🍲", name: "Picada Familiar", price: 35000, desc: "Cargada con carne de res, cerdo, pechuga de pollo, chorizo, cebolla, pimentón, lechuga y patacón." },
        { id: "picada-don-omar", icon: "🍲", name: "Picada Don Omar", price: 45000, desc: "Especialidad: carne, cerdo, pechuga, tocineta, maíz tierno, salchicha suiza, chorizo, patacón, cebolla, pimentón y queso costeño." },
        { id: "mega-picada", icon: "🍲", name: "Mega Picada", price: 60000, desc: "Porción gigante: cerdo, carne, pechuga, cebolla, pimentón, queso costeño y 60 patacones." }
    ],
    "Mini Picadas": [
        { id: "mini-cerdo", icon: "🍢", name: "Picada de Cerdo", price: 15000, desc: "Trozos de lomo de cerdo al carbón con lechuga, patacón, cebolla, pimentón y chorizo." },
        { id: "mini-carne", icon: "🍢", name: "Picada de Carne", price: 15000, desc: "Carne de res seleccionada a las brasas con lechuga, patacón, cebolla, pimentón y chorizo." },
        { id: "mini-pechuga", icon: "🍢", name: "Picada de Pechuga", price: 15000, desc: "Filetes de pechuga en cubos al carbón con lechuga, patacón, cebolla, pimentón y chorizo." }
    ],
    "Línea de Salchipapas": [
        { id: "salchipapa-sencilla", icon: "🍟", name: "Salchipapa Sencilla", price: 10000, desc: "Salchicha manguera, papas a la francesa crujientes, lechuga y abundante queso costeño." },
        { id: "choripapa", icon: "🍟", name: "Choripapa", price: 13000, desc: "Deliciosas papas fritas con salchicha manguera, chorizo asado, lechuga y queso costeño." },
        { id: "salchipapa-pollo", icon: "🍟", name: "Salchipapa con Pollo", price: 14000, desc: "Papas francesas con salchicha manguera, pollo desmechado, lechuga y queso costeño." },
        { id: "salchipapa-trifasica", icon: "🍟", name: "Salchipapa Trifásica", price: 16000, desc: "Papas fritas con salchicha manguera, butifarra, chorizo parrillero, suiza, lechuga y queso costeño." },
        { id: "salchipapa-todo", icon: "🍟", name: "Salchipapa con Todo", price: 18000, desc: "Salchicha manguera, pollo, carne en trozos, papas francesas, lechuga, queso mozzarella, chorizo y butifarra." }
    ],
    "Suizos": [
        { id: "suizo-mini", icon: "🌭", name: "Mini Suizos", price: "$10.000 - $12.000", desc: "(Vapor o Francesa) Papa, media salchicha suiza, salami, cebolla, queso costeño, papa ripio y lechuga." },
        { id: "suizo-mini-esp", icon: "🌭", name: "Mini Suizo Especial", price: "$12.000 - $14.000", desc: "(Vapor o Francesa) Papa, media suiza, salami, pollo desmechado, cebolla, lechuga, queso costeño y papa ripio." },
        { id: "suizo-sencillo", icon: "🌭", name: "Suizo Sencillo", price: "$13.000 - $15.000", desc: "(Vapor o Francesa) Papa, salchicha suiza entera, lechuga, salami, cebolla, queso costeño y papa ripio." },
        { id: "suizo-especial", icon: "🌭", name: "Suizo Especial", price: "$16.000 - $17.000", desc: "(Vapor o Francesa) Papa, lechuga, suiza entera, salami, pollo desmechado, queso costeño y papa ripio." },
        { id: "suizo-todo", icon: "🌭", name: "Suizo con Todo", price: "$26.000 - $29.000", desc: "(Vapor o Francesa) Doble francesa, suiza entera, salami, tocineta, cerdo, pollo, jamón, queso mozzarella y papa ripio." }
    ],
    "Desgranados": [
        { id: "desgranado-pollo", icon: "🌽", name: "Desgranado con Pollo", price: 14000, desc: "Papas francesas, maíz tierno, pollo en trozos, lechuga, papa ripio y queso mozzarella fundido." },
        { id: "desgranado-mixto", icon: "🌽", name: "Desgranado Mixto", price: 16000, desc: "Papas fritas, maíz tierno, pollo y cerdo en trozos, lechuga, papa ripio y queso mozzarella derretido." },
        { id: "desgranado-especial", icon: "🌽", name: "Desgranado Especial", price: 20000, desc: "Salchicha suiza, jamón, salami, maíz tierno, tocineta, papa ripio, francesa, lechuga y queso mozzarella." },
        { id: "desgranado-todo", icon: "🌽", name: "Desgranado con Todo", price: 23000, desc: "Cerdo y pollo, salchicha suiza, salchicha ranchera, francesa, maíz, lechuga, papa ripio y queso mozzarella." }
    ],
    "Patacón con Todo": [
        { id: "patacon-mixto", icon: "🫓", name: "Patacón Mixto", price: 12000, desc: "Crujiente patacón con lechuga, cerdo y pollo en trozos, cebolla, queso costeño y papa ripio." },
        { id: "patacon-trifasico", icon: "🫓", name: "Patacón Trifásico", price: 14000, desc: "Patacón con lechuga, cerdo, pollo, chorizo asado, cebolla, queso costeño y papa ripio." },
        { id: "patacon-especial", icon: "🫓", name: "Patacón Especial", price: 16000, desc: "Patacón cargado con jamón, tocineta, salami, pollo, cerdo, cebolla, queso costeño, lechuga y papa ripio." }
    ],
    "Hamburguesas": [
        { id: "hamb-sencilla", icon: "🍔", name: "Hamburguesa Sencilla", price: 7000, desc: "Carne artesanal de la casa, lechuga fresca, cebolla, tomate y queso mozzarella fundido." },
        { id: "hamb-doble", icon: "🍔", name: "Doble Jamón y Doble Queso", price: 10000, desc: "Carne artesanal, lechuga, cebolla, tomate, doble porción de jamón y doble queso mozzarella." },
        { id: "hamb-pollo", icon: "🍔", name: "Hamburguesa de Pollo", price: 11000, desc: "Filete de pechuga de pollo, cebolla, tomate, lechuga, jamón y queso mozzarella." },
        { id: "hamb-especial", icon: "🍔", name: "Hamburguesa Especial con Francesa", price: 16000, desc: "Carne artesanal, lechuga, cebolla, tomate, jamón, tocineta crujiente, queso mozzarella y papas francesas." },
        { id: "hamb-doble-carne", icon: "🍔", name: "Doble Carne con Francesa", price: 17000, desc: "Doble carne artesanal de la casa, lechuga, cebolla, tomate, jamón, doble queso mozzarella y papas francesas." },
        { id: "hamb-mixta", icon: "🍔", name: "Hamburguesa Mixta con Francesa", price: 18000, desc: "Carne de la casa, pechuga a la plancha, cebolla, tomate, lechuga, jamón, doble queso y papas francesas." }
    ],
    "Perros Calientes": [
        { id: "perro-sencillo", icon: "🌭", name: "Perro Sencillo", price: 5000, desc: "Salchicha americana, cebolla, lechuga, queso costeño, papa ripio y queso mozzarella derretido." },
        { id: "perro-apanado", icon: "🌭", name: "Perro Apanado", price: 6000, desc: "Salchicha, cebolla, jamón, papa ripio, lechuga fresca, queso mozzarella y queso costeño." },
        { id: "perro-gemelo", icon: "🌭", name: "Perro Gemelo", price: 8000, desc: "Doble salchicha americana, cebolla, papa ripio, lechuga, queso mozzarella y queso costeño." },
        { id: "perro-pollo", icon: "🌭", name: "Perro Pollo", price: 9000, desc: "Salchicha, pollo desmechado, cebolla, lechuga, jamón, papa ripio, queso costeño y mozzarella." },
        { id: "choriperro", icon: "🌭", name: "Choriperro", price: 9000, desc: "Chorizo asado al carbón, cebolla, lechuga, papa ripio, jamón de ternera, queso costeño y mozzarella." },
        { id: "perro-ranchero", icon: "🌭", name: "Perro Ranchero", price: 10000, desc: "Salchicha ranchera seleccionada, cebolla, lechuga, papa ripio, jamón, queso costeño y mozzarella." },
        { id: "perro-especial", icon: "🌭", name: "Perro Especial", price: 10000, desc: "Salchicha, jamón, tocineta crujiente, cebolla, lechuga, papa ripio, queso costeño y mozzarella fundido." },
        { id: "perro-suizo", icon: "🌭", name: "Perro Suizo", price: 13000, desc: "Salchicha suiza premium, pechuga, cebolla, papa ripio, jamón, queso costeño y mozzarella." },
        { id: "perro-suizo-plancha", icon: "🌭", name: "Suizo a la Plancha", price: 14000, desc: "Salchicha suiza a la plancha, cebolla, lechuga, papa ripio, jamón, queso costeño y mozzarella." },
        { id: "perro-mixto", icon: "🌭", name: "Perro Mixto", price: 15000, desc: "Salchicha, pollo, carne, lechuga, cebolla, papa ripio, jamón, queso costeño y mozzarella derretido." }
    ],
    "Salvajadas": [
        { id: "salvajada-sencilla", icon: "🍖", name: "Salvajada Sencilla", price: 20000, desc: "Pollo en trozos, chorizo, butifarra, papas francesas, lechuga, cebolla, queso costeño y papa ripio." },
        { id: "salvajada-doble", icon: "🍖", name: "Salvajada Doble", price: 33000, desc: "Pollo, cerdo, butifarra, chorizo parrillero, doble porción de francesa, queso mozzarella, papa ripio, lechuga y cebolla." },
        { id: "salvajada-especial", icon: "🍖", name: "Salvajada Especial", price: 40000, desc: "Pollo, lomo de cerdo, butifarra, chorizo, triple porción de francesa, queso mozzarella, lechuga, cebolla y papa ripio." }
    ],
    "Especialidad (Burritos)": [
        { id: "burrito-mexicano", icon: "🌯", name: "Burritos Mexicanos", price: 20000, desc: "Cortes de carne, pollo, chorizo, butifarra, maíz tierno, tomate picado, cebolla, queso mozzarella fundido y guacamole fresco." }
    ],
    "Arepas": [
        { id: "arepa-queso", icon: "🫓", name: "Arepa de Queso", price: 4000, desc: "Deliciosa arepa de maíz asada y rellena de abundante queso mozzarella derretido." },
        { id: "arepa-jamon", icon: "🫓", name: "Arepa de Jamón", price: 5000, desc: "Arepa rellena de jamón seleccionado y abundante queso mozzarella fundido." },
        { id: "arepa-hamb", icon: "🫓", name: "Arepa con Carne", price: 6000, desc: "Arepa asada rellena con sabrosa carne artesanal de hamburguesa y queso mozzarella." },
        { id: "arepa-pollo", icon: "🫓", name: "Arepa de Pollo", price: 7000, desc: "Arepa rellena con jugoso pollo desmechado y abundante queso mozzarella." },
        { id: "arepa-res", icon: "🫓", name: "Arepa de Carne Desmechada", price: 7000, desc: "Arepa rellena con tierna carne de res desmechada y queso mozzarella derretido." },
        { id: "arepa-chorizo", icon: "🫓", name: "Arepa de Chorizo", price: 7000, desc: "Arepa rellena con trozos de chorizo parrillero asado y queso mozzarella." },
        { id: "arepa-suiza", icon: "🫓", name: "Arepa Suiza", price: 8000, desc: "Arepa asada con trozos de salchicha suiza premium y queso mozzarella fundido." },
        { id: "arepa-mixta", icon: "🫓", name: "Arepa Mixta", price: 9000, desc: "Arepa rellena de carne desmechada, pollo desmechado, queso costeño y queso mozzarella." },
        { id: "arepa-todo", icon: "🫓", name: "Arepa con Todo", price: 12000, desc: "Arepa cargada con carne de hamburguesa, pollo, jamón, chorizo, queso costeño y mozzarella." }
    ],
    "Pizzas": [
        // PIZZAS PERSONALES
        { id: "pizza-pers-jq", icon: "🍕", name: "Jamón y Queso (Personal)", price: 12000, desc: "Pasta de tomate de la casa, jamón seleccionado y queso mozzarella fundido." },
        { id: "pizza-pers-haw", icon: "🍕", name: "Hawaiana (Personal)", price: 14000, desc: "Pasta de tomate, jamón premium y dulce piña calada con queso mozzarella." },
        { id: "pizza-pers-pol", icon: "🍕", name: "Pizza Pollo (Personal)", price: 14000, desc: "Pasta de tomate de la casa, jugosa pechuga de pollo desmechada y queso mozzarella." },
        { id: "pizza-pers-pep", icon: "🍕", name: "Pepperoni (Personal)", price: 15000, desc: "Pasta de tomate de la casa, jamón, queso mozzarella y pepperoni madurado." },
        { id: "pizza-pers-cp", icon: "🍕", name: "Champiñón y Pollo (Personal)", price: 15000, desc: "Pasta de tomate, pollo desmechado, champiñones frescos fileteados y queso mozzarella." },
        { id: "pizza-pers-3c", icon: "🍕", name: "3 Carnes (Personal)", price: 15000, desc: "Pasta de tomate, queso mozzarella y una deliciosa combinación de tres carnes seleccionadas." },
        { id: "pizza-pers-ame", icon: "🍕", name: "Americana (Personal)", price: 16000, desc: "Pasta de tomate de la casa, jamón, tocineta ahumada, maíz tierno y queso mozzarella." },
        { id: "pizza-pers-jcp", icon: "🍕", name: "Jamón, Champiñón y Pepperoni (Personal)", price: 16000, desc: "Pasta de tomate de la casa, jamón, champiñones, pepperoni y queso mozzarella." },
        { id: "pizza-pers-tri", icon: "🍕", name: "Trifásica (Personal)", price: 16000, desc: "Pasta de tomate, piña calada, pollo, jamón, papa ripio y queso mozzarella." },
        { id: "pizza-pers-casa", icon: "🍕", name: "Pizza de la Casa (Personal)", price: 18000, desc: "Pasta de tomate, jamón, champiñón, tocineta, cebolla, pimentón, maíz tierno y doble queso mozzarella." },

        // PIZZAS POR PORCIÓN
        { id: "pizza-porc-jq", icon: "🍕", name: "Jamón y Queso (Porción)", price: 6000, desc: "Generosa porción de pizza con pasta de tomate de la casa, jamón y queso mozzarella." },
        { id: "pizza-porc-haw", icon: "🍕", name: "Hawaiana (Porción)", price: 7000, desc: "Porción de pizza con jamón, piña calada y abundante queso mozzarella fundido." },
        { id: "pizza-porc-cho", icon: "🍕", name: "Pizza con Chorizo (Porción)", price: 9000, desc: "Porción de pizza con jamón, queso mozzarella y rodajas de chorizo parrillero asado." },
        { id: "pizza-porc-ran", icon: "🍕", name: "Rancherita (Porción)", price: 10000, desc: "Porción de pizza con jamón, queso mozzarella y trozos de salchicha ranchera." },
        { id: "pizza-porc-jp", icon: "🍕", name: "Jamón y Pollo (Porción)", price: 10000, desc: "Porción de pizza con jamón, jugosa pechuga de pollo desmechada y queso mozzarella." },
        { id: "pizza-porc-tri", icon: "🍕", name: "Pizza Trifásica (Porción)", price: 12000, desc: "Porción con jamón, queso, pollo desmechado, piña dulce, champiñones y papa ripio crujiente." },
        { id: "pizza-porc-ale", icon: "🍕", name: "Pizza Alemana (Porción)", price: 13000, desc: "Porción de pizza cargada con jamón, queso, tocineta, trozos de salchicha suiza y maíz." },
        { id: "pizza-porc-sem", icon: "🍕", name: "Pizza Semi Remontada (Porción)", price: 14000, desc: "Porción de pizza con jamón, queso, pollo, piña, champiñón, tocineta, cebolla, pimentón y doble queso." },
        { id: "pizza-porc-rem", icon: "🍕", name: "Pizza Remontada (Porción)", price: 16000, desc: "Super porción con jamón, queso, cebolla, pimentón, pollo, piña, champiñón, salchicha ranchera y doble queso." },

        // PIZZAS MEDIANAS
        { id: "pizza-med-jq", icon: "🍕", name: "Jamón y Queso (Mediana)", price: 27000, desc: "Pizza mediana con pasta de tomate de la casa, jamón premium y queso mozzarella fundido." },
        { id: "pizza-med-haw", icon: "🍕", name: "Hawaiana (Mediana)", price: 35000, desc: "Pizza mediana con jamón, piña dulce seleccionada y abundante queso mozzarella fundido." },
        { id: "pizza-med-pol", icon: "🍕", name: "Pizza de Pollo (Mediana)", price: 40000, desc: "Pizza mediana con pasta de tomate de la casa, pechuga de pollo desmechada y queso mozzarella." },
        { id: "pizza-med-ran", icon: "🍕", name: "Rancherita (Mediana)", price: 45000, desc: "Pizza mediana con jamón, queso mozzarella fundido y trozos de salchicha ranchera." },
        { id: "pizza-med-tri", icon: "🍕", name: "Trifásica (Mediana)", price: 50000, desc: "Mediana con jamón, queso, pollo desmechado, piña, champiñones y papa ripio crujiente." },
        { id: "pizza-med-sem", icon: "🍕", name: "Semiremontada (Mediana)", price: 55000, desc: "Mediana con jamón, queso, cebolla, pimentón, pollo, piña, champiñón, salchicha ranchera y doble mozzarella." },

        // PIZZAS FAMILIARES
        { id: "pizza-fam-jq", icon: "🍕", name: "Jamón y Queso (Familiar)", price: 53000, desc: "Pizza familiar gigante con pasta de tomate de la casa, jamón premium y queso mozzarella fundido." },
        { id: "pizza-fam-haw", icon: "🍕", name: "Hawaiana (Familiar)", price: 60000, desc: "Pizza familiar gigante con jamón, piña dulce calada de la casa y abundante queso mozzarella." },
        { id: "pizza-fam-jp", icon: "🍕", name: "Jamón y Pollo (Familiar)", price: 77000, desc: "Familiar gigante con jamón premium, jugosa pechuga de pollo desmechada y queso mozzarella." },
        { id: "pizza-fam-pc", icon: "🍕", name: "Pollo y Champiñón (Familiar)", price: 77000, desc: "Familiar gigante con pasta de tomate, pechuga desmechada, champiñones frescos y queso mozzarella." },
        { id: "pizza-fam-ran", icon: "🍕", name: "Rancherita (Familiar)", price: 78000, desc: "Familiar gigante con jamón premium, queso mozzarella fundido y abundante salchicha ranchera." }
    ],
    "Adicionales": [
        { id: "adic-patacon", icon: "🍽️", name: "Patacón", price: 3000 },
        { id: "adic-papas", icon: "🍽️", name: "Papas al Vapor", price: 3000 },
        { id: "adic-ensalada", icon: "🍽️", name: "Ensalada", price: 3000 },
        { id: "adic-maiz", icon: "🍽️", name: "Maíz", price: 3000 },
        { id: "adic-tocineta", icon: "🍽️", name: "Tocineta", price: 4000 },
        { id: "adic-francesa", icon: "🍽️", name: "Francesa", price: 5000 },
        { id: "adic-gratinado-p", icon: "🍽️", name: "Gratinado P", price: 6000 },
        { id: "adic-suiza", icon: "🍽️", name: "Suiza", price: 7000 },
        { id: "adic-gratinado-g", icon: "🍽️", name: "Gratinado G", price: 8000 }
    ]
};

// =========================================================================
// MUESTREO PLANO DE COMPATIBILIDAD CON LANDING PAGE (index.html)
// =========================================================================
window.MENU_ITEMS = [];
Object.keys(window.menuData).forEach(category => {
    window.menuData[category].forEach(item => {
        let priceStr = "";
        if (typeof item.price === "number") {
            priceStr = "$" + item.price.toLocaleString("es-CO");
        } else {
            priceStr = item.price; // Si ya es rango de texto (ej. "$10.000 - $12.000")
        }

        window.MENU_ITEMS.push({
            id: item.id,
            icon: item.icon || "🍽️",
            name: item.name,
            description: `[${category.toUpperCase()}] ${item.desc || "Producto fresco preparado al momento."}`,
            price: priceStr
        });
    });
});
