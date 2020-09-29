# Docker

## [Docker for WSL2](https://docs.docker.com/docker-for-windows/wsl-tech-preview/)
* Setup Remote-WSL for vscode

### Options Cheat Sheet
* `docker run -p 8080:8080 -v ${PWD}/api/dist:/swagger -e SWAGGER_JSON=/swagger/swagger.json swaggerapi/swagger-ui`
  * docker run at > port 8080 > with volume set to swagger container > set container environment variable SWAGGER_JSON > swagger-ui docker image