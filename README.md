# Top Jugadores

Aplicación web de fútbol hecha con React y Vite. Muestra un ranking de jugadores con tarjetas, búsqueda y fichas individuales con información, biografía y fotografía.

## Funcionalidades

- Listado de jugadores ordenado por ranking.
- Búsqueda por nombre, país, equipo o liga.
- Página de detalle con navegación al jugador anterior y siguiente.
- Edad calculada a partir de la fecha de nacimiento.
- Banderas de nacionalidad y fotos consultadas desde Wikipedia.
- Imagen de respaldo definida en los datos si no hay una foto disponible.

## Tecnologías

- React 18
- Vite 5
- React Router DOM 6
- JSON alojado en GitHub como fuente de datos
- API REST de Wikipedia para obtener miniaturas de imágenes

## Requisitos

- Node.js y npm instalados.
- Git para clonar el repositorio.

## Instalación y desarrollo

Clona el repositorio y entra a la carpeta del proyecto:

```bash
git clone https://github.com/ASUSS-star/Futbol-estrellas.git
cd Futbol-estrellas
```

Instala las dependencias e inicia el servidor local:

```bash
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir en el navegador (normalmente `http://localhost:5173`).

## Comandos

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Genera la versión de producción en dist/
npm run preview  # Sirve localmente la compilación de producción
```

## Datos y API

La lista de jugadores está en [`public/data/jugadores.json`](public/data/jugadores.json). La aplicación la carga desde la URL configurada en [`src/config.js`](src/config.js), que apunta a la versión raw de ese archivo en la rama `main` de este repositorio.

Cada jugador incluye campos como:

| Campo | Descripción |
| --- | --- |
| `id` | Identificador usado en la ruta de detalle |
| `ranking` | Posición en el ranking |
| `nombre` | Nombre del jugador |
| `descripcion` | Texto descriptivo |
| `equipo` y `siglaEquipo` | Club y sigla que aparecen en la tarjeta |
| `liga` | Liga del club |
| `pais` y `banderaCodigo` | Nacionalidad y código de bandera |
| `fechaNacimiento` | Fecha usada para calcular la edad |
| `posicion` | Posición de juego |
| `wikipedia` | Título del artículo usado para buscar la miniatura |
| `imagen` | Imagen de respaldo si no se obtiene una miniatura |

Para cambiar los datos, edita el JSON y publica los cambios en `main`. Para usar otro archivo o repositorio, actualiza `API_URL` en `src/config.js`. Las miniaturas se solicitan al servicio público de resumen de Wikipedia; si no hay imagen disponible o falla la solicitud, se muestra el campo `imagen`.

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Ranking y búsqueda de jugadores |
| `/jugador/:id` | Ficha del jugador seleccionado |
| `/acerca` | Información del proyecto |
| `/contacto` | Datos de contacto |

## Despliegue en Netlify

Conecta el repositorio en Netlify y configura:

- **Build command:** `npm run build`
- **Publish directory:** `dist`

El archivo [`public/_redirects`](public/_redirects) incluye la regla necesaria para que las rutas de React Router funcionen al recargar o abrir directamente una ficha.
