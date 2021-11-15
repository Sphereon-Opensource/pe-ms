<h1 align="center">
  <br>
  <a href="https://www.sphereon.com"><img src="https://sphereon.com/content/themes/sphereon/assets/img/logo.svg" alt="Sphereon" width="400"></a>
  <br>PE-MS   DIF Presentation Exchange Micro Service 
  <br>
</h1>

## Active Development
_IMPORTANT: This software still is in early development stage. As such you should expect breaking changes in APIs, we expect to keep that to a minimum though._

## Background

This is a NodeJS project which has PE-JS library, and PE-OPEN-API project as dependencies. This project is a stateful REST API project.


This project uses Veramo for ORM + MongoDB

For further information on the API, see the following:

essifi-deliverables/interface_specification_of_pe_rest_api_component.md at master · Sphereon-Opensource/essifi-deliverables

pe-openapi/pe-openapi-0.0.1.yaml at master · Sphereon-Opensource/pe-openapi

## For PE-MS developers

This project has been created using:
* `yarn` version 1.22.11
* `node` version 14.17.5
* `docker-compose` version 1.26.2

### Running
1. Without docker:
For running without docker, you can use the following steps:
#### Install
```shell
yarn install
```
#### Build
```shell
yarn build
```
#### Run
```shell
yarn start
```

#### Test
Test are ran manually using Postman:

1. Import the collection from <root_folder>/test/postman_collections

### Run with Docker-Compose

You can simply start the service with running `yarn docker:start` at the root of project
