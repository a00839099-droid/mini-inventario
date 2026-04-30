# Mini Inventario

[![CI](https://github.com/a00839099-droid/mini-inventario/actions/workflows/ci.yml/badge.svg)](https://github.com/a00839099-droid/mini-inventario/actions/workflows/ci.yml)

## Descripción

Mini Inventario es una API REST para gestionar un inventario de productos. Proporciona operaciones CRUD (crear, leer, actualizar, eliminar) para administrar productos con información de nombre, descripción, cantidad en stock y precio. La aplicación está dockerizada con una arquitectura de microservicios usando Node.js/Express y MySQL.

## Arquitectura

```
┌─────────────────────────────────────────────────┐
│                  Cliente                        │
│              (curl, navegador)                  │
└────────────────────┬────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
    ┌────▼────────────────┐  ┌──▼──────────────┐
    │  API (Node.js)      │  │  Traefik        │
    │  :3000              │  │  (reverse proxy)│
    │  ├─ GET /productos  │  │                 │
    │  ├─ POST /productos │  │                 │
    │  ├─ PUT /stock      │  │                 │
    │  └─ DELETE /        │  │                 │
    │                     │  │                 │
    └────┬────────────────┘  └─────────────────┘
         │
    ┌────▼────────────────┐
    │  MySQL 8.0          │
    │  Database: inventario
    │  ├─ productos       │
    │  │  ├─ id           │
    │  │  ├─ nombre       │
    │  │  ├─ descripcion  │
    │  │  ├─ cantidad     │
    │  │  ├─ precio       │
    │  │  └─ creado_en    │
    │                     │
    └─────────────────────┘
```

## Endpoints Disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/health` | Health check de la API |
| GET | `/productos` | Obtener todos los productos |
| GET | `/productos/:id` | Obtener un producto por ID |
| POST | `/productos` | Crear un nuevo producto |
| PUT | `/productos/:id/stock` | Actualizar cantidad en stock |
| DELETE | `/productos/:id` | Eliminar un producto |

### Detalles de Endpoints

**GET /health**
```bash
curl http://localhost:3000/health
```
Respuesta (200):
```json
{
  "status": "ok",
  "service": "mini-inventario-api"
}
```

**GET /productos**
```bash
curl http://localhost:3000/productos
```
Respuesta (200):
```json
[
  {
    "id": 1,
    "nombre": "Teclado mecanico",
    "descripcion": "Teclado USB con switches azules",
    "cantidad": 15,
    "precio": 45.99,
    "creado_en": "2026-04-30T10:15:00.000Z"
  }
]
```

**POST /productos**
```bash
curl -X POST http://localhost:3000/productos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Webcam HD",
    "descripcion": "1080p 30fps",
    "cantidad": 12,
    "precio": 35.00
  }'
```
Respuesta (201):
```json
{
  "id": 4,
  "nombre": "Webcam HD",
  "descripcion": "1080p 30fps",
  "cantidad": 12,
  "precio": 35.00,
  "creado_en": "2026-04-30T11:30:00.000Z"
}
```

**PUT /productos/:id/stock**
```bash
curl -X PUT http://localhost:3000/productos/1/stock \
  -H "Content-Type: application/json" \
  -d '{"cantidad": 20}'
```
Respuesta (200):
```json
{
  "mensaje": "Stock actualizado",
  "producto": { ... }
}
```

**DELETE /productos/:id**
```bash
curl -X DELETE http://localhost:3000/productos/4
```
Respuesta (200):
```json
{
  "mensaje": "Producto eliminado"
}
```

## Cómo Correr Localmente

### Requisitos
- Docker y Docker Compose instalados
- `curl` (para pruebas) o Postman

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/a00839099-droid/mini-inventario.git
cd mini-inventario
```

2. **Crear la red de Docker**
```bash
docker network create dokploy-network
```

3. **Levantear los contenedores**
```bash
docker compose up --build
```

Espera 20-30 segundos para que MySQL inicialice completamente. Verás mensajes como:
```
mysql | ready for connections
api   | API de inventario corriendo en puerto 3000
```

4. **Probar los endpoints**
```bash
# Health check
curl http://localhost:3000/health

# Listar todos los productos
curl http://localhost:3000/productos

# Crear un producto
curl -X POST http://localhost:3000/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Webcam HD","descripcion":"1080p 30fps","cantidad":12,"precio":35.00}'

# Actualizar stock del producto 1
curl -X PUT http://localhost:3000/productos/1/stock \
  -H "Content-Type: application/json" \
  -d '{"cantidad":20}'

# Eliminar un producto
curl -X DELETE http://localhost:3000/productos/4
```

5. **Detener los contenedores**
```bash
docker compose down
```

## Estructura del Proyecto

```
mini-inventario/
├── README.md                    # Este archivo
├── docker-compose.yml           # Configuración Docker Compose
├── .gitignore                   # Git ignore
├── .github/
│   └── workflows/
│       └── ci.yml              # Pipeline de CI con GitHub Actions
├── api/
│   ├── Dockerfile              # Imagen Docker para la API
│   ├── package.json            # Dependencias Node.js
│   └── server.js               # Código de la API (Express)
└── mysql/
    └── init.sql                # Script de inicialización de BD
```

## Despliegue en Dockploy

1. Inicia sesión en el servidor Dockploy
2. Crea un nuevo proyecto: **inventario-[TUNOMBRE]**
3. Agrega un servicio de tipo Docker Compose
4. Conecta este repositorio de GitHub
5. Selecciona la rama `main`
6. En la configuración, agrega la etiqueta de Traefik con tu dominio asignado
7. Despliega y verifica que el servicio quede en estado verde
8. Prueba el endpoint público:
```bash
curl https://TU_DOMINIO_ASIGNADO/health
curl https://TU_DOMINIO_ASIGNADO/productos
```

## Autor

Paugu (a00839099-droid)

## Licencia

Este proyecto es parte del Ejercicio Integrador de Aprendizaje (EIA).
