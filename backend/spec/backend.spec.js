const frisby = require('frisby');
const fetch = require('node-fetch');


describe('Backend integration tests', () => {
  function testListOfVehicles(done, url, expectation) {
    fetch(url)
      .then(res => {
        expect(res.status).toBe(200);
        return res.json();
      })
      .then(json => {
        expectation(JSON.stringify(json))
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

  it('Should not update vehicle location', (done) => {
    const location = { "lat": 10.0, "lng": 20.0, "at": "2017-09-01T12:00:00Z" };

    frisby
      .post('http://backend:5000/vehicles/some-uuid-here', location)
      .expect('status', 204)
      .then(testListOfVehicles(
        done, 
        'http://backend:5000/vehicles',
        (res) => expect(res).not.toContain(JSON.stringify(location))
      ))
      .done(done);
  });


  it('Should update vehicle location', (done) => {
    const location = { "lat": 52.53, "lng": 13.406, "at": "2017-09-01T12:00:00Z" };

    frisby
      .post('http://backend:5000/vehicles/some-uuid-here', location)
      .expect('status', 204)
      .then(testListOfVehicles(
        done, 
        'http://backend:5000/vehicles', 
        (res) => expect(res).not.toContain(JSON.stringify(location))
      ))
      .done(done);
  });

  it('Should  update vehicle ')

  
  it('Should delete vehicle', (done) => {
    frisby
      .del('http://backend:5000/vehicles/some-uuid-here')
      .expect('status', 204)
      .done(done);
  });
});
