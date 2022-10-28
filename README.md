# create-dev-portfolio

![docker-badge](https://img.shields.io/badge/node-v16.18.0-green)
![docker-badge](https://img.shields.io/badge/npm-v8.19.2-green)
![dev-portfolio-badge](https://img.shields.io/badge/npm--dependency-dev--portfolio@v2.1.5-green)  
![docker-badge](https://img.shields.io/badge/npx-orange)
![docker-badge](https://img.shields.io/badge/boiler--plate--app-black)
![docker-badge](https://img.shields.io/badge/Docker-red)
![docker-compose-badge](https://img.shields.io/badge/Docker_Compose-red)
![type-script-badge](https://img.shields.io/badge/TypeScript-blue)

`create-dev-portfolio` is a boiler-plate application developed using the [dev-portfolio](https://github.com/modern-agile-team/dev-portfolio) library.
It supports both clients and servers, and if you follow the <a href="recommended-systems">recommended systems</a> below, anyone can easily develop the web.

If you want to check the dev-portfolio library, please refer to the following link: [dev-portfolio](https://github.com/modern-agile-team/dev-portfolio)

![ezgif com-gif-maker](https://user-images.githubusercontent.com/56839474/194718430-5404fa1f-c24b-48a0-8730-15db2d3bde00.gif)

## List

- <a href="#recommended-systems">Recommended systems</a>
- <a href="#run">Run</a>
- <a href="#exit">Exit</a>
- <a href="#deploy">Deploy</a>
- <a href="#tip">Tip</a>
- <a href="#refers">Refers</a>
  - <a href="#swagger-api">Swagger API</a>
  - <a href="#infra-structure">Infra Structure</a>
  - <a href="#database-erd">Database ERD</a>
  - <a href="#example">Example</a>
- <a href="#license">License</a>
- <a href="#contributor">Contributor</a>

## Recommended systems

**Operating System**: Linux & MacOS

> Windows is also available, but bash terminal is recommended, and the following tools must be operated based on bash.

**Tools**

1. recommended: **Bash terminal**
2. required: **Docker** & **Docker-compose**
   - Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).
     > If **mac** and **windows** have **docker desktop** installed, **docker compose** is also installed, so there is no need to install it separately.
     1. Click [here](https://docs.docker.com/get-docker/) to install Docker.
     2. Click [here](https://docs.docker.com/compose/install/) to install Docker Compose.
3. **node** ≥ `v16.18.0`
   - Using nvm, you can easily change the node version. Please refer to the following: [NVM](https://www.notion.so/NVM-53c04d5c8837480e8601e6bd39abc62a#6db02c02a5c549cbaaa7884cac709a9e)
4. **npm** ≥ `v8.19.2`

## Run

1. Install this repo.

```bash
# Install this repo
$ npx create-dev-portfolio <YOUR_APP_NAME>
```

2. Run `dev-portfolio` by daemon.

```bash
# If you want to run both the client and the server, enter the command below.
$ npm run start:all

# Run only the client.
$ npm run start:client

# Run only the server.
$ npm run start:server
```

## Exit

```bash
# If you want to exit both the client and the server, enter the command below.
$ npm run exit:all

# Exit only the client.
$ npm run exit:client

# Exit only the server.
$ npm run exit:server
```

## Deploy

Please note that **only [client-app](https://github.com/modern-agile-team/create-dev-portfolio/tree/master/client/app) are deployed** except for [server-app](https://github.com/modern-agile-team/create-dev-portfolio/tree/master/server) on [Vercel](https://vercel.com/). If you want to deploy the server code, you have to deploy it directly using the cloud provided by AWS, GCP, Oracle, etc.  
The deploying guide will be released soon, so please look forward to it.

```bash
# If you enter the command below, the deploy will proceed automatically to the web page where new URL is registered on Vercel.
$ npm run deploy:client
```

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

## Refers

### Swagger API

<img width="1450" alt="스크린샷 2022-09-12 오후 9 14 15" src="https://user-images.githubusercontent.com/56839474/189650561-5ba9c467-b52c-48e6-b3e7-30813954e12d.png">

You can view server apis very easily by using the Swagger documentation.  
To use the swagger, the `dev-portfolio` server must be in a working state.

If the server is up, go to the link below.

```bash
http://localhost:<YOUR_SERVER_PORT>/swagger
```

### Infra Structure

<img width="1028" alt="스크린샷 2022-09-15 오후 9 48 37" src="https://user-images.githubusercontent.com/79014269/193828681-5d198fd9-9006-4713-a69b-ce576c58b442.png">

### Database ERD

<img width="539" alt="스크린샷 2022-10-12 오전 12 33 55" src="https://user-images.githubusercontent.com/79014269/195138130-56656777-4440-426d-a88e-67c029cf5175.png">

### Example

1. <[dev-portfolio-app](https://github.com/modern-agile-team/dev-portfolio-app)> http://52.78.64.144

![ezgif com-gif-maker](https://user-images.githubusercontent.com/56839474/194718430-5404fa1f-c24b-48a0-8730-15db2d3bde00.gif)

<br>

2. <[woorim960](https://github.com/woorim960/woorim-personal-website)> http://152.70.89.184

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/56839474/194719475-1cc2469e-7b7b-4ef0-8f87-236fa3aefbe1.gif)

<br>

3. <[seohyunsim](https://github.com/seohyunsim/seohyunsim-portfolio)> https://seohyunsim-portfolio.vercel.app/

<img width="1000" alt="스크린샷 2022-09-12 오후 8 52 52" src="https://user-images.githubusercontent.com/56839474/189646646-7faf4842-e881-42bc-bcb9-422975adac95.png">

<br>

## License

[MIT](https://github.com/modern-agile-team/create-dev-portfolio/blob/master/LICENSE)

## Contributor

- [seohyunsim](https://github.com/seohyunsim)
- [soonki-98](https://github.com/soonki-98)
- [jisu3817](https://github.com/jisu3817)
- [woorim960](https://github.com/woorim960)
