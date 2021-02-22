import Player from '../factories/playerFactory';
import Computer from '../factories/computerFactory';
import Ship from '../factories/shipFactory';

describe('Test game loop', () => {
  let computerPlayer:any;
  let humanPlayer:any;
  beforeEach(() => {
    humanPlayer= new Player()
    humanPlayer.initHumanPlayer();
    computerPlayer = new Computer();
    computerPlayer.initComputerPlayer();
  })
  it('Checks shipyard for correct boats on computer board', () => {
    const setupComputerPlayer = () => {
      computerPlayer.placeShipHorizontal(0, 4);
      computerPlayer.placeShipHorizontal(80, 3);
      computerPlayer.placeShipVertical(25, 3); 
      computerPlayer.placeShipHorizontal(12, 3);
      computerPlayer.placeShipVertical(60, 2);
    }
    setupComputerPlayer();
    expect(computerPlayer.computerBoard.shipYard).toStrictEqual(
      [
        new Ship(4, [0,1,2,3]), 
        new Ship(3, [80,81,82]), 
        new Ship(3, [25,35,45]), 
        new Ship(3, [12,13,14]), 
        new Ship(2, [60, 70])
      ]);
  });
  it('Checks shipyard for correct boats on human board', () => {
    const setupComputerPlayer = () => {
      humanPlayer.placeShipHorizontal(0, 4);
      humanPlayer.placeShipHorizontal(80, 3);
      humanPlayer.placeShipVertical(25, 3); 
      humanPlayer.placeShipHorizontal(12, 3);
      humanPlayer.placeShipVertical(60, 2);
    }
    setupComputerPlayer();
    expect(humanPlayer.humanBoard.shipYard).toStrictEqual(
      [
        new Ship(4, [0,1,2,3]), 
        new Ship(3, [80,81,82]), 
        new Ship(3, [25,35,45]), 
        new Ship(3, [12,13,14]), 
        new Ship(2, [60, 70])
      ]);
  });


});