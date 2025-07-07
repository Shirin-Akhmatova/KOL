FROM node:latest

WORKDIR /opt/kol_frontend/

COPY . .

RUN npm install
RUN npm run build
RUN rm -rf node_modules

COPY ./copy-dist.sh /copy-dist.sh
RUN chmod +x /copy-dist.sh

CMD ["/copy-dist.sh"]
