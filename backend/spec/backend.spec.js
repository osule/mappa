const frisby = require('frisby');
const fetch = require('node-fetch');


describe('Backend integration tests', () => {
  function testListOfVehicles(done, url, expectedLocation) {
    fetch(url)
      .then(res => {
        expect(res.status).toBe(200);
        return res.json();
      })
      .then(json => {
        expect(JSON.stringify(json)).toContain(JSON.stringify(expectedLocation));
        done();
      })
      .catch(err => {
        expect(err).toBe(undefined);
        done();
      });
  }

  it('Should register vehicle', (done) => {
    frisby
      .post('http://backend:5000/vehicles', { "id": "some-uuid-here" })
      .expect('status', 204)
      .done(done);
  })

  it('Should update vehicle location', (done) => {
    frisby
      .post('http://backend:5000/vehicles/some-uuid-here', { "lat": 10.0, "lng": 20.0, "at": "2017-09-01T12:00:00Z" })
      .expect('status', 204)
      .then(testListOfVehicles(done, 'http://backend:5000/vehicles', { "lat": 10.0, "lng": 20.0, "at": "2017-09-01T12:00:00Z" }))
      .done(done);
  });

  
  it('Should delete vehicle', (done) => {
    frisby
      .del('http://backend:5000/vehicles/some-uuid-here')
      .expect('status', 204)
      .done(done);
  });
});