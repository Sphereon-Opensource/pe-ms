FROM node:14

ENV MONGODB_URL="mongodb://root:example@mongo:27017/"
ENV PORT=3000
ENV ENV="development";
ENV DATABASE_NAME="PEX_MS";
ENV USERNAME="root";
ENV PASSWORD="example";
ENV AUTH_SOURCE="admin";

WORKDIR /usr/src/app

COPY . .
RUN yarn install
RUN yarn build
EXPOSE 3000

CMD ["yarn", "start"]