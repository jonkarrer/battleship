class GameBoard {
  public grid:Array<number>;
  constructor() {
   this.grid = [];
  }
  buildGrid() {
    for (let i=0; i < 90; i++) {
      this.grid.push(0);
    };
  }
  placeShip(coordinates:Array<number>) {
    //The gameGrid has ships at all positions where 1 is the value in the array.
    coordinates.forEach((itemInArray) => {this.grid.indexOf(itemInArray) === 1;});
  }
}
export default GameBoard;