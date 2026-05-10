const PRECIO_FT = 90000;
const PRECIO_RENDI = 5000;

// Verificar si hay que cargar el stock inicial desde data.js
database.ref('vehiculos').once('value', (snapshot) => {
    if (!snapshot.exists()) {
        database.ref('vehiculos').set(STOCK_INICIAL);
    }
});

// Escuchar cambios y dibujar las tablas
database.ref('vehiculos').on('value', (snapshot) => {
    const vehiculos = snapshot.val();
    const contenedor = document.getElementById('contenedor-categorias');
    contenedor.innerHTML = ""; 

    if (!vehiculos) return;

    const grupos = {};
    for (let id in vehiculos) {
        const v = vehiculos[id];
        const cat = v.categoria || "Otros";
        if (!grupos[cat]) grupos[cat] = [];
        grupos[cat].push({ id, ...v });
    }

    for (let categoria in grupos) {
        const seccion = document.createElement('div');
        seccion.innerHTML = `
            <h2 class="titulo-categoria">${categoria}</h2>
            <table>
                <thead>
                    <tr>
                        <th>VEHÍCULO</th>
                        <th>COMPRA</th>
                        <th>VENTA BASE (-2%)</th>
                        <th>FT (90k)</th>
                        <th>RENDIS (5k)</th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody id="body-${categoria.replace(/\s+/g, '')}"></tbody>
            </table>
        `;
        contenedor.appendChild(seccion);

        const tbody = document.getElementById(`body-${categoria.replace(/\s+/g, '')}`);
        grupos[categoria].forEach(v => {
            const total = v.precioVenta + (v.ftuning ? PRECIO_FT : 0) + (v.rendimientos * PRECIO_RENDI);
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td><strong>${v.nombre}</strong></td>
                <td style="color: #888;">$${v.precioCompra.toLocaleString()}</td>
                <td style="color: #f1c40f;">$${v.precioVenta.toLocaleString()}</td>
                <td><input type="checkbox" ${v.ftuning ? 'checked' : ''} onchange="actualizar('${v.id}', 'ftuning', this.checked)"></td>
                <td><input type="number" value="${v.rendimientos}" min="0" onchange="actualizar('${v.id}', 'rendimientos', parseInt(this.value))"></td>
                <td class="precio-final">$${total.toLocaleString()}</td>
            `;
            tbody.appendChild(fila);
        });
    }
});

function actualizar(id, campo, valor) {
    database.ref('vehiculos/' + id).update({ [campo]: valor });
}

function filtrar() {
    let filtro = document.getElementById('buscador').value.toUpperCase();
    let filas = document.querySelectorAll('tbody tr');
    filas.forEach(fila => {
        fila.style.display = fila.innerText.toUpperCase().includes(filtro) ? "" : "none";
    });
}