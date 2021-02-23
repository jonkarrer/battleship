import GameBoard from './gameBoardFactory';


class Computer {
  public computerBoard:any;
  constructor() {
    this.computerBoard = new GameBoard();
  }
  initComputerPlayer() {
    this.computerBoard.buildGrid();
    //For test
    this.placeShipHorizontal(0, 4);//0,1,2,3,4
    this.placeShipHorizontal(80, 3);//81,82,83
    this.placeShipVertical(25, 3); //25,35,45
    this.placeShipHorizontal(12, 3);//12,13,14
    this.placeShipVertical(60, 2);//60, 70
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