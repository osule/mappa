# Fleet Mappa

This application shows a near realtime map of vehicles and their bearings.


## Installation
Clone this repository.
```
git clone git@github.com:osule/mappa.git
```
Setup your environment.
```
cd mappa
cp .env.sample .env
```
Build the project.
```
docker-compose build
```
Run the project.
```
docker-compose up
```

## Testing
You can run tests inside of the docker container
```
docker-compose run -e TEST=1 backend yarn test
docker-compose run -e TEST=1 client yarn test
```

## Architecture
Mappa is built on a PubSub architecture.
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