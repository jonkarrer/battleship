import GameBoard from "./gameBoardFactory.js";
class Computer {
  constructor() {
    this.computerBoard = new GameBoard();
    this.alreadyPlaced = [
      17,
      18,
      19,
      27,
      28,
      29,
      37,
      38,
      39,
      47,
      48,
      49,
      57,
      58,
      59,
      67,
      68,
      69,
      77,
      78,
      79,
      87,
      88,
      89
    ];
  }
  initComputerPlayer() {
    this.computerBoard.buildGrid();
    const shipLengthHolder = [2, 3, 3, 3, 4];
    for (let i = 0; i <= 5; i++) {
      let shipLength = shipLengthHolder.pop();
      let randomCoordinate = this.computerAttackMaker();
      this.placeShipHorizontal(randomCoordinate, shipLength);
    }
  }
  computerAttackMaker() {
    let randomCoord = Math.floor(Math.random() * 89);
    const checkAttack = () => {
      for (let coord of this.alreadyPlaced) {
        if (randomCoord != coord) {
          continue;
        } else {
          randomCoord = Math.floor(Math.random() * 89);
          checkAttack();
        }
        ;
      }
      ;
    };
    checkAttack();
    for (let i = 0; i <= 4; i++) {
      this.alreadyPlaced.push(randomCoord + i);
    }
    return randomCoord;
  }
  placeShipHorizontal(someRandomSelection, whichBoatLength) {
    let coordinatesArr = [];
    for (let i = 0; i < whichBoatLength; i++) {
      coordinatesArr.push(someRandomSelection + i);
    }
    this.computerBoard.placeHorizontalShip(whichBoatLength, coordinatesArr);
  }
}
export default Computer;
