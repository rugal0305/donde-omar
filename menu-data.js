// =========================================================================
// CONFIGURACIÓN DE DATOS DEL NEGOCIO (Edita estos datos a tu gusto)
// =========================================================================
window.CONFIG = {
    // Nombre comercial del restaurante
    businessName: "OH DONDE OMAR PARRILLA",
    
    // Celular WhatsApp para recibir pedidos (con indicativo de país, sin espacios ni símbolos)
    // Ejemplo para Colombia: "573105556677" (57 es el código de Colombia)
    whatsappPhone: "573105556677", 
    
    // Teléfono para llamadas directas
    phoneCall: "+57 310 555 6677",
    
    // Correo de contacto
    email: "pedidos@dondeomarparrilla.demo",
    
    // Dirección física del local
    address: "Av. Principal #45-12, Bogota",
    
    // Horario de atención
    businessHours: "Todos los días, 4:00 p.m. - 12:00 a.m.",
    
    // Redes Sociales (Pon "" en las que no tengas para ocultar el botón)
    instagramUrl: "https://instagram.com",
    tiktokUrl: "https://tiktok.com",
    facebookUrl: "https://facebook.com",
    youtubeUrl: "" // Oculto por defecto
};

// =========================================================================
// BASE DE DATOS DEL MENÚ (Todos los productos con sus precios)
// =========================================================================
window.MENU_ITEMS = [
    // PERROS CALIENTES
    { id: "perro-sencillo", icon: "🌭", name: "Perro Sencillo", description: "[PERROS CALIENTES] Salchicha, cebolla, lechuga, queso costeño, papa ripio y mozzarella.", price: "$5.000" },
    { id: "perro-apanado", icon: "🌭", name: "Perro Apanado", description: "[PERROS CALIENTES] Salchicha, cebolla, jamón, ripio, lechuga, mozzarella y queso costeño.", price: "$6.000" },
    { id: "perro-gemelo", icon: "🌭", name: "Perro Gemelo", description: "[PERROS CALIENTES] Doble salchicha, cebolla, ripio, lechuga, mozzarella y queso costeño.", price: "$8.000" },
    { id: "perro-pollo", icon: "🌭", name: "Perro Pollo", description: "[PERROS CALIENTES] Lechuga, salchicha, pollo, cebolla, ripio, jamón, queso costeño y mozzarella.", price: "$9.000" },
    { id: "choriperro", icon: "🌭", name: "Choriperro", description: "[PERROS CALIENTES] Chorizo, cebolla, lechuga, papa ripio, jamón de ternera, queso costeño y mozzarella.", price: "$9.000" },
    { id: "perro-ranchero", icon: "🌭", name: "Perro Ranchero", description: "[PERROS CALIENTES] Salchicha ranchera, cebolla, lechuga, ripio, jamón, queso costeño y mozarella.", price: "$10.000" },
    { id: "perro-especial", icon: "🌭", name: "Perro Especial", description: "[PERROS CALIENTES] Salchicha, lechuga, cebolla, ripio, jamón, tocineta, queso costeño y mozzarella.", price: "$10.000" },
    { id: "perro-suizo", icon: "🌭", name: "Perro Suizo", description: "[PERROS CALIENTES] Salchicha suiza, cebolla, pechuga, ripio, queso costeño, jamón y mozzarella.", price: "$13.000" },
    { id: "perro-suizo-plancha", icon: "🌭", name: "Perro Suizo a la Plancha", description: "[PERROS CALIENTES] Salchicha suiza, cebolla, lechuga, ripio, queso costeño, jamón y mozzarella.", price: "$14.000" },
    { id: "perro-mixto", icon: "🌭", name: "Perro Mixto", description: "[PERROS CALIENTES] Salchicha, lechuga, cebolla, pollo, carne, ripio, jamón, queso costeño y mozzarella.", price: "$15.000" },
    
    // SALVAJADAS
    { id: "salvajada-sencilla", icon: "🍖", name: "Salvajada Sencilla", description: "[SALVAJADAS] lechuga, francesa, pollo en trozos, chorizo, butifarra, cebolla, queso costeño y ripio.", price: "$20.000" },
    { id: "salvajada-doble", icon: "🍖", name: "Salvajada Doble", description: "[SALVAJADAS] lechuga, 2 porciones de francesa, pollo, cerdo, butifarra, chorizo, queso mozzarella, papa ripio y cebolla.", price: "$33.000" },
    { id: "salvajada-especial", icon: "🍖", name: "Salvajada Especial", description: "[SALVAJADAS] lechuga, 3 porciones de francesa, pollo, cerdo, butifarra, chorizo, queso mozzarella, cebolla y papa ripio.", price: "$40.000" },
    
    // ESPECIALIDAD (BURRITOS)
    { id: "burrito-mexicano", icon: "🌯", name: "Burritos Mexicanos", description: "[ESPECIALIDAD (BURRITOS)] carne, pollo, chorizo, butifarra, maíz, tomate cebolla, queso mozzarella y guacamole.", price: "$20.000" },
    
    // HAMBURGUESAS
    { id: "hamb-sencilla", icon: "🍔", name: "Hamburguesa Sencilla", description: "[HAMBURGUESAS] carne de hamburguesa, lechuga, cebolla, tomate y queso mozzarella.", price: "$7.000" },
    { id: "hamb-doble", icon: "🍔", name: "Hamburguesa Doble Jamón y Doble Queso", description: "[HAMBURGUESAS] Carne de hamburguesa, lechuga, cebolla, tomate, doble jamón y doble queso.", price: "$10.000" },
    { id: "hamb-pollo", icon: "🍔", name: "Hamburguesa de Pollo", description: "[HAMBURGUESAS] pechuga, cebolla, tomate, lechuga, jamón y queso mozzarella.", price: "$11.000" },
    { id: "hamb-especial", icon: "🍔", name: "Hamburguesa Especial con Francesa", description: "[HAMBURGUESAS] carne de la casa, lechuga, cebolla, tomate, jamón, tocineta, queso mozzarella y francesa.", price: "$16.000" },
    { id: "hamb-doble-carne", icon: "🍔", name: "Hamburguesa Doble Carne con Francesa", description: "[HAMBURGUESAS] 2 carnes de la casa, lechuga, cebolla, tomate, jamón, doble queso y francesa.", price: "$17.000" },
    { id: "hamb-mixta", icon: "🍔", name: "Hamburguesa Mixta con Francesa", description: "[HAMBURGUESAS] carne de la casa, pechuga a la plancha, cebolla, tomate, lechuga, jamón, doble queso y francesa.", price: "$18.000" },
    
    // LINEA DE SALCHIPAPAS
    { id: "salchipapa-sencilla", icon: "🍟", name: "Salchipapa Sencilla", description: "[LINEA DE SALCHIPAPAS] salchicha manguera, lechuga, francesa y queso costeño.", price: "$10.000" },
    { id: "choripapa", icon: "🍟", name: "Choripapa", description: "[LINEA DE SALCHIPAPAS] salchicha manguera, chorizo, lechuga y queso costeño.", price: "$13.000" },
    { id: "salchipapa-pollo", icon: "🍟", name: "Salchipapa con Pollo", description: "[LINEA DE SALCHIPAPAS] salchicha manguera, pollo en trozos, lechuga y queso costeño.", price: "$14.000" },
    { id: "salchipapa-trifasica", icon: "🍟", name: "Salchipapa Trifásica", description: "[LINEA DE SALCHIPAPAS] salchicha manguera, butifarra, chorizo, suiza, lechuga y queso costeño.", price: "$16.000" },
    { id: "salchipapa-todo", icon: "🍟", name: "Salchipapa con Todo", description: "[LINEA DE SALCHIPAPAS] Salchicha manguera, pollo en trozos, carne en trozos, francesa, lechuga, queso mozzarella, chorizo y butifarra.", price: "$18.000" },
    
    // DESGRANADOS
    { id: "desgranado-pollo", icon: "🌽", name: "Desgranado con Pollo", description: "[DESGRANADOS] lechuga, francesa, pollo en trozos, maíz, papa ripio y queso mozzarella.", price: "$14.000" },
    { id: "desgranado-mixto", icon: "🌽", name: "Desgranado Mixto", description: "[DESGRANADOS] lechuga, francesa, pollo en trozos, cerdo en trozos, maíz, papa ripio y queso mozzarella.", price: "$16.000" },
    { id: "desgranado-especial", icon: "🌽", name: "Desgranado Especial", description: "[DESGRANADOS] lechuga, salchicha suiza, jamón, salami, maiz, tocineta, papa ripio, francesa y queso mozzarella.", price: "$20.000" },
    { id: "desgranado-todo", icon: "🌽", name: "Desgranado con Todo", description: "[DESGRANADOS] lechuga, francesa, cerdo en trozos, pollo en trozos, salchicha suiza, salchicha ranchera, ripio y queso mozzarella.", price: "$23.000" },
    
    // SUIZOS
    { id: "suizo-mini", icon: "🌭", name: "Mini Suizos", description: "[SUIZOS] (Vapor o Francesa) papa, media suiza, salami, cebolla, queso costeño, papa ripio y lechuga.", price: "$10.000 - $12.000" },
    { id: "suizo-mini-esp", icon: "🌭", name: "Mini Suizo Especial", description: "[SUIZOS] (Vapor o Francesa) papa, media suiza, salami, pollo, cebolla, lechuga, queso costeño y papa ripio.", price: "$12.000 - $14.000" },
    { id: "suizo-sencillo", icon: "🌭", name: "Suizo Sencillo", description: "[SUIZOS] (Vapor o Francesa) papa, suiza entera, lechuga, salami, cebolla, queso costeño y ripio.", price: "$13.000 - $15.000" },
    { id: "suizo-especial", icon: "🌭", name: "Suizo Especial", description: "[SUIZOS] (Vapor o Francesa) papa, lechuga, suiza entera, salami, pollo desmechado, queso costeño y papa ripio.", price: "$16.000 - $17.000" },
    { id: "suizo-todo", icon: "🌭", name: "Suizo con Todo", description: "[SUIZOS] (Vapor o Francesa) 2 porciones de francesa, suiza entera, salami, tocineta, cerdo en trozos, pollo en trozos, jamón, queso mozzarella y papa ripio.", price: "$26.000 - $29.000" },
    
    // AREPAS
    { id: "arepa-queso", icon: "🫓", name: "Arepa de Queso", description: "[AREPAS] Deliciosa arepa asada rellena de queso mozzarella derretido.", price: "$4.000" },
    { id: "arepa-jamon", icon: "🫓", name: "Arepa de Jamón", description: "[AREPAS] Rellena de jamón seleccionado y queso mozzarella derretido.", price: "$5.000" },
    { id: "arepa-hamb", icon: "🫓", name: "Arepa de Carne de Hamburguesa", description: "[AREPAS] Rellena con sabrosa carne artesanal de hamburguesa y queso.", price: "$6.000" },
    { id: "arepa-pollo", icon: "🫓", name: "Arepa de Pollo", description: "[AREPAS] Rellena con jugoso pollo desmechado y abundante queso.", price: "$7.000" },
    { id: "arepa-res", icon: "🫓", name: "Arepa de Carne Desmechada", description: "[AREPAS] Rellena con sabrosa carne de res desmechada y queso mozzarella.", price: "$7.000" },
    { id: "arepa-chorizo", icon: "🫓", name: "Arepa de Chorizo", description: "[AREPAS] Rellena con rodajas de chorizo asado y queso mozzarella derretido.", price: "$7.000" },
    { id: "arepa-suiza", icon: "🫓", name: "Arepa Suiza", description: "[AREPAS] Rellena con trozos de salchicha suiza y queso mozzarella derretido.", price: "$8.000" },
    { id: "arepa-mixta", icon: "🫓", name: "Arepa Mixta", description: "[AREPAS] carne desmechada, pollo desmechado, queso costeño y queso mozzarella.", price: "$9.000" },
    { id: "arepa-todo", icon: "🫓", name: "Arepa con Todo", description: "[AREPAS] carne de hamburguesa, pollo, jamón, chorizo, queso costeño y queso mozzarella.", price: "$12.000" },
    
    // PICADAS
    { id: "picada-personal", icon: "🍲", name: "Picada Personal", description: "[PICADAS] cerdo, carne, chorizo, cebolla, pimentón, lechuga y patacón.", price: "$20.000" },
    { id: "picada-duo", icon: "🍲", name: "Picada Duo", description: "[PICADAS] cerdo, carne, chorizo, cebolla, pimentón, lechuga y patacón.", price: "$25.000" },
    { id: "picada-familiar", icon: "🍲", name: "Picada Familiar", description: "[PICADAS] cerdo, carne, pollo, chorizo, cebolla, pimentón, lechuga y patacón.", price: "$35.000" },
    { id: "picada-don-omar", icon: "🍲", name: "Picada Don Omar", description: "[PICADAS] Carne, cerdo, pollo, tocineta, maíz, suiza, cebolla, pimentón, chorizo, patacón y queso costeño.", price: "$45.000" },
    { id: "mega-picada", icon: "🍲", name: "Mega Picada", description: "[PICADAS] cerdo, carne, pechuga, lechuga, pimentón, cebolla y queso costeño (60 patacones).", price: "$60.000" },
    
    // ASADOS AL CARBÓN
    { id: "asado-cerdo", icon: "🥩", name: "Cerdo Asado", description: "[ASADOS AL CARBÓN] Lomo de cerdo, papa, yuca y ensalada.", price: "$15.000" },
    { id: "asado-chuleta", icon: "🥩", name: "Chuleta de Cerdo", description: "[ASADOS AL CARBÓN] chuleta, papa, yuca y ensalada.", price: "$15.000" },
    { id: "asado-bbq", icon: "🥩", name: "Chuleta BBQ", description: "[ASADOS AL CARBÓN] chuleta, patacón y ensalada.", price: "$15.000" },
    { id: "asado-res", icon: "🥩", name: "Carne Asada", description: "[ASADOS AL CARBÓN] carne de res, yuca, papa y ensalada.", price: "$15.000" },
    { id: "asado-pechuga", icon: "🍗", name: "Pechuga Asada", description: "[ASADOS AL CARBÓN] filete de pechuga, papa y ensalada.", price: "$15.000" },
    { id: "asado-mixta", icon: "🥩", name: "Bandeja Mixta", description: "[ASADOS AL CARBÓN] carne, cerdo, patacón y ensalada.", price: "$15.000" },
    { id: "asado-pech-enceb", icon: "🍗", name: "Pechuga Encebollada", description: "[ASADOS AL CARBÓN] filete de pechuga, patacón y ensalada.", price: "$16.000" },
    { id: "asado-trifasica", icon: "🥩", name: "Bandeja Trifásica", description: "[ASADOS AL CARBÓN] carne, cerdo, pollo, patacón y ensalada.", price: "$18.000" },
    { id: "asado-punta", icon: "🥩", name: "Punta de Anca", description: "[ASADOS AL CARBÓN] punta gorda, yuca, papa y ensalada.", price: "$20.000" },
    { id: "asado-churrasco", icon: "🥩", name: "Churrasco", description: "[ASADOS AL CARBÓN] lomito chato, patacón y ensalada.", price: "$20.000" },
    
    // MINI PICADAS
    { id: "mini-cerdo", icon: "🍢", name: "Picada de Cerdo", description: "[MINI PICADAS] lechuga, patacón, cerdo, cebolla, pimentón y chorizo.", price: "$15.000" },
    { id: "mini-carne", icon: "🍢", name: "Picada de Carne", description: "[MINI PICADAS] lechuga, patacón, carne, cebolla, pimentón y chorizo.", price: "$15.000" },
    { id: "mini-pechuga", icon: "🍢", name: "Picada de Pechuga", description: "[MINI PICADAS] lechuga, pechuga, patacón, cebolla, pimentón y chorizo.", price: "$15.000" },
    
    // PATACÓN CON TODO
    { id: "patacon-mixto", icon: "🫓", name: "Patacón Mixto", description: "[PATACÓN CON TODO] patacón, lechuga, cerdo en trozos, pollo en trozos, cebolla, queso costeño y papa ripio.", price: "$12.000" },
    { id: "patacon-trifasico", icon: "🫓", name: "Patacón Trifásico", description: "[PATACÓN CON TODO] patacón, lechuga, cerdo en trozos, pollo en trozos, chorizo, cebolla, queso costeño y ripio.", price: "$14.000" },
    { id: "patacon-especial", icon: "🫓", name: "Patacón Especial", description: "[PATACÓN CON TODO] patacón, lechuga, jamón, tocineta, cebolla, queso costeño y papa ripio, salami, pollo en trozos y cerdo en trozos.", price: "$16.000" },
    
    // PIZZAS PERSONALES 22X22
    { id: "pizza-pers-jq", icon: "🍕", name: "Jamón y Queso (Personal)", description: "[PIZZAS PERSONALES 22X22] pasta de tomate, jamón y queso.", price: "$12.000" },
    { id: "pizza-pers-haw", icon: "🍕", name: "Hawaiana (Personal)", description: "[PIZZAS PERSONALES 22X22] pasta de tomate, jamón y piña.", price: "$14.000" },
    { id: "pizza-pers-pol", icon: "🍕", name: "Pizza Pollo (Personal)", description: "[PIZZAS PERSONALES 22X22] pasta de tomate y pollo.", price: "$14.000" },
    { id: "pizza-pers-pep", icon: "🍕", name: "Pepperoni (Personal)", description: "[PIZZAS PERSONALES 22X22] pasta de tomate, jamón, mozzarella y pepperoni.", price: "$15.000" },
    { id: "pizza-pers-cp", icon: "🍕", name: "Champiñón y Pollo (Personal)", description: "[PIZZAS PERSONALES 22X22] pasta de tomate, champiñón y pollo.", price: "$15.000" },
    { id: "pizza-pers-3c", icon: "🍕", name: "3 Carnes (Personal)", description: "[PIZZAS PERSONALES 22X22] pasta de tomate, deliciosa combinación de tres carnes seleccionadas.", price: "$15.000" },
    { id: "pizza-pers-ame", icon: "🍕", name: "Americana (Personal)", description: "[PIZZAS PERSONALES 22X22] pasta de tomate, jamón, tocineta y maíz.", price: "$16.000" },
    { id: "pizza-pers-jcp", icon: "🍕", name: "Jamón, Champiñón y Pepperoni (Personal)", description: "[PIZZAS PERSONALES 22X22] pasta de tomate, jamón, champiñón y pepperoni.", price: "$16.000" },
    { id: "pizza-pers-tri", icon: "🍕", name: "Trifásica (Personal)", description: "[PIZZAS PERSONALES 22X22] pasta de tomate, piña, pollo, jamón y papa ripio.", price: "$16.000" },
    { id: "pizza-pers-casa", icon: "🍕", name: "Pizza de la Casa (Personal)", description: "[PIZZAS PERSONALES 22X22] pasta de tomate, jamón, champiñón, tocineta, cebolla, pimentón, maíz y queso mozzarella.", price: "$18.000" },
    
    // PIZZAS POR PORCIÓN
    { id: "pizza-porc-jq", icon: "🍕", name: "Jamón y Queso (Porción)", description: "[PIZZAS POR PORCIÓN] pasta de tomate, jamón y queso.", price: "$6.000" },
    { id: "pizza-porc-haw", icon: "🍕", name: "Hawaiana (Porción)", description: "[PIZZAS POR PORCIÓN] pasta de tomate, jamón y piña.", price: "$7.000" },
    { id: "pizza-porc-cho", icon: "🍕", name: "Pizza con Chorizo (Porción)", description: "[PIZZAS POR PORCIÓN] jamón, queso y chorizo parrillado.", price: "$9.000" },
    { id: "pizza-porc-ran", icon: "🍕", name: "Rancherita (Porción)", description: "[PIZZAS POR PORCIÓN] jamón, queso y salchicha ranchera.", price: "$10.000" },
    { id: "pizza-porc-jp", icon: "🍕", name: "Jamón y Pollo (Porción)", description: "[PIZZAS POR PORCIÓN] jamón, pollo y queso.", price: "$10.000" },
    { id: "pizza-porc-tri", icon: "🍕", name: "Pizza Trifásica (Porción)", description: "[PIZZAS POR PORCIÓN] jamón, queso, pollo, piña, champiñón y papa ripio.", price: "$12.000" },
    { id: "pizza-porc-ale", icon: "🍕", name: "Pizza Alemana (Porción)", description: "[PIZZAS POR PORCIÓN] jamón, queso, tocineta, salchicha suiza y maíz.", price: "$13.000" },
    { id: "pizza-porc-sem", icon: "🍕", name: "Pizza Semi Remontada (Porción)", description: "[PIZZAS POR PORCIÓN] jamón, queso, cebolla, pimentón, pollo, piña, champiñón, tocineta y doble queso mozzarella.", price: "$14.000" },
    { id: "pizza-porc-rem", icon: "🍕", name: "Pizza Remontada (Porción)", description: "[PIZZAS POR PORCIÓN] jamón, queso, cebolla, pimentón, pollo, piña, champiñón, salchicha ranchera y doble queso.", price: "$16.000" },
    
    // PIZZAS MEDIANAS
    { id: "pizza-med-jq", icon: "🍕", name: "Jamón y Queso (Mediana)", description: "[PIZZAS MEDIANAS] pasta de tomate, jamón y queso.", price: "$27.000" },
    { id: "pizza-med-haw", icon: "🍕", name: "Hawaiana (Mediana)", description: "[PIZZAS MEDIANAS] pasta de tomate, jamón y piña.", price: "$35.000" },
    { id: "pizza-med-pol", icon: "🍕", name: "Pizza de Pollo (Mediana)", description: "[PIZZAS MEDIANAS] pasta de tomate y pollo.", price: "$40.000" },
    { id: "pizza-med-ran", icon: "🍕", name: "Rancherita (Mediana)", description: "[PIZZAS MEDIANAS] jamón, queso y salchicha ranchera.", price: "$45.000" },
    { id: "pizza-med-tri", icon: "🍕", name: "Trifásica (Mediana)", description: "[PIZZAS MEDIANAS] jamón, queso, pollo, piña, champiñón y papa ripio.", price: "$50.000" },
    { id: "pizza-med-sem", icon: "🍕", name: "Semiremontada (Mediana)", description: "[PIZZAS MEDIANAS] jamón, queso, cebolla, pimentón, pollo, piña, champiñón, salchicha ranchera y doble queso.", price: "$55.000" },
    
    // PIZZAS FAMILIARES
    { id: "pizza-fam-jq", icon: "🍕", name: "Jamón y Queso (Familiar)", description: "[PIZZAS FAMILIARES] pasta de tomate, jamón y queso.", price: "$53.000" },
    { id: "pizza-fam-haw", icon: "🍕", name: "Hawaiana (Familiar)", description: "[PIZZAS FAMILIARES] pasta de tomate, jamón y piña.", price: "$60.000" },
    { id: "pizza-fam-jp", icon: "🍕", name: "Jamón y Pollo (Familiar)", description: "[PIZZAS FAMILIARES] jamón, pollo y queso.", price: "$77.000" },
    { id: "pizza-fam-pc", icon: "🍕", name: "Pollo y Champiñón (Familiar)", description: "[PIZZAS FAMILIARES] pasta de tomate, pollo y champiñón.", price: "$77.000" },
    { id: "pizza-fam-ran", icon: "🍕", name: "Rancherita (Familiar)", description: "[PIZZAS FAMILIARES] jamón, queso y salchicha ranchera.", price: "$78.000" },
    
    // ADICIONALES
    { id: "adic-patacon", icon: "🍽️", name: "Patacón", description: "[ADICIONALES] Crujiente patacón recién hecho.", price: "$3.000" },
    { id: "adic-papas", icon: "🍽️", name: "Papas al Vapor", description: "[ADICIONALES] Papas suaves preparadas al vapor.", price: "$3.000" },
    { id: "adic-ensalada", icon: "🍽️", name: "Ensalada", description: "[ADICIONALES] Ensalada fresca de la casa.", price: "$3.000" },
    { id: "adic-maiz", icon: "🍽️", name: "Maíz", description: "[ADICIONALES] Porción de maíz tierno.", price: "$3.000" },
    { id: "adic-tocineta", icon: "🍽️", name: "Tocineta", description: "[ADICIONALES] Porción de tocineta crujiente.", price: "$4.000" },
    { id: "adic-francesa", icon: "🍽️", name: "Francesa", description: "[ADICIONALES] Porción de papas a la francesa.", price: "$5.000" },
    { id: "adic-gratinado-p", icon: "🍽️", name: "Gratinado P", description: "[ADICIONALES] Gratinado de queso en porción pequeña.", price: "$6.000" },
    { id: "adic-suiza", icon: "🍽️", name: "Suiza", description: "[ADICIONALES] Adicional de salchicha suiza.", price: "$7.000" },
    { id: "adic-gratinado-g", icon: "🍽️", name: "Gratinado G", description: "[ADICIONALES] Gratinado de queso en porción grande.", price: "$8.000" }
];
