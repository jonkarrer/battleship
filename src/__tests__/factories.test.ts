import Ship from '../factories/shipFactory';
import GameBoard from '../factories/gameBoardFactory';
import Player from '../factories/playerFactory';
import Computer from '../factories/computerFactory';

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
  it('Spliced in the coordinates of the ship placement horizontally', () => {
    playerBoard.placeHorizontalShip(3,[10,11,12]);
    expect(playerBoard.grid.indexOf(10)).toBe(10);
    expect(playerBoard.grid.indexOf(11)).toBe(11);
    expect(playerBoard.grid.indexOf(12)).toBe(12);
  });
  it('Spliced in the coordinates of the ship placement vertically', () => {
    playerBoard.placeVerticalShip(3, [0,10,20]);
    expect(playerBoard.grid.indexOf(0)).toBe(0);
    expect(playerBoard.grid.indexOf(10)).toBe(10);
    expect(playerBoard.grid.indexOf(20)).toBe(20);
  })
  it('Placed the boat in the shipYard array', () => {
    playerBoard.placeHorizontalShip(3, [20,21,22]);
    expect(playerBoard.shipYard).toStrictEqual([new Ship(3, [20,21,22])])
  });
  it('Examines attack and declares a Miss! and record coordinates', () => {
    playerBoard.placeHorizontalShip(4,[30,31,32,33]);
    playerBoard.receiveAttack(25);
    expect(playerBoard.missedShotsTracker).toStrictEqual([25]);
  });
  it('Examines attack and declares HIT! and tells the Ship object', () => {
    playerBoard.placeHorizontalShip(4,[30,31,32,33]);
    playerBoard.placeHorizontalShip(3,[20,21,22]);
    playerBoard.receiveAttack(31);
    playerBoard.receiveAttack(20);
    expect(playerBoard.shipYard[0].hitTracker).toStrictEqual([31]);
    expect(playerBoard.shipYard[1].hitTracker).toStrictEqual([20]);
  });
  it('Says that all ships sunk', () => {
    playerBoard.placeHorizontalShip(4,[30,31,32,33]);
    playerBoard.placeHorizontalShip(3,[20,21,22]);
    playerBoard.receiveAttack(30);
    playerBoard.receiveAttack(31);
    playerBoard.receiveAttack(32);
    playerBoard.receiveAttack(33);
    playerBoard.receiveAttack(20);
    playerBoard.receiveAttack(21);
    playerBoard.receiveAttack(22);
    expect(playerBoard.countSunkShips()).toBe('end game function');
  })
});

describe('Test Player build Methods', () => {
  let humanPlayer:any;
  let computerOpponent:any;
  beforeEach(() => {
    computerOpponent = new Computer(humanPlayer);
    humanPlayer = new Player(computerOpponent);
    humanPlayer.initHumanPlayer();
  });
  it('Checks that the ship is placed horizontal on human gameBoard', () => {
    humanPlayer.placeShipHorizontal(13, 4);
    expect(humanPlayer.humanBoard.shipYard).toStrictEqual([new Ship(4, [13,14,15,16])]);
    expect(humanPlayer.humanBoard.grid.indexOf(13)).toBe(13);
  });
  it('Checks that the ship is placed vertical on human gameBoard', () => {
    humanPlayer.placeShipVertical(0, 3);
    expect(humanPlayer.humanBoard.shipYard).toStrictEqual([new Ship(3, [0,10,20])]);
    expect(humanPlayer.humanBoard.grid.indexOf(10)).toBe(10);
  });
})
describe('Test Computer build Methods', () => {
  let computerPlayer:any;
  beforeEach(() => {
    computerPlayer = new Computer(undefined);
    computerPlayer.initComputerPlayer();
  });
  it('Checks that the ship is placed horizontal on human gameBoard', () => {
    computerPlayer.placeShipHorizontal(13, 4);
    expect(computerPlayer.computerBoard.shipYard).toStrictEqual([new Ship(4, [13,14,15,16])]);
    expect(computerPlayer.computerBoard.grid.indexOf(13)).toBe(13);
  });
  it('Checks that the ship is placed vertical on human gameBoard', () => {
    computerPlayer.placeShipVertical(0, 3);
    expect(computerPlayer.computerBoard.shipYard).toStrictEqual([new Ship(3, [0,10,20])]);
    expect(computerPlayer.computerBoard.grid.indexOf(10)).toBe(10);
  });
});

