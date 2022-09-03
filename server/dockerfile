FROM node:14.5.0

WORKDIR /usr/app

COPY ./app/tsconfig.json .
COPY ./app/package* .
COPY ./app/build ./build

RUN npm ci --production

CMD ["npm", "start"]