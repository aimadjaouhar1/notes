FROM node:slim

WORKDIR /usr/src/app
COPY  ./dist/apps/api ./

RUN npm i
RUN npm i pg

EXPOSE 3000

CMD ["node", "main"]