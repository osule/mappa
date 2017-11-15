import sinon from 'sinon';
import { init, socket } from '../websocket';

describe('init', () => {
  it('should register listeners', () => {
    const stub = sinon.stub(socket, 'on').yields(undefined);
    const store = {
      dispatch: () => {},
    };
    init(store);
    expect(stub.calledWith('vehicles/update_location')).toBe(true);
    expect(stub.calledWith('vehicles/deregister')).toBe(true);
  });
});
