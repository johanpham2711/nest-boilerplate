# <p style="text-align: center">NestJs Boilerplate</p>

<div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; text-align: center;">

  <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white" alt="Yarn" />
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="Postgres" />
  <img src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" />
  <img src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white" alt="Swagger" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT" />
  <img src="https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white" alt="RxJS" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />

</div>

## Description

[NestJs Boilerplate](https://github.com/johanpham2711/nest-boilerplate) with [Typescript](https://www.typescriptlang.org/), [Prisma](https://www.prisma.io/), [Postgres](https://www.postgresql.org/),...

by [Johan Pham](https://github.com/johanpham2711)

## Installation

There are 2 way to run the application:

- [NestJs Boilerplate](#nestjs-boilerplate)
  - [Description](#description)
  - [Installation](#installation)
    - [Install and run in development mode](#install-and-run-in-development-mode)
      - [Install dependency](#install-dependency)
      - [Run necessary container](#run-necessary-container)
      - [Run the app](#run-the-app)
      - [Test](#test)
    - [All in one command with Docker](#all-in-one-command-with-docker)
      - [Run the app with Docker compose](#run-the-app-with-docker-compose)
      - [Check the log](#check-the-log)

### Install and run in development mode

#### Install dependency

```bash
# development
$ yarn
```

#### Run necessary container

```bash
# start Postgres and Redis
$ yarn d:up

# Copy .env
$ cp .env.example .env
```

#### Run the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

#### Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

### All in one command with Docker

#### Run the app with Docker compose

```bash
# copy environment
$ cp .env.example .env.production.local

# run container
$ yarn d:up:prod
```

#### Check the log

```bash
# check container is running
$ docker ps

# check container logs
$ docker logs -f <container_id>
```
