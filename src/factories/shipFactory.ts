class Ship {
  public hitTracker:Array<number>;
  public hasSank: boolean;
  constructor( private length:number, public coordinates:Array<number>) {
    this.hitTracker = [];
    this.coordinates = coordinates;
    this.hasSank = false;
  }
  hasBeenHit(atThisPosition: number) {
    this.hitTracker.push(atThisPosition);
    this.didHitSink();
  };
  didHitSink() {
    if (this.length === this.hitTracker.length) {
      this.hasSank = true;
    } else {
      return false
    };
  };
}
export default Ship;