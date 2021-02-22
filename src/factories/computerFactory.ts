import GameBoard from './gameBoardFactory';


class Computer {
  public computerBoard:any;
  constructor() {
    this.computerBoard = new GameBoard();
  }
  initComputerPlayer() {
    this.computerBoard.buildGrid();
  }
  placeShipHorizontal(someDomSelection:number, whichBoatLength:number) {
    let coordinatesArr:Array<number>=[];
    for (let i=0; i < whichBoatLength; i++) {
      coordinatesArr.push(someDomSelection + i);
    }
    this.computerBoard.placeShip(whichBoatLength,coordinatesArr);
  }
  placeShipVertical(someDomSelection:number, whichBoatLength:number) {
    let coordinatesArr:Array<number>=[];
    for (let i=0; i < whichBoatLength; i += 9) {
      coordinatesArr.push(someDomSelection + i);
    }
    this.computerBoard.placeShip(whichBoatLength,coordinatesArr);
  }
  sendAttackCoordinate() {
    
  }
}
export default Computer;