import Ship from '../factories/shipFactory';
import GameBoard from '../factories/gameBoardFactory';

describe ('Test Ship Methods', () => {
  let carrier:any;
  let destroyer:any;
  beforeEach(() => {
    carrier = new Ship('carrier', 4, [0,1,2,3]);
    destroyer = new Ship('mid', 3, [0,1,2,3]);
  });
  it('Logs hit', () => {
    carrier.hasBeenHit(3);
    expect(carrier.hitTracker).toStrictEqual([3]);
  });
  it('Logs multiple hits', () => {
    destroyer.hasBeenHit(3);
    destroyer.hasBeenHit(5);
    expect(destroyer.hitTracker).toStrictEqual([3,5]);
  });
  it('Did sink', () => {
    destroyer.hasBeenHit(3);
    destroyer.hasBeenHit(5);
    destroyer.hasBeenHit(2);
    expect(destroyer.didHitSink()).toBe(true);
  });
  it('Did not sink', () => {
    carrier.hasBeenHit(3);
    carrier.hasBeenHit(3);
    carrier.hasBeenHit(3);
    expect(carrier.didHitSink()).toBe(false)
  });
});

describe('Test GameBoard Methods',() => {
  let playerBoard:any;
  beforeEach(() => {
    playerBoard = new GameBoard();
  });
  it('Created an an array with 90 indexes', () => {
    playerBoard.buildGrid();
    expect(playerBoard.grid.length).toBe(90);
  })
})