import Ship from '../factories/shipFactory';
import GameBoard from '../factories/gameBoardFactory';
import Player from '../factories/playerFactory';

describe('Test Ship Methods', () => {
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
    expect(destroyer.hasSank).toBe(true);
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
  it('Placed the boat in the shipYard array', () => {
    playerBoard.placeShip(3, [20,21,22]);
    expect(playerBoard.shipYard).toStrictEqual([new Ship(3, [20,21,22])])
  });
  it('Examines attack and declares a Miss! and record coordinates', () => {
    playerBoard.placeShip(4,[30,31,32,33]);
    playerBoard.recieveAttack(25);
    expect(playerBoard.missedShotsTracker).toStrictEqual([25]);
  });
  it('Examines attack and declares HIT! and tells the Ship object', () => {
    playerBoard.placeShip(4,[30,31,32,33]);
    playerBoard.placeShip(3,[20,21,22]);
    playerBoard.recieveAttack(31);
    playerBoard.recieveAttack(20);
    expect(playerBoard.shipYard[0].hitTracker).toStrictEqual([31]);
    expect(playerBoard.shipYard[1].hitTracker).toStrictEqual([20]);
  });
  it('Says that all ships sunk', () => {
    playerBoard.placeShip(4,[30,31,32,33]);
    playerBoard.placeShip(3,[20,21,22]);
    playerBoard.recieveAttack(30);
    playerBoard.recieveAttack(31);
    playerBoard.recieveAttack(32);
    playerBoard.recieveAttack(33);
    playerBoard.recieveAttack(20);
    playerBoard.recieveAttack(21);
    playerBoard.recieveAttack(22);
    expect(playerBoard.countSunkShips()).toBe('end game function');
  })
});

describe('Test Player Methods', () => {
  let humanPlayer:any;
  beforeEach(() => {
    humanPlayer = new Player();
    humanPlayer.initHumanPlayer();
  });
  it('Creates an array with coordinates starting at argument 1', () => {
    humanPlayer.placeOneShip(13, 4);
    expect(humanPlayer.gameBoard.shipYard).toStrictEqual([new Ship(4, [13,14,15,16])]);
    expect(humanPlayer.gameBoard.grid.indexOf(13)).toBe(13);
  })
})