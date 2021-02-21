class Ship {
  public hitTracker:Array<number>;
  constructor(private name: string, private length:number, private position:number) {
    this.hitTracker = [];
  }
  isHit(index: number) {
    this.hitTracker.push(index);
  };
  isSunk():string {
    if (this.length === this.hitTracker.length) {
      return "Sunk";
    } else {
      return `${this.length - this.hitTracker.length} hits left`;
    };
  };
}
export default Ship;