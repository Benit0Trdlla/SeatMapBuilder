## Seat Map Builder

Editor visual para dibujar un mapa de asientos, con creación y edición de filas y asientos, etiquetado rápido, y opciones de exportación e importación en formato JSON.

## Tecnologías utilizadas

- React
- Next.js
- TypeScript
- Tailwind
- Radix UI
- Lucide React

## Setup breve

```bash
# Entrar en la carpeta
cd my-app
# Instalar dependencias
npm install
# o
npm i
# Iniciar proyecto en local
npm run dev
```

## Estructura del editor

El editor se organiza en los siguientes componentes principales:

- Page
    - Botón 'Nuevo Mapa': limpia la aplicación para crear un nuevo mapa.
    - Botones 'Importar desde JSON' y 'Descargar': permiten importar un mapa existente o descargar tu mapa en formato JSON.

- ControlPanel: aquí estan todas las funcionalidades principales del editor. 
    - Crear una fila individual o múltiples filas con la cantidad de asientos definida por fila.
    - Gestionar filas: eliminar múltiples filas, editar etiquetas de fila o quitar asientos.
    - Ver estadísticas generales: cantidad total de filas, total de asientos, asientos disponibles, seleccionados y ocupados.

- SeatMap: mapa de todas tus filas y asientos que tengas.
    - Seleccionar todas las filas a la vez o individualmente.
    - Cambiar el estado del asiento dando click en cada uno.
    - Mostrar información de cada fila: etiqueta, total de asientos, disponibles, seleccionados y ocupados.

## Deploy en Vercel

Mirá el proyecto desplegado en [este enlace](https://seat-map-builder-mu.vercel.app/).
