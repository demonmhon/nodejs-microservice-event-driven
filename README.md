# Test Node.js Microservice with an event driven approach

## Getting Started

Start RabbitMQ

```sh
$ cd rabbitmq
$ docker-compose up -d
```

Check the UI with [http://localhost:15672](http://localhost:15672). 

|username|password|
|-|-|
|guest|guest|

## Start Services

(Concurrently)[https://www.npmjs.com/package/concurrently] provides at root

```sh
$ npm start
concurrently -n "service-A,service-B" "cd service-a && npm run dev" "cd service-b && npm run dev"
```

Open service A with [http://localhost:3100](http://localhost:3100).

Then service B  [http://localhost:3200](http://localhost:3200). Observe response in service B.