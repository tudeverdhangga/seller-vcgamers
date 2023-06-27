FROM node:18.16-alpine
WORKDIR /app
COPY . .
EXPOSE 3000
CMD [ "yarn", "start" ]