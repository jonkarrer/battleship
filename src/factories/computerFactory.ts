import GameBoard from './gameBoardFactory';


class Computer {
  public computerBoard:any;
  constructor() {
    this.computerBoard = new GameBoard();
  }
  initComputerPlayer() {
    this.computerBoard.buildGrid();
  }
  placeShipHorizontal(someRandomSelection:number, whichBoatLength:number) {
    let coordinatesArr:Array<number>=[];
    for (let i=0; i < whichBoatLength; i++) {
      coordinatesArr.push(someRandomSelection + i);
    }
    this.computerBoard.placeHorizontalShip(whichBoatLength,coordinatesArr);
  }
  placeShipVertical(someRandomSelection:number, whichBoatLength:number) {
    let coordinatesArr:Array<number>=[];
    for (let i=0; i < (whichBoatLength * 10); i += 10) {
      coordinatesArr.push(someRandomSelection + i);
    }
    this.computerBoard.placeVerticalShip(whichBoatLength,coordinatesArr);
  }
}
export default Computer;