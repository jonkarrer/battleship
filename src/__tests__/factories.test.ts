import Ship from '../factories/shipFactory';

describe ('shipFactory Functions', () => {
  let longShip:any;
  let midShip:any;
  beforeEach(() => {
    longShip = new Ship('longShip', 4, 28);
    midShip = new Ship('mid', 3, 10);
  });
  it('Logs hit', () => {
    longShip.isHit(3);
    expect(longShip.hitTracker).toStrictEqual([3]);
  });
  it('Logs multiple hits', () => {
    midShip.isHit(3);
    midShip.isHit(5);
    expect(midShip.hitArr)
  })
})