FROM node:15-alpine

COPY ./dist /app/dist
COPY ./package.json /app

EXPOSE 4000

WORKDIR /app

RUN npm install

CMD ["node", "dist/app/server/main.js"]
