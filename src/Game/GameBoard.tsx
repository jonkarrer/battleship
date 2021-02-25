import React, {useRef, useEffect} from 'react'
import Computer from '../factories/computerFactory';
import {humanPlayer} from '../GameProvider';
const ComputerBoard = () => {
  let computerPlayer:Computer;
  let readyPlayerOne = humanPlayer();
  let compTurnOverlay:any = useRef(0);

  useEffect(() => {
    computerPlayer = new Computer();
    computerPlayer.initComputerPlayer();
  });

  const attackComputer = (evt:any) => {
    const targetCellRef = parseInt(evt.target.className);
    computerPlayer.computerBoard.receiveAttack(targetCellRef);
    markHitOnBoard(targetCellRef);
    markMissOnBoard(targetCellRef);
  }
  function markHitOnBoard(targetCellRef:number) {
    for (let ship of computerPlayer.computerBoard.shipYard) {//Loop through ships and then each ships coordinates prop.
      for (let hit of ship.hitTracker) {
        if (hit === targetCellRef) {
          gameCellComputerRefs[targetCellRef].current.style.background = "red";
        }
      }
    };
  }
  function markMissOnBoard(targetCellRef:number) {
    for (let miss of computerPlayer.computerBoard.missedShotsTracker) {
      if (targetCellRef === miss) {
      gameCellComputerRefs[targetCellRef].current.style.background = "green";
      compTurnOverlay.current.style.display="flex";
      setTimeout(computerTurn, 2000)
      } 
    }
  }
  function computerTurn() {
    const randomAttack = Math.floor(Math.random() * 90);
    readyPlayerOne.humanBoard.receiveAttack(randomAttack);
    for (let ship of readyPlayerOne.humanBoard.shipYard) {//Loop through ships and then each ships coordinates prop.
      for (let hit of ship.hitTracker) {
        gameCellPlayerRefs[hit].current.style.background = "red";
        if (randomAttack === hit) {
          setTimeout(computerTurn, 2000);
          return "Hit"
        } else {
          setTimeout(() => compTurnOverlay.current.style.display="none", 1000);
        }
      };
      for (let miss of readyPlayerOne.humanBoard.missedShotsTracker) {
        gameCellPlayerRefs[miss].current.style.background = "green";
      } 
    };
  }

  const gameCellPlayerRefs: Array<any> = [];
  for (let n = 0; n < 90; n++) {
    gameCellPlayerRefs[n] = useRef(0);
  }
  const innerGridPlayerArr: Array<JSX.Element> = [];
  for (let i=0; i < 90; i++) {
    innerGridPlayerArr.push(
      <div className={`${i}`} key={i} ref= {gameCellPlayerRefs[i]}></div>);
  }

  const gameCellComputerRefs: Array<any> = [];
  for (let n = 0; n < 90; n++) {
    gameCellComputerRefs[n] = useRef(0);
  }
  const innerGridComputerArr: Array<JSX.Element> = [];
  for (let i=0; i < 90; i++) {
    innerGridComputerArr.push(
      <div 
        className={`${i}`} 
        ref={gameCellComputerRefs[i]}
        onClick={attackComputer}
        key={i} 
      ></div>);
  }
  return (
    <div className="game-board-cell">
      <div className="user-game-board">
        {innerGridPlayerArr}
      </div>
      <div className='comp-game-board'>
        <div className="computer-turn-overlay" ref={compTurnOverlay}>
          Computer Turn
        </div>
        {innerGridComputerArr}
      </div>
    </div>
  )
}

export default ComputerBoard;