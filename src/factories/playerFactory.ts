import GameBoard from './gameBoardFactory';
import Computer from './computerFactory';

class Player {
  public humanBoard:any;
  public computerOpponent:any;
  constructor() {
    this.humanBoard = new GameBoard();
    this.computerOpponent = new Computer();
  }
  initHumanPlayer() {
    this.humanBoard.buildGrid();
  }
  initComputerPlayer() {
    this.computerOpponent.initComputerPlayer();
  }
  placeOneShip(someDomSelection:number, whichBoatLength:number) {
    let coordinatesArr:Array<number>=[];
    for (let i=0; i < whichBoatLength; i++) {
      coordinatesArr.push(someDomSelection + i);
    }
    this.humanBoard.placeShip(whichBoatLength,coordinatesArr);//will call gameboard and pass length and array as arguments
  }
  placeShipVertical(someDomSelection:number, whichBoatLength:number) {
    let coordinatesArr:Array<number>=[];
    for (let i=0; i < whichBoatLength; i += 9) {
      coordinatesArr.push(someDomSelection + i);
    }
    this.humanBoard.placeShip(whichBoatLength,coordinatesArr);
  }
  sendAttackCoordinate(someDomSelection:number) {
    this.computerOpponent.computerBoard.receiveAttack(someDomSelection);
  }
}
export default Player;