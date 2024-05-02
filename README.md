# Reto Evolutecc Comentarios

Este proyecto desarrolla un backend utilizando NestJS, TypeORM, PostgreSQL y Docker para gestionar una plataforma de contenido multimedia. Los usuarios pueden registrarse, subir videos y comentar tanto en los videos como en los comentarios de otros usuarios, facilitando una interacción rica y multidimensional. Este Backend no solo permite la creación y gestión de usuarios y videos, sino que también soporta la creación de comentarios anidados. Esta solución está diseñada para ser escalable y eficiente, aprovechando las capacidades modernas de contenerización(Docker) y bases de datos relacionales.

## Configuración Inicial

Instrucciones sobre cómo clonar y configurar el proyecto para ejecutarlo localmente:
```bash
git clone https://github.com/JocMieles/evolutecc-test.git

cd evolutecc-test
```

## Requisitos

- Node.js (v14 o superior)
- Docker
- Docker Compose

## Instalación y Ejecución

- Instrucciones paso a paso para instalar y ejecutar el proyecto utilizando Docker:


```bash
npm install

docker-compose up --build

```
- Instrucciones paso a paso para instalar y ejecutar sin Docker:

Primero se debe crear la base de datos y las tablas. Para la base de datos estan dos opciones que puedes usar.
Las cuales se encuentran en una carpeta en la raiz del proyecto llamada sql, dentro de la carpeta hay un archivo **sql** en el cual encontraras un script para la base de datos, el cual esta **comentado** y tambien para crear las tablas manualmente y algunos datos de prueba.

```bash
npm install

npm run start
```
Luego la **API** queda habilitada en **http://localhost:3000/**

## Documentacion API 

Swagger **http://localhost:3000/api**.

Primero se debe crear un **usuario**, luego crear un video con un **id** de **usuario** y por ultimo se crean los **comentarios** asociando un **usuario** y un **video** con sus respectivos **Id**. Para comentar un comentario debe haber un comentario creado al cual comentar. Ademas recordar que los comentarios anidados estan validados para video y comentario con sus respectivos **IDs**.
**Ejemplo:**
Si un video tiene los comentarios con los ids 1, 2 y 3, y el segundo video tiene los ids 4, y 5. No puedes hacer un comentario del comentario con id 4 relacionandolo al video 1.

Aqui estan explicados los endpoint, esquemas y las estructuras json que se deben usar para crear, actualizar, obtener y eliminar la información de la base de datos.


Para eliminar videos debes eliminar los comentarios para respeta las **foreing key**, asi mismo con los usuarios, borrar los comentarios y los videos.

## Estructura de la Base de Datos

### Diagrama Entidad-Relación

![Diagrama Entidad-Relación](Diagrama%20Entidad-Relacion.png)

### Descripción del Diagrama

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
| PUT    | `/videos/:id`           | Actualiza un video por su ID. Inhabilitado          |
| DELETE | `/videos/:id`           | Elimina un video por su ID.              |
| GET    | `/comments`             | Obtiene una lista de todos los comentarios. |
| POST   | `/comments`             | Crea un nuevo comentario.               |
| GET    | `/comments/:id`         | Obtiene un comentario por su ID.        |
| PUT    | `/comments/:id`         | Actualiza un comentario por su ID.      |
| DELETE | `/comments/:id`         | Elimina un comentario por su ID.        |


## Vista Comentarios por Video

En el **JSON** que se muestra a continuación, cuando se realiza la petición **GET** al endpoint **/videos**, se obtienen todos los videos junto con sus respectivos comentarios organizados en un array. Además, los comentarios se presentan en un orden jerárquico. Aunque existan comentarios que son respuestas de respuestas (hijos de hijos), el sistema solo muestra hasta dos niveles de jerarquía en los comentarios:

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
      },
      {
        "id": 5,
        "text": "¡Excelente video, gracias por compartir!",
        "parentCommentId": null,
        "username": "usuario123",
        "videoId": 1,
        "children": []
      }
    ]
  },
  {
    "id": 2,
    "title": "Introducción a NestJS",
    "description": "Este video explica cómo empezar con NestJS.",
    "url": "https://ejemplo.com/video.mp4",
    "userId": 2,
    "username": "user2",
    "comments": [
      {
        "id": 4,
        "text": "¡Excelente video, gracias por compartir!",
        "parentCommentId": null,
        "username": "usuario123",
        "videoId": 2,
        "children": []
      }
    ]
  }
]
```

## Propuestas futuras

Se sugiere como complemento a este desarrollo implementar un sistema de autenticación, microservicios para cada modulo o tabla con API Gateway, validaciones mas estrictas de inserción de datos y demás, notificaciones y un contador de **likes** para los videos y los comentarios.
Que el eliminar videos quede por un campo al cual se puede llamar **deleted** que por defecto sea **0** y se actuliza a **1** al eliminar, lo cual permite tener permanencia de datos, pero se debe validar que al traer los datos de videos el **deleted** este en 0.