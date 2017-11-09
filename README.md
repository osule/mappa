# Mappa

This application shows a realtime map of vehicles and their bearings.

# Architecture
Mappa is built on a PubSub architecture.
Vehicles publish their GPS coordinates to the backend server. 
The backend server fires an event to all subscribed clients connected via sockets.
Clients will in turn update their maps to show new location and bearing for vehicle.

# Technologies
- Redis:
    is used as a hold-in to scale websockets. This is necessarily to keep a shared
    data repository for locations.
- Node:
    is used because of its event driven architecture. 
    The fact that it runs on a single thread allows us to easily scale this horizontally using
    a load balancer.
