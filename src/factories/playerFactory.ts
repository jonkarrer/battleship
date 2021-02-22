import GameBoard from './gameBoardFactory';
import Computer from './computerFactory';

class Player {
  public humanBoard:any;
  constructor() {
    this.humanBoard = new GameBoard();
  }
  initHumanPlayer() {
    this.humanBoard.buildGrid();
  }
  placeShipHorizontal(someDomSelection:number, whichBoatLength:number) {
    let coordinatesArr:Array<number>=[];
    for (let i=0; i < whichBoatLength; i++) {
      coordinatesArr.push(someDomSelection + i);
    }
    this.humanBoard.placeHorizontalShip(whichBoatLength,coordinatesArr);//will call gameboard and pass length and array as arguments
  }
  placeShipVertical(someDomSelection:number, whichBoatLength:number) {
    let coordinatesArr:Array<number>=[];
    for (let i=0; i < (whichBoatLength * 10); i += 10) {
      coordinatesArr.push(someDomSelection + i);
    }
    this.humanBoard.placeVerticalShip(whichBoatLength,coordinatesArr);
  }
}
export default Player;