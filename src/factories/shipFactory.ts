class Ship {
  public hitTracker:Array<number>;
  constructor(private name: string, private length:number, private whereOnBoard:Array<number>) {
    this.hitTracker = [];
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