# Reto Evolutecc Comentarios

Este proyecto es un backend para plataformas que permite crear usuarios, videos y comentar los videos, ademas de poder comentar los comentarios de otros usuarios y utiliza NestJS, TypeORM, PostgreSQL y Docker.

## Configuración Inicial

Instrucciones sobre cómo clonar y configurar el proyecto para ejecutarlo localmente:

git clone https://github.com/JocMieles/evolutecc-test.git

cd evolutecc-test

## Requisitos

1. Lista los requisitos necesarios para ejecutar el proyecto, como Node.js, Docker, etc.

- Node.js (v14 o superior)
- Docker
- Docker Compose

## Instalación y Ejecución

Instrucciones paso a paso para instalar y ejecutar el proyecto utilizando Docker:

Crea una base de datos en PostgreSQL llamada postgres y un schemas llamado public. 
Para la creacion de las tablas en raiz del proyecto hay una carpeta llamada sql y en archivo dentro hay un script para crear las tablas manualmente y algunos datos de prueba.

npm install

docker-compose up --build

Instrucciones paso a paso para instalar y ejecutar sin Docker:

npm install

npm run start

Luego queda habilitado en **http://localhost:3000/**

## Documentacion API 

Swagger **http://localhost:3000/api**
Aqui estan explicados los endpoint y los esquemas o las estructuras json que se deben usar para crear, actualizar, obtener y eliminar la información de la base de datos.

## Estructura de la Base de Datos

Descripción de cómo se estructura la base de datos y qué representa cada tabla.

### Diagrama Entidad-Relación

![Diagrama Entidad-Relación](Diagrama%20Entidad-Relacion.png)

### Descripción del Diagrama

Descripción breve de cada tabla y sus relaciones:

#### User
- `id`: Clave primaria, identificador único para cada usuario.
- `username`: Nombre de usuario único.
- `email`: Correo electrónico del usuario.

#### Video
- `id`: Clave primaria, identificador único para cada video.
- `title`: Título del video.
- `description`: Descripción del video.
- `url`: URL donde está alojado el video.
- `userId`: Clave foránea, identificador del usuario que subió el video.
- `username`: Nombre del usuario que subió el video.

#### Comment
- `id`: Clave primaria, identificador único para cada comentario.
- `text`: Texto del comentario.
- `userId`: Clave foránea, identificador del usuario que hizo el comentario.
- `videoId`: Clave foránea, identificador del video al que pertenece el comentario.
- `username`: Nombre del usuario que comento el video.
- `parentCommentId`: Clave foránea opcional, identificador del comentario al que este comentario responde.

## API Endpoints

A continuación se presenta una tabla con los endpoints disponibles en la aplicación:

| Método | Ruta                    | Descripción                              |
|--------|-------------------------|------------------------------------------|
| GET    | `/users`                | Obtiene una lista de todos los usuarios. |
| POST   | `/users`                | Crea un nuevo usuario.                   |
| GET    | `/users/:id`            | Obtiene un usuario por su ID.            |
| PUT    | `/users/:id`            | Actualiza un usuario por su ID.          |
| DELETE | `/users/:id`            | Elimina un usuario por su ID.            |
| GET    | `/videos`               | Obtiene una lista de todos los videos.   |
| POST   | `/videos`               | Crea un nuevo video.                     |
| GET    | `/videos/:id`           | Obtiene un video por su ID.              |
| PUT    | `/videos/:id`           | Actualiza un video por su ID.            |
| DELETE | `/videos/:id`           | Elimina un video por su ID.              |
| GET    | `/comments`             | Obtiene una lista de todos los comentarios. |
| POST   | `/comments`             | Crea un nuevo comentario.               |
| GET    | `/comments/:id`         | Obtiene un comentario por su ID.        |
| PUT    | `/comments/:id`         | Actualiza un comentario por su ID.      |
| DELETE | `/comments/:id`         | Elimina un comentario por su ID.        |


## Vista Comentarios por Video

Como podemos notar los comentarios salen en orden de jerarquia.

```json
[
  {
    "id": 1,
    "title": "Video Evolutecc",
    "description": "Comenzamos!",
    "url": "http://example.com/evolutecc.mp4",
    "userId": 1,
    "username": "user1",
    "comments": [
      {
        "id": 1,
        "text": "Que gran Video!",
        "parentCommentId": null,
        "username": "user1",
        "videoId": 1,
        "children": [
          {
            "id": 2,
            "text": "Que gran Video!",
            "parentCommentId": 1,
            "username": "user2",
            "videoId": 1,
            "children": []
          },
          {
            "id": 3,
            "text": "¡Excelente video, gracias por compartir!",
            "parentCommentId": 2,
            "username": "usuario123",
            "videoId": 1,
            "children": []
          }
        ]
      }
    ]
  }
]
```