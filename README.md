<h1 align="center">
  <br>
  <a href="https://www.sphereon.com"><img src="https://sphereon.com/content/themes/sphereon/assets/img/logo.svg" alt="Sphereon" width="400"></a>
  <br>PE-JS   DIF Presentation Exchange JavaScript Library 
  <br>
</h1>

[![CI](https://github.com/Sphereon-Opensource/pe-js/actions/workflows/main.yml/badge.svg)](https://github.com/Sphereon-Opensource/pe-js/actions/workflows/main.yml)

## Active Development
_IMPORTANT: This software still is in early development stage. As such you should expect breaking changes in APIs, we expect to keep that to a minimum though._

## Background

The pe-state-machine project aims to implement the PE-OPENAPI and use PE-JS library and Veramo API as a dependency. 

## How to run it

From the root folder:

```shell
# running it via yarn
yarn install

yarn build

node dist/src/index.js

# running it via npm
npm install

npm run build

node dist/src/index.js
```

## Environment variables

There are two environment variables that may be set

```shell
# PORT - defaults to 3000
export PORT=5000

# ENV - defaults to development
export ENV=prod
```

## Docker