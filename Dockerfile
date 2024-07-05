FROM node:20.15-alpine

WORKDIR /home/api/node/back_personal_control

COPY . .

RUN rm -rf node_modules
RUN npm ci
RUN npx prisma generate

EXPOSE ${PORT}

CMD [ "npm", "run", "start:dev" ]