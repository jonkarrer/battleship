import React, {useRef, useEffect} from 'react'
import {humanPlayer} from '../GameProvider';
import './Game.css'
const PlayerBoard = () => {
  const readyPlayerOne = humanPlayer();
  const gameCellPlayerRefs: Array<any> = [];
  for (let n = 0; n < 90; n++) {
    gameCellPlayerRefs[n] = useRef(0);
  }

  function markHitOnBoard() {
    for (let ship of readyPlayerOne.humanBoard.shipYard) {//Loop through ships and then each ships coordinates prop.
      for (let hit of ship.hitTracker) {
          gameCellPlayerRefs[hit].current.style.background = "red";
          console.log('Hit');
      }
    };
  }

  const innerGridPlayerArr: Array<JSX.Element> = [];
  for (let i=0; i < 90; i++) {
    innerGridPlayerArr.push(
      <div className={`${i}`} key={i} ref= {gameCellPlayerRefs[i]}></div>);
  }
  return (
    <div className="user-game-board">
      {innerGridPlayerArr}
    </div>
  )
}

export default PlayerBoard;