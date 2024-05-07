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

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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
- Thomas Restrepo
- Sebastián Rojas
- Luis Foronda


## Arquitectura del proyecto:
```bash
src/
├── modules/
│   ├── users/
│   │   ├── controllers/
│   │   │   └── user.controller.ts
│   │   ├── services/
│   │   │   └── user.service.ts
│   │   ├── dtos/
│   │   │   └── user.dto.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   └── user.module.ts
│   │
│   ├── business/
│   │   ├── controllers/
│   │   │   └── business.controller.ts
│   │   ├── services/
│   │   │   └── business.service.ts
│   │   ├── dtos/
│   │   │   └── business.dto.ts
│   │   ├── entities/
│   │   │   └── business.entity.ts
│   │   └── business.module.ts
│   │
│   ├── appointments/
│   │   ├── controllers/
│   │   │   └── appointments.controller.ts
│   │   ├── services/
│   │   │   └── appointments.service.ts
│   │   ├── dtos/
│   │   │   └── appointments.dto.ts
│   │   └── appointments.module.ts
│   │
└── libs/
    ├── persistence/
    │   ├── db-config.ts 
    │   └── persistence.module.ts
    │
    ├── decorators/
    │   ├── public-decorator.ts 
    │   ├── private-decorator.ts 
    │   ├── auth.decorator.ts
    │   └── roles.decorator.ts
    │
    ├── utils/
    │   ├── services/
    │   │   └── hash.service.ts
    │   └── utils.module.ts
    │
    └── auth/
        ├── controllers/
        │   └── auth.controller.ts
        ├── services/
        │   └── auth.service.ts
        ├── dtos/
        │   └── auth.dto.ts
        ├── entities/
        │   └── auth.entity.ts
        └── auth.module.ts
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
