import Ship from "./shipFactory.js";
class GameBoard {
  constructor() {
    this.grid = [];
    this.missedShotsTracker = [];
    this.shipYard = [];
  }
  buildGrid() {
    for (let i = 0; i < 90; i++) {
      this.grid.push(-1);
    }
    ;
  }
  placeHorizontalShip(lengthOfShip, coordinatesArr) {
    let placedShip = new Ship(lengthOfShip, coordinatesArr);
    this.shipYard.push(placedShip);
    this.grid.splice(coordinatesArr[0], coordinatesArr.length, ...coordinatesArr);
  }
  receiveAttack(attackPosition) {
    if (this.grid.indexOf(attackPosition) > -1) {
      for (let ship of this.shipYard) {
        for (let coordinate of ship.coordinates) {
          if (coordinate === attackPosition) {
            ship.hasBeenHit(attackPosition);
            this.missedShotsTracker.push(attackPosition);
            return "hit";
          }
          ;
        }
        ;
      }
      ;
    } else {
      this.missedShotsTracker.push(attackPosition);
      return "miss";
    }
  }
  countSunkShips() {
    let sunkShipTotal = 0;
    for (let ship of this.shipYard) {
      if (ship.hasSank) {
        sunkShipTotal += 1;
      }
    }
    if (sunkShipTotal === this.shipYard.length) {
      return true;
    } else {
      return sunkShipTotal;
    }
  }
}
export default GameBoard;
