class GameBoard {
  public grid:Array<number>;
  constructor() {
   this.grid = [];
  }
  buildGrid() {
    for (let i=0; i < 90; i++) {
      this.grid.push(-1);
    };
  }
  placeShip(coordinates:Array<number>) {
    //Replace the values in grid with the ship coordinates
    this.grid.splice(coordinates[0],coordinates.length, ...coordinates);
  }
  examineAttack(attackPosition:number) {
    if(this.grid.indexOf(attackPosition) > -1) {
      //the boat at this position got hit at some spot
      return true;
    } else {
      return false;
    }
  }
}
export default GameBoard;