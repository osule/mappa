# Fleet Mappa

This application shows a near realtime map of vehicles and their bearings.


## Installation
Clone this repository.
```bash
git clone git@github.com:osule/mappa.git
```
Setup your environment.
```bash
cd mappa
cp .env.sample .env
```
Build the project.
```bash
APP_ENV=develop docker-compose build
```
Run the project.
```bash
APP_ENV=develop docker-compose up
```

## Testing
You can run tests inside of the docker container. First startup services under test.
```bash
APP_ENV=test docker-compose up
```
Then run:
```bash
APP_ENV=test docker-compose run backend yarn test
APP_ENV=test docker-compose run client yarn test
```

## Architecture
Fleet Mappa is built on a PubSub architecture.
Vehicles publish their GPS coordinates to the backend server. 
The backend server fires an event to all subscribed clients connected via sockets.
Clients will in turn update their maps to show new location and bearing for vehicle.

## Technologies
- Redis:
    is used as a hold-in to scale websockets. This is can be used to keep a shared
    data repository for delivery messages when there are more servers.
- Node:
    is used because of its event driven architecture. 
    The fact that it runs on a single thread allows us to easily scale this horizontally to several servers using
    a load balancer.
- Mongodb:
    A document database. Allows to dump