FROM node:16-alpine AS builder

COPY . /data
WORKDIR /data
RUN yarn install && yarn build

FROM nginx:alpine

COPY --from=builder /data/dist /usr/share/nginx/html
