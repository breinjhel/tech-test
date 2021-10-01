FROM node:14.18-alpine

RUN mkdir -p ./app/node_modules && chown -R node:node ./app

WORKDIR ./

COPY ./package*.json ./

USER node

#RUN yarn install

COPY --chown=node:node . .

RUN npm install
RUN npm rebuild node-sass
RUN npm run build
EXPOSE 8889

CMD [ "node", "src/do-not-refactor/server.js" ]
