### STAGE 1: Build ###
FROM node:12.15.0 as build-step

Run mkdir -p /usr/src/jewelleryStore

WORKDIR /usr/src/jewelleryStore

copy dist/JewelleryStore /usr/src/jewelleryStore


### STAGE 2: Run ###
FROM nginx:latest

COPY dist/JewelleryStore /usr/share/nginx/html
EXPOSE 80
