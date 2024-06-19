ARG PATH=/home/node/app

FROM node:22-alpine as base

ARG PATH
WORKDIR ${PATH}

RUN npm i -g nuxt

COPY package*.json .
COPY yarn.lock .

FROM base as build
ARG PATH
WORKDIR ${PATH}

RUN yarn install --production

COPY . .

RUN yarn build


FROM base as production

ARG PATH
WORKDIR ${PATH}

COPY --from=build --chown=node:node ${PATH}/.output ${PATH}/.output

USER node

CMD [ "node", ".output/server/index.mjs" ]

