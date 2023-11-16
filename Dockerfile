FROM node:18.16-alpine
WORKDIR /app
COPY . .
RUN yarn add sharp
EXPOSE 3000
CMD [ "yarn", "start" ]