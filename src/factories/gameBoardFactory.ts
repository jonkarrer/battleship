import Ship from './shipFactory';

class GameBoard {
  public grid:Array<number>;
  private shipYard:Array<any>;
  private missedShotsTracker: Array<number>;
  constructor() {
   this.grid = [];
   this.missedShotsTracker = [];
   this.shipYard = []; //experimental
    
  }
  buildGrid() {
    for (let i=0; i < 90; i++) {
      this.grid.push(-1);
    };
  }
  placeShip(lengthOfShip:number, coordinates:Array<number>) {
    //Make a boat at this spot with these coordinates
    const placedShip = new Ship(lengthOfShip, coordinates);
    this.shipYard.push(placedShip);//experimental
    //Replace the values in grid with the ship coordinates
    this.grid.splice(coordinates[0],coordinates.length, ...coordinates);
  }
  examineAttack(attackPosition:number) {
    if(this.grid.indexOf(attackPosition) > -1) {
      return true;
    } else {
      this.missedShotsTracker.push(attackPosition);
    }
  }
}
export default GameBoard;