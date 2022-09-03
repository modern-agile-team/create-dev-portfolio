# dev-portfolio-backend-auto-set

![docker-compose-badge](https://img.shields.io/badge/Docker_Compose-red)
![docker-compose-badge](https://img.shields.io/badge/TypeScript-blue)

> This is still under development...

Open source that automatically builds [dev-portfolio](https://github.com/modern-agile-team/dev-portfolio)'s backend, such as API server and MariaDB server.

## Before

> prepare in advance for setting up the development environment.

- Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).
  > If **mac** and **windows** have **docker desktop** installed, **docker compose** is also installed, so there is no need to install it separately.
  1.  Click [here](https://docs.docker.com/get-docker/) to install Docker.
  2.  Click [here](https://docs.docker.com/compose/install/) to install Docker Compose.

## Run

1. Clone this repo.

```bash
# clone this repo
$ git clone https://github.com/modern-agile-team/dev-portfolio-backend-auto-set

# move to repo folder.
$ cd dev-portfolio-backend-auto-set
```

2. Make a file called '.env' for backend-server.

```bash
$ vi .env
```

2-2. Write your private values in '.env'.

```bash
# MariaDB
DB_HOST_NAME="..."
...

# API server
...
```

3. Run all backend servers by daemon.

```bash
$ docker-compose up -d
```

## Termination

```bash
$ docker-compose down
```
