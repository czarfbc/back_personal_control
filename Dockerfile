FROM node:20.15-bullseye-slim

WORKDIR /home/api/node/back_personal_control

COPY . .

RUN rm -rf node_modules
RUN npm install
RUN npx prisma generate

EXPOSE ${PORT}