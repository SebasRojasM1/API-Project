<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# 3er. Concurso de Concurso de Programación Riwi FullStack
## Descripcion del proyecto
### Titulo del proyecto
FROL

### ¿Por qué?
Surge para abordar la necesidad de optimizar el proceso de reserva de servicios, eliminando la limitación de disponibilidad y simplificando la comunicación entre el trabajador y cliente. Todo esto en caso de que, como suele habitualmente, perder tiempo al momento de pedir una cita y no te la concedan de manera inmediata, esperando largo tiempo para ello. 

### ¿Para qué?
El propósito es mejorar la eficiencia y la accesibilidad en la gestión de reservas de servicios, tanto para los proveedores que está en el sistema como para los clientes, permitiendo una programación más efectiva y una mayor satisfacción del cliente.

### ¿Para quien?
Está dirigido tanto a pequeñas como medianas empresas prestadoras de servicios, así como a los clientes que requieren reservar dichos servicios de manera rápida y eficiente.

### Tematica Electa
Desarrollo de una plataforma web para la gestión y organización en tiempo real de reservas de servicios.

### Miembros
- Cristian Camilo Velásquez Cárdenas
- Estivenson Alejandro Estrada Naranjo
- Luis Foronda
- Sebastián Rojas
- Thomas Restrepo

### Skills
- HTML
- CSS
- JavaScript
- TypeScript
- NestJs


## 🛠 Set-Up del proyecto.
Este proyecto se hizo utilizando Nestjs, donde empleamos distintos metodos de manejo de datos para cubrir dos sectores de usuarios: usuarios comunes y empresas.


### Instalando NestJs:
Para instalar NestJs, debemos seguir los siguientes pasos.

1. Abrir la terminal (Recomendable usar GitBash o la terminal de tu IDE de uso)
2. Ejecutar el siguiente comando para instalar NestJs en tu dispositivo.

```sh
  npm i -g @nestjs/cli
```


### Instalación del repositorio:
Para clonar el repositorio hacia su maquina loca y acceder a los archivos del proyecto, deberemos de usar el siguiente comando:

```sh
git clone -b main https://github.com/SebasRojasM1/API-Project.git
```

Con esto, nos aseguraremos de que el repositorio esté disponible en nuestro dispositivo para darle uso de su información y trabajar en ella.

#### Instalar dependencias
Para darle uso al proyecto debemos de instalar todas las librerias y paquetes que son necesarios para su correcta ejecución.
Estas ya se encuentran instaladas como dependencias en el package.json, pero deben ser instaladas en el repositorio local. Para ello, debemos ejecutar el siguiente comando:

```sh
npm install // npm i
```

### Ejecutar proyecto
Para ejecutar el proyecto, debemos de abrir nuestra consola y ejecutar el siguiente comando para inicializar el proyecto:

```sh
npm run start:dev
```

Cabe aclarar que previamente debes de configurar las variables de entorno, la cual se encargan de establecer la optima conexion a la base de datos de MongoDB.

### Variables de entorno
Deberemos de asignarle el valor a las variables de entorno para una optima ejecución del proyecto. 
En este caso, las variables de entorno del proyecto abarcan la persistencia de la conexion a nuestra base de datos, y parte de la configuración del token y su tiempo de caducidad.

```sh
#PERSISTENCE CONNECTION
DB_CONNECTION = mongodb://
DB_HOST = localhost:3000
DB_NAME = nombre de la base de datos
DB_USER = usuario 
DB_PASSWORD = contraseña DB

#Token info
JWT_SECRET= clave secreta
ACCESS_TOKEN_EXPIRY= "Tiempo de caducidad del Token"
```

### Postman
Puedes ejecutar cada uno de los servicios ya establecidos en el proyecto por medio de los endpoints que se ha establecido en una coleccion de Postman, desde crear, editar, eliminar, entre otras acciones. 

