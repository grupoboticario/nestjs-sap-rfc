# syntax = edrevo/dockerfile-plus

FROM node:20

INCLUDE+ ./dockerfiles/node20.Dockerfile

WORKDIR /app

# Copy app source code
COPY ./ ./
RUN npm install
