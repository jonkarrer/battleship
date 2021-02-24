import React, {useRef, useEffect} from 'react'
import Computer from '../factories/computerFactory';
const ComputerBoard = () => {
  let computerPlayer:Computer;
  useEffect(() => {
    computerPlayer = new Computer();
    computerPlayer.initComputerPlayer();
  });
  const attackComputer = (evt:any) => {
    const targetCellRef = parseInt(evt.target.className);
    computerPlayer.computerBoard.receiveAttack(targetCellRef);
    console.log(computerPlayer.computerBoard.missedShotsTracker);
    markHitOnBoard(targetCellRef);
    markMissOnBoard();
  }
  function markHitOnBoard(targetCellRef:number) {
    for (let ship of computerPlayer.computerBoard.shipYard) {//Loop through ships and then each ships coordinates prop.
      for (let hit of ship.hitTracker) {
        if (hit === targetCellRef) {
          gameCellRefs[targetCellRef].current.style.background = "red";
        }
      }
    };
  }
  function markMissOnBoard() {
    for (let hit of computerPlayer.computerBoard.missedShotsTracker) {
      gameCellRefs[hit].current.style.background = "green";
    }
  }
  const gameCellRefs: Array<any> = [];
  for (let n = 0; n < 90; n++) {
    gameCellRefs[n] = useRef(0);
  }
  const innerGridArr: Array<JSX.Element> = [];
  for (let i=0; i < 90; i++) {
    innerGridArr.push(
      <div 
        className={`${i}`} 
        ref= {gameCellRefs[i]}
        onClick={attackComputer}
        key={i} 
      ></div>);
  }
  return (
    <div className='comp-game-board'>
      {innerGridArr}
    </div>
  )
}

export default ComputerBoard;