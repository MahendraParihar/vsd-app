# kelp

## Most Frequently used commands

This project was generated using [Nx](https://nx.dev). Visit the [Nx Documentation](https://nx.dev) to learn more.

So install nx globally as we depend on it for remaining commands.

`npm install -g nx`

### Install npm packages

To install all the packages of client, server, and shared-library at once. Run below command at root level.
`npm install`

Note: You can also do `npm install` in their respective folders as well.

#### SERVER Setup

Please refer [README.md](server/README.md) for Server Setup and package installation

#### CLIENT Setup

Please refer [README.md](client/README.md) for Client Setup

#### Docker For VSD

Note: the Following commands should be executed from root of the project.

For building Server image

```shell
docker build . -f ./infra/Dockerfile.server -t vsd-server
```

For building admin panel image

```shell
docker build . -f ./infra/Dockerfile.client-admin -t vsd-client-admin
````

For building website image

```shell
docker build . -f ./infra/Dockerfile.client -t vsd-client
```

Note: Ensure that you have .env file created in infra folder with ENV variable defined
For running all Servers

```shell
docker-compose -f ./infra/docker-compose.yml --env-file ./infra/.env up -d
docker-compose -f ./infra/docker-compose.yml up -d
docker-compose -f ./infra/docker-compose-postgres.yml up -d
```

#### Docker run
```shell
docker  run  [CONTAINER_NAME] sleep infinity
```
#### List docker containers list
```shell
docker ps -a
```

#### Go inside docker image
```shell
docker exec -it reverent_swirles bash
```

URL for UI: http://localhost:8080/ --issues with code and setup of backend