class Ship {
  public hitTracker:Array<number>;
  constructor( private length:number, public coordinates:Array<number>) {
    this.hitTracker = [];
    this.coordinates = coordinates;
  }
  hasBeenHit(atThisPosition: number) {
    this.hitTracker.push(atThisPosition);
  };
  didHitSink():boolean {
    if (this.length === this.hitTracker.length) {
      return true;
    } else {
      return false;
    };
  };
}
export default Ship;