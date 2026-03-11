function toggleFav(event, key, btn) {
  if (event) {
    event.stopPropagation();
  }

  const isFav = localStorage.getItem(key) === 'true';

  if (isFav) {
    localStorage.removeItem(key);
    btn.classList.replace('fav-on', 'fav-off');
  } else {
    localStorage.setItem(key, 'true');
    btn.classList.replace('fav-off', 'fav-on');
  }
}

function showMonumentDetails(nombre, direccion, descripcion) {
  Swal.fire({
    title: nombre,
    html: `
      <div style="text-align: left;">
        <p><strong>Direccion:</strong> ${direccion}</p>
        <p><strong>Descripcion:</strong> ${descripcion}</p>
      </div>
    `,
    icon: 'info',
    confirmButtonText: 'Cerrar',
  });
}

window.toggleFav = toggleFav;

const mapContainer = document.getElementById('map');

if (mapContainer) {
  const map = L.map('map').setView([36.7213, -4.4214], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
  }).addTo(map);

  const viewState = document.getElementById('view-state');
  const isLogged = viewState?.dataset.isLogged === 'true';

  fetch('/api/monumentos')
    .then((res) => res.json())
    .then((data) => {
      const list = document.getElementById('monument-list');

      L.geoJSON(data, {
        onEachFeature: (feature, layer) => {
          const nombre = feature.properties.NOMBRE;
          const direccion = feature.properties.DIRECCION || 'Malaga';
          const descripcion = feature.properties.DESCRIPCION || 'Sin descripcion disponible';
          const idFav = `fav_${nombre.replace(/\s+/g, '_')}`;

          layer.bindPopup(`<strong>${nombre}</strong>`);
          layer.on('click', () => showMonumentDetails(nombre, direccion, descripcion));

          const item = document.createElement('div');
          item.className = 'list-group-item p-3';
          item.style.cursor = 'pointer';
          item.addEventListener('click', () => showMonumentDetails(nombre, direccion, descripcion));

          let favHtml = '';
          if (isLogged) {
            const active = localStorage.getItem(idFav) === 'true';
            favHtml = `
              <button class="fav-btn ${active ? 'fav-on' : 'fav-off'}" 
                      onclick="toggleFav(event, '${idFav}', this)">
                ❤
              </button>`;
          }

          item.innerHTML = `
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <h6 class="mb-1 small"><b>${nombre}</b></h6>
                <p class="mb-0 text-muted small">${direccion}</p>
              </div>
              ${favHtml}
            </div>
          `;

          if (list) {
            list.appendChild(item);
          }
        },
      }).addTo(map);
    })
    .catch((err) => console.error('Error al cargar GeoJSON:', err));
}
