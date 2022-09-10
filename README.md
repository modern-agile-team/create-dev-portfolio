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
# Install this repo
$ npx create-dev-portfolio <YOUR_CUSTOMIZED_REPOSITORY_NAME>
```

2. Modify files called ```.*.env``` to execute.  
By default, it works normally without modification.

```bash
# Move to dev-portfolio folder.
$ cd dev-portfolio/config

# Customize the .*.env file as you.
$ vi .client.env
$ vi .server.env
$ vi .docker.env
```

3. Run ```dev-portfolio``` by daemon.

```bash
$ npm run start:all
```

## Exit

```bash
$ npm run exit:all
```
