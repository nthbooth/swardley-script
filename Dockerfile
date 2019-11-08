FROM node:10-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY ./mapping/package*.json ./
USER node
RUN npm install
COPY --chown=node:node ./mapping/* .
EXPOSE 8080
CMD [ "node", "mapping.js" ]
