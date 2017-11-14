import io from 'socket.io-client';
import * as mapViewActions from 'containers/MapView/constants';

const uri = 'http://localhost';
const socket = io.connect(uri);


const messageTypes = {
  UPDATE_LOCATION: 'vehicles/update_location',
  DEREGISTER_VEHICLE: 'vehicles/deregister',
};

export function init(store) {
  // add listeners to socket messages so we can re-dispatch them as actions
  Object.keys(messageTypes)
    .forEach((alias) => socket.on(
      messageTypes[alias],
      (payload) => store.dispatch({ type: mapViewActions[alias], payload })
    ));
}
