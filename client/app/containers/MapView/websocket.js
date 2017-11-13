import io from 'socket.io-client';

const uri = 'http://localhost';
const socket = io.connect('/socket.io/');

const UPDATE_LOCATION = 'vehicles/update_location';
const DELETE_VEHICLE = 'vehicles/deregister';

const messageTypes = {
  UPDATE_LOCATION,
  DELETE_VEHICLE,
}
console.log(messageTypes);

export function init(store) {
  // add listeners to socket messages so we can re-dispatch them as actions
  Object.keys(messageTypes)
    .forEach(
        alias => socket.on(
          messageTypes[alias], (payload) => store.dispatch({ messageTypes[alias], payload })
        )
    );
}
