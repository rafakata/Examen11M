# Examen11M - Technical Documentation

Este repositorio contiene el código fuente de la plataforma **Examen11M**, una aplicación web orientada a la gestión y visualización de monumentos de Málaga, desarrollada con un enfoque de renderizado en servidor y mapas interactivos.

## ⛓️ Enlace de despliegue:

https://examen11m.onrender.com

## 🛠️ Stack Tecnológico Core

- **Framework:** [Express 4.22.1](https://expressjs.com/) para la gestión de la lógica de servidor y enrutamiento.
- **Motor de Plantillas:** [EJS 5.0.1](https://ejs.co/) con `express-ejs-layouts` para la generación de vistas dinámicas.
- **Mapas:** [Leaflet.js](https://leafletjs.com/) para la integración de mapas interactivos de OpenStreetMap.
- **Middleware:** `express-session` y `cookie-parser` para la gestión de sesiones y seguridad de usuario.

## 🎨 Identidad Visual e Implementación (CSS)

La interfaz se ha diseñado para ofrecer una experiencia visual limpia y centrada en el mapa:

- **Paleta de Colores:**
  - **Activo (Favorito):** `#e74c3c` (Rojo para marcar monumentos favoritos).
  - **Inactivo:** `#ccc` (Gris para elementos secundarios).
  - **Bordes y UI:** `#dee2e6` para una separación sutil de la barra lateral.
- **Estética Técnica:**
  - **Layout:** Uso de `calc(100vh - offset)` para garantizar que el mapa ocupe todo el espacio disponible sin scroll innecesario.
  - **Interactividad:** Modales informativos mediante SweetAlert2 para una UI moderna.

## 📂 Estructura del Proyecto

La organización sigue un esquema modular para facilitar la escalabilidad:

```text
examen11m/
├── bin/                # Script de inicio del servidor (www)
├── data/               # Almacenamiento de datos geográficos (monumentos.geojson)
├── public/             # Recursos estáticos (map.js, auth.js, style.css)
├── routes/             # Controladores y definición de rutas (index.js, users.js)
├── views/              # Plantillas de vistas (layout, index, error)
├── app.js              # Configuración principal de Express
└── package.json        # Gestión de dependencias y scripts
```  

## 🏗️ Arquitectura y Funcionalidades Web

La plataforma está estructurada técnicamente para ofrecer una experiencia de usuario fluida y profesional:

* **Visualización Geoespacial:** Carga dinámica de puntos de interés desde un archivo GeoJSON local a través de una API interna.
* **Sistema de Favoritos:** Lógica de cliente que permite persistir los monumentos preferidos en el `localStorage`.
* **Panel Lateral Interactivo:** Sincronización entre la lista de monumentos y los marcadores del mapa mediante eventos de clic.
* **Gestión de Sesiones:** Sistema de login funcional para habilitar interacciones personalizadas como el guardado de favoritos.

## ⚙️ Configuración y Scripts

Comandos definidos en el `package.json` para la gestión del ciclo de vida del proyecto:

### `npm install`
Instala las dependencias necesarias del lado del servidor y las herramientas de desarrollo.

### `npm start`
Inicia el entorno de ejecución de Node.js apuntando al punto de entrada en `./bin/www`.

---
**Desarrollado por:** Rafael Medina Quelle
