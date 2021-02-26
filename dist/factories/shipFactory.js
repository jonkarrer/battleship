class Ship {
  constructor(length, coordinates) {
    this.length = length;
    this.coordinates = coordinates;
    this.hitTracker = [];
    this.coordinates = coordinates;
    this.hasSank = false;
  }
  hasBeenHit(atThisPosition) {
    this.hitTracker.push(atThisPosition);
    this.didHitSink();
  }
  didHitSink() {
    if (this.length === this.hitTracker.length) {
      this.hasSank = true;
    } else {
      return false;
    }
    ;
  }
}
export default Ship;