describe('Test Player attack Method', () => {
  let humanPlayer:any;
  let computerOpponent:any;
  beforeEach(() => {
    computerOpponent = new Computer(humanPlayer);
    humanPlayer = new Player(computerOpponent);
    humanPlayer.initHumanPlayer();
    humanPlayer.initComputerPlayer();
  });
  it('Test if computerOpponent places ship properly inside player class', () => {
    humanPlayer.computerOpponent.placeShipHorizontal(12, 3);
    humanPlayer.computerOpponent.placeShipVertical(30, 4);
    expect(humanPlayer.computerOpponent.computerBoard.shipYard).toStrictEqual([new Ship(3, [12,13,14]), new Ship(4,[30,40,50,60])]);
    expect(humanPlayer.computerOpponent.computerBoard.grid.indexOf(13)).toBe(13);
    expect(humanPlayer.computerOpponent.computerBoard.grid.indexOf(14)).toBe(14);
    expect(humanPlayer.computerOpponent.computerBoard.grid.indexOf(40)).toBe(40);
    expect(humanPlayer.computerOpponent.computerBoard.grid.indexOf(50)).toBe(50);
  });
  it('Test if computer recieves attack', () => {
    humanPlayer.computerOpponent.placeShipHorizontal(12, 3);
    humanPlayer.computerOpponent.placeShipVertical(30, 4);
    humanPlayer.sendAttackCoordinate(12);
    humanPlayer.sendAttackCoordinate(40);
    //Go to computer shipyard and see if the targeted boat's hitTracker matches.
    expect(humanPlayer.computerOpponent.computerBoard.shipYard[0].hitTracker).toStrictEqual([12]);
    expect(humanPlayer.computerOpponent.computerBoard.shipYard[1].hitTracker).toStrictEqual([40]);
  });
});

describe('Test Computer attack Method', () => {
  let humanPlayer:any;
  let computerOpponent:any;
  beforeEach(() => {
    humanPlayer = new Player(computerOpponent);
    humanPlayer.initHumanPlayer();
    humanPlayer.placeShipHorizontal(12, 3);
    humanPlayer.placeShipVertical(30, 4)
    computerOpponent = new Computer(humanPlayer);
  });
  it('Test if humanPlayer placed ship properly before being passed into computerOpponent', () => {
    expect(computerOpponent.humanPlayer.humanBoard.shipYard).toStrictEqual([new Ship(3, [12,13,14]), new Ship(4,[30,40,50,60])]);
    expect(computerOpponent.humanPlayer.humanBoard.grid.indexOf(13)).toBe(13);
    expect(computerOpponent.humanPlayer.humanBoard.grid.indexOf(14)).toBe(14);
    expect(computerOpponent.humanPlayer.humanBoard.grid.indexOf(40)).toBe(40);
    expect(computerOpponent.humanPlayer.humanBoard.grid.indexOf(50)).toBe(50);
  });
  it('Test if computer recieves attack', () => {
    computerOpponent.sendAttackCoordinate(12);
    computerOpponent.sendAttackCoordinate(40);
    //Go to computer shipyard and see if the targeted boat's hitTracker matches.
    expect(computerOpponent.humanPlayer.humanBoard.shipYard[0].hitTracker).toStrictEqual([12]);
    expect(computerOpponent.humanPlayer.humanBoard.shipYard[1].hitTracker).toStrictEqual([40]);
  });
});

