const inicializarStock = () => {
    const stockBase = {
        // COMPACTOS
        "blista": { nombre: "Dinka (Blista compact)", precioCompra: 35950, precioVenta: 35231, categoria: "Compactos", ftuning: false, rendimientos: 0 },
        "prairie": { nombre: "Bollokan (Prairie)", precioCompra: 61500, precioVenta: 60270, categoria: "Compactos", ftuning: false, rendimientos: 0 },
        "asbo": { nombre: "Maxwell (Asbo)", precioCompra: 24000, precioVenta: 23520, categoria: "Compactos", ftuning: false, rendimientos: 0 },
        "panto": { nombre: "Benefactor (Panto)", precioCompra: 22500, precioVenta: 22050, categoria: "Compactos", ftuning: false, rendimientos: 0 },
        "weevil": { nombre: "Bf (Weevil)", precioCompra: 16000, precioVenta: 15680, categoria: "Compactos", ftuning: false, rendimientos: 0 },
        "brioso": { nombre: "Grotti (Brioso R/A)", precioCompra: 25000, precioVenta: 24500, categoria: "Compactos", ftuning: false, rendimientos: 0 },
        "issi_sport": { nombre: "Weeny (Issi Sport)", precioCompra: 265000, precioVenta: 259700, categoria: "Compactos", ftuning: false, rendimientos: 0 },
        
        // Aquí irás pegando las demás categorías que me pases...
    };

    // Esto solo subirá los datos si la base de datos está vacía
    database.ref('vehiculos').once('value', (snapshot) => {
        if (!snapshot.exists()) {
            database.ref('vehiculos').set(stockBase);
            console.log("Stock inicial cargado en la nube.");
        }
    });
};