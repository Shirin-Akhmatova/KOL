FROM node:20.11.0-alpine

WORKDIR /opt/services/core_frontend/

COPY . .

RUN npm i

RUN npm run build

RUN mkdir -p /frontend_dist && cp -r dist/* /frontend_dist/

RUN rm -rf node_modules

VOLUME /frontend_dist
