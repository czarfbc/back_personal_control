FROM node:20.15-alpine

WORKDIR /home/api/node/back_personal_control

COPY package*.json ./

COPY . .

RUN npm ci

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]