FROM node:20.15-bullseye

WORKDIR /usr/app

COPY ./package.json ./package-lock.json ./
COPY ./prisma ./

RUN npm ci
RUN npm i -g typescript prisma

RUN prisma generate

EXPOSE ${PORT}