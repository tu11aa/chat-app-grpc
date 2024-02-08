## Things you need to run this application

1. Node npm/yarn
2. Docker
3. protoc (can install through choco (win))

## Project setup

```
docker compose up -d (run envoy and redis)
yarn install
yarn proto:gen
yarn start (start server)
cd client && yarn install
yarn start
```
