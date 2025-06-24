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
npm start
```

El servidor se iniciará en el puerto especificado en el archivo `.env` (por defecto, 3050).

## API Endpoints

- `POST /api/ideas`: Crea una nueva idea.
- `GET /api/ideas`: Obtiene todas las ideas.
- `DELETE /api/ideas?id=<id>`: Borra una idea por su ID.
- `DELETE /api/ideas?todas=true`: Borra todas las ideas.

## Documentación de la API

Puedes ver la documentación de la API en formato OpenAPI [aquí](openapi.json).

Para visualizar la documentación de forma interactiva, puedes copiar el contenido de `openapi.json` y pegarlo en [Swagger Editor](https://editor.swagger.io/).
