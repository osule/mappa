const utils = require('../utils');


describe('Utils tests for liesWithinBoundaryCircle', () => {

  it('Should return false when location lies outside office bounds', () => {
    expect(utils.liesWithinBoundaryCircle(52.45259, 13.45876)).toBe(false);
  })

  it('Should return true when location lies within office bounds', () => {
    expect(utils.liesWithinBoundaryCircle(52.53, 13.406)).toBe(true);
  });

});