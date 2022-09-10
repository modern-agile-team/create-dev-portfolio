# dev-portfolio-auto-set

![docker-compose-badge](https://img.shields.io/badge/Docker_Compose-red)
![docker-compose-badge](https://img.shields.io/badge/TypeScript-blue)

## Before

> prepare in advance for setting up the development environment.

- Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).
  > If **mac** and **windows** have **docker desktop** installed, **docker compose** is also installed, so there is no need to install it separately.
  1.  Click [here](https://docs.docker.com/get-docker/) to install Docker.
  2.  Click [here](https://docs.docker.com/compose/install/) to install Docker Compose.

## Run

1. Install this repo.

```bash
# install this repo
$ npx create-dev-portfolio dev-portfolio
```

2. Create a file called '.env' to execute.

```bash
# move to dev-portfolio folder.
$ cd dev-portfolio

# create a file
$ vi .env
```

2-2. Write your private values in '.env'.

```bash
...
```

3. Run Dev-portfolio by daemon.

```bash
$ npm run start:all
```
