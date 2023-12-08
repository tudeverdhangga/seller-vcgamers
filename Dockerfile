FROM node:18.16-alpine
WORKDIR /app
COPY . .
RUN yarn add sharp --ignore-engines
EXPOSE 3000
CMD [ "yarn", "start" ]