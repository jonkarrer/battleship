import GameBoard from './gameBoardFactory';
import Computer from './computerFactory';

class Player {
  public humanBoard:any;
  constructor(public computerOpponent:any) {
    this.humanBoard = new GameBoard();
    this.computerOpponent = computerOpponent;
  }
  initHumanPlayer() {
    this.humanBoard.buildGrid();
  }
  initComputerPlayer() {
    this.computerOpponent.initComputerPlayer();
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
  sendAttackCoordinate(someDomSelection:number) {
    this.computerOpponent.computerBoard.receiveAttack(someDomSelection);
  }
}
export default Player;