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
$ cd dev-portfolio

# Customize the .*.env file as you.
$ vi ./config/.client.env
$ vi ./config/.server.env
$ vi ./config/.docker.env
```

3. Run ```dev-portfolio``` by daemon.

```bash
$ npm run start:all
```

## Exit

```bash
$ npm run exit:all
```

---

## Swagger API
You can view server apis very easily by using the Swagger documentation.  
To use the swagger, the ```dev-portfolio``` server must be in a working state.  

If the server is up, go to the link below.

```bash
http://localhost:YOUR_SERVER_PORT/swagger
```
