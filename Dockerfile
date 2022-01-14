FROM node:14

ENV PEX_MS_URL="mongodb://root:example@mongo:27017/"

WORKDIR /usr/src/app

COPY . .
RUN yarn install
RUN yarn build
EXPOSE 3000

CMD ["yarn", "start"]