Accede a la colección de Postman:
- [Coleccion de Postman](https://www.postman.com/maintenance-operator-95682430/workspace/api-backend-frol/collection/33425968-fdce069b-1e0c-49af-a5b2-7b3cca1e741b?action=share&creator=33425968)

Recordatorio: Para usarlo, es necesario verificar que el proyecto esté ejecutandose correctamente.

### Swagger
Podrás ejecutar cada uno de los servicios establecidos en el proyecto utilizando Swagger.
Unicamente deberás ejecutar el proyecto y acceder a una ruta especifica, donde encontrarás cada uno de ellos y consumir el que requieras, desplegando cada uno de las opciones con sus detalles.

Para acceder a esa ruta, solamente ingresa la siguiente URL en el navegador:
```sh
http://localhost:3000/api
```
O da click en este acceso directo:
- [Acceder al Swagger del proyecto](http://localhost:3000/api)


### Tablero de Trello
Este tablero de Trello se realizó con el objetivo de fijar y asignar tareas relacionadas al desarrollo del proyecto, donde, según el status actual de la tarea, se irá cambiando por el miembro del equipo responsable de dicha tarea.

- [Tablero de Trello](https://trello.com/b/tgExC5kI/frol-api-nestjs)

### Arquitectura de componentes
Accede a la arquitectura de componentes:

- [Modelo](https://lucid.app/lucidchart/ecd9a1f9-c3e1-4e65-81c8-6f7f3e43d17f/edit?invitationId=inv_ba69fe42-e884-49ab-926d-00b9b2346472&page=0_0#)


### Arquitectura Hexagonal
```sh
src/
|-- libs/
|   |-- auth/
|   |   |-- controllers/
|   |   |   |-- auth.controller.ts
|   |   |-- dto/
|   |   |   |-- business/
|   |   |   |   |-- login-business.dto.ts
|   |   |   |   |-- signup-business.dto.ts
|   |   |   |-- users/
|   |   |   |   |-- login-users.dto.ts
|   |   |   |   |-- signup-users.dto.ts
|   |   |-- guards/
|   |   |   |-- auth.guard.ts
|   |   |-- services/
|   |   |   |-- auth.service.ts
|   |   |-- strategies/
|   |   |   |-- at.strategy.ts
|   |   |-- types/
|   |   |   |-- jwtPayload.type.ts
|   |   |   |-- tokens.type.ts
|   |   |-- auth.module.ts
|   |   |
|   |-- common/
|   |   |-- enums/
|   |   |   |-- rol.enum.ts
|   |   |-- filters/
|   |   |   |-- exceptions-filters.dto.ts
|   |   |-- interceptor/
|   |   |   |-- logging.interceptor.ts
|   |   |
|   |-- decorators/
|   |   |-- roles.decorator.ts
|   |   |
|   |-- persistence/
|   |   |-- db-config.ts
|   |   |-- persistence.module.ts
|   |   |
|   |-- utils/
|   |   |-- services/
|   |   |   |-- hash.service.ts
|   |   |-- utils.module.ts
|   |
|   |
|-- module/
|   |-- business/
|   |   |-- controllers/
|   |   |   |-- business.controller.ts
|   |   |-- dto/
|   |   |   |-- create-business.dto.ts
|   |   |   |-- update-business.dto.ts
|   |   |-- entities/
|   |   |   |-- business.entity.ts
|   |   |-- services/
|   |   |   |-- business.service.ts
|   |   |-- business.module.ts
|   |   |
|   |-- users/
|   |   |-- controllers/
|   |   |   |-- users.controller.ts
|   |   |-- dto/
|   |   |   |-- create-users.dto.ts
|   |   |   |-- update-users.dto.ts
|   |   |-- entities/
|   |   |   |-- users.entity.ts
|   |   |-- services/
|   |   |   |-- users.service.ts
|   |   |-- users.module.ts
|   |
|-- app.module.ts/
|-- main.ts/
|
```


## Contribuir
Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama.
```sh
git checkout -b feature/nueva-funcionalidad
```

3. Realiza tus cambios y haz commit .
```sh
git commit -m 'Añadir nueva funcionalidad'
```

4. Sube tus cambios.
```sh
git push origin feature/nueva-funcionalidad
```

5. Abre un Pull Request.
6. Esperar a que sean aceptados los cambios y/o nuevos elementos.


## Coders | NestJs
- @SebasRojasM1
- @Thomasrr29



## Support
Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


## Stay in touch
- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
