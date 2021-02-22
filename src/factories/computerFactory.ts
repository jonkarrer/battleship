import GameBoard from './gameBoardFactory';


class Computer {
  public computerBoard:any;
  constructor(public humanPlayer:any) {
    this.computerBoard = new GameBoard();
    this.humanPlayer = humanPlayer;
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
  sendAttackCoordinate(someRandomSelection:number) {
    this.humanPlayer.humanBoard.receiveAttack(someRandomSelection);
  }
}
export default Computer;