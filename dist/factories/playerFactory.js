import GameBoard from "./gameBoardFactory.js";
class Player {
  constructor() {
    this.humanBoard = new GameBoard();
  }
  initHumanPlayer() {
    this.humanBoard.buildGrid();
  }
  placeShip(someDomSelection, whichBoatLength) {
    let coordinatesArr = [];
    for (let i = 0; i < whichBoatLength; i++) {
      coordinatesArr.push(someDomSelection + i);
    }
    this.humanBoard.placeHorizontalShip(whichBoatLength, coordinatesArr);
  }
}
export default Player;
