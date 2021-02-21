import Ship from '../factories/shipFactory';
import GameBoard from '../factories/gameBoardFactory';

describe ('Test Ship Methods', () => {
  let carrier:any;
  let destroyer:any;
  beforeEach(() => {
    carrier = new Ship(4, [0,1,2,3]);
    destroyer = new Ship(3, [0,1,2]);
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
    playerBoard.buildGrid();
  });
  it('Created an an array with 90 indexes of -1 value', () => {
    expect(playerBoard.grid.length).toBe(90);
    expect(playerBoard.grid.indexOf(30)).toBe(-1);
  });
  it('Spliced in the coordinates of the ship placement', () => {
    playerBoard.placeShip(3,[10,11,12]);
    expect(playerBoard.grid.indexOf(10)).toBe(10);
    expect(playerBoard.grid.indexOf(11)).toBe(11);
    expect(playerBoard.grid.indexOf(12)).toBe(12);
  });
  it('Cross check the attack with the ship coordinates', () => {
    playerBoard.placeShip(4,[30,31,32,33]);
    expect(playerBoard.examineAttack(30)).toBe(true);
    expect(playerBoard.examineAttack(31)).toBe(true);
    expect(playerBoard.examineAttack(32)).toBe(true);
    expect(playerBoard.examineAttack(33)).toBe(true);
  });
})