import Ship from './shipFactory';

class GameBoard {
  public grid:Array<number>;
  public shipYard:Array<any>;
  public missedShotsTracker: Array<number>;
  constructor() {
    this.grid = [];
    this.missedShotsTracker = [];
    this.shipYard = [];
  }
  buildGrid() {//Want a large array to represent the GameBoard
    for (let i=0; i < 90; i++) {
      this.grid.push(-1);
    };
  }
  placeHorizontalShip(lengthOfShip:number, coordinatesArr:Array<number>) {
    let placedShip = new Ship(lengthOfShip, coordinatesArr);
    this.shipYard.push(placedShip);
    //Replace the -1 values in grid with the values in ship coordinatesArr "horizontal"
    this.grid.splice(coordinatesArr[0],coordinatesArr.length, ...coordinatesArr);
  }
  receiveAttack(attackPosition:number) {
    //We know a ship is here because the index value is higher than -1.
    if(this.grid.indexOf(attackPosition) > -1) {
      for(let ship of this.shipYard) {//Loop through ships and then each ships coordinates prop.
        for(let coordinate of ship.coordinates) {
          if (coordinate === attackPosition) {
            ship.hasBeenHit(attackPosition);//Tell the ship it has been hit
            this.missedShotsTracker.push(attackPosition);
            return "hit";
          };
        };
      };
    } else {
      this.missedShotsTracker.push(attackPosition);
      return "miss";
    }
  }
  countSunkShips() {
    let sunkShipTotal:number = 0;
    for(let ship of this.shipYard) {
      if (ship.hasSank) {
        sunkShipTotal += 1 
      }
    }
    if (sunkShipTotal === this.shipYard.length) {
      return true
    } else {
      return sunkShipTotal;
    }
  }
}
export default GameBoard;