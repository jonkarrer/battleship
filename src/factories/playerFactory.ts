import GameBoard from './gameBoardFactory';


class Player {
  public gameBoard:any;
  constructor() {
    this.gameBoard = new GameBoard();
  }
  initHumanPlayer() {
    this.gameBoard.buildGrid();
  }
  initComputerPlayer() {
    
  }
  placeOneShip(someDomSelection:number, whichBoatLength:number) {
    let coordinatesArr:Array<number>=[];
    for (let i=0; i < whichBoatLength; i++) {
      coordinatesArr.push(someDomSelection + i);
    }
    this.gameBoard.placeShip(whichBoatLength,coordinatesArr);//will call gameboard and pass length and array as arguments
  }
}
export default Player;