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

2. Run `dev-portfolio` by daemon.

```bash
$ npm run start:all
```

## Exit

```bash
$ npm run exit:all
```

---

## Tip

1.  **If you want to customize your client.  
    Check to README.md in [dev-portfolio](https://github.com/modern-agile-team/dev-portfolio).**  
    please go to the link below!

        https://github.com/modern-agile-team/dev-portfolio/blob/master/README.md

2.  **If you want to change environment variables such as PORT, DB.  
    Customize files called `.*.env`.**  
    By default, it works normally without modification.

    ````bash # Move to dev-portfolio folder.
    $ cd dev-portfolio

       # Customize the .*.env file as you.
       $ vi ./config/.client.env
       $ vi ./config/.server.env
       ```
    ````

---

## Swagger API

<img width="1450" alt="스크린샷 2022-09-12 오후 9 14 15" src="https://user-images.githubusercontent.com/56839474/189650561-5ba9c467-b52c-48e6-b3e7-30813954e12d.png">

You can view server apis very easily by using the Swagger documentation.  
To use the swagger, the `dev-portfolio` server must be in a working state.

If the server is up, go to the link below.

```bash
http://localhost:<YOUR_SERVER_PORT>/swagger
```

## Infra Structure

<img width="1028" alt="스크린샷 2022-09-15 오후 9 48 37" src="https://user-images.githubusercontent.com/79014269/193828681-5d198fd9-9006-4713-a69b-ce576c58b442.png">

## Database ERD

<img width="539" alt="스크린샷 2022-10-12 오전 12 33 55" src="https://user-images.githubusercontent.com/79014269/195138130-56656777-4440-426d-a88e-67c029cf5175.png">

---
