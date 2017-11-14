# Fleet Mappa

This application shows a near realtime map of vehicles and their bearings.


## Installation
### Clone this repository.
```bash
git clone git@github.com:osule/mappa.git
```
### Setup your environment.
```bash
cd mappa
cp .env.sample .env
```
### Build the project.
Confirm your docker version match these by running `docker version` in your terminal:
```bash
Client:
 Version:      17.09.0-ce
 API version:  1.32
...

Server:
 Version:      17.09.0-ce
 API version:  1.32 (minimum version 1.12)
 ...
```
Then, build:
```bash
APP_ENV=develop docker-compose build
```
### Run the project.
```bash
APP_ENV=develop docker-compose up
```

## Testing
You can run tests inside of the docker container. Start the services under test environment.
```bash
APP_ENV=test docker-compose up
```
Then run any of the following to run tests for either of the backing service or client service:
```bash
APP_ENV=test docker-compose run backend yarn test
APP_ENV=test docker-compose run client yarn test
```

## Architecture
Fleet Mappa is built using a PubSub architecture.
Vehicles publish their GPS coordinates to the backing service. 
The backend server fires an event to all subscribed clients connected via sockets.
Clients will in turn update their maps to show new location and bearing for vehicle.

## Technologies
- Redis:
    is used as a temporary broker intended for scaling websockets. This is can be used to keep a shared
    data repository for delivery messages when there are more servers.
- Node:
    is used because of its event driven architecture. 
    The fact that it runs on a single thread allows us to easily scale this horizontally to several servers
    with a front facing load balancer.
- Mongodb:
    A document database. This allows for readily updating the schema for the records when it needs to change.
    Records can also easily be saved to the database in the format they're received.


# APIs
Refer to https://github.com/door2door-io/fullstack-code-challenge for information about available APIs.
See headings:
- [Vehicle registration](https://github.com/door2door-io/fullstack-code-challenge#vehicle-registration)
- [Location update](https://github.com/door2door-io/fullstack-code-challenge#location-update)
- [Vehicle deregistration](https://github.com/door2door-io/fullstack-code-challenge#vehicle-de-registration)
- Vehicle listing
  ```
  GET /vehicles
  ```
  Response status code: 200
  Response body:
  ```
   [
       {
           "_id":"5a09dfcebe9566000f8a2499","id":"bac5188f-67c6-4965-81dc-4ef49622e280",
           "__v":0,
           "locations":[
               {"_id":"5a09dfe2be9566000f8a2566","at":"2017-11-13T18:09:38.354Z","lng":13.46139,"lat":52.45097},
               {"_id":"5a09dfe5be9566000f8a25c7","at":"2017-11-13T18:09:41.359Z","lng":13.46101,"lat":52.45106}
            ]
        }
   ]
  ```