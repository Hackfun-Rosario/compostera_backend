# Servidor de Ideas

Este es un servidor Express.js para gestionar una base de datos de "ideas".

## Requisitos

- Node.js
- npm

## Instalación

1. Clona este repositorio.
2. Navega al directorio `backend-compostera`.
3. Instala las dependencias con:
   ```bash
   npm install
   ```

## Ejecución

Para iniciar el servidor, ejecuta:

```bash
npm run start
```

El servidor se iniciará en el puerto especificado en el archivo `.env` (por defecto, 3050).

## API Endpoints

- `POST /api/ideas`: Crea una nueva idea.
- `GET /api/ideas`: Obtiene todas las ideas.
- `DELETE /api/ideas?id=<id>`: Borra una idea por su ID.
- `DELETE /api/ideas?todas=true`: Borra todas las ideas.
- `POST /api/ideas/voto`: Incrementa el valor de voto de una idea específica.

## Documentación de la API

Puedes ver la documentación de la API en formato OpenAPI [aquí](openapi.json).

Para visualizar la documentación de forma interactiva, puedes copiar el contenido de `openapi.json` y pegarlo en [Swagger Editor](https://editor.swagger.io/).

# API de Ideas

## Endpoints

### POST /api/ideas
Crea una nueva idea.

### GET /api/ideas
Obtiene todas las ideas ordenadas por fecha de más reciente a más antigua.

### DELETE /api/ideas
Borra una idea específica por su ID o todas las ideas si el parámetro 'todas' es true.

### POST /api/ideas/voto
Incrementa el valor de voto de una idea específica.

#### Request Body
```json
{
  "id": "<ID de la idea>"
}
```

#### Responses
- `200`: Voto incrementado exitosamente.
- `400`: Datos de entrada inválidos.
- `404`: Idea no encontrada.
