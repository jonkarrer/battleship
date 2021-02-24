import React from 'react'
import './Game.css'
const PlayerBoard = () => {
const innerGridArr: Array<JSX.Element> = [];
for (let i=0; i < 90; i++) {
  innerGridArr.push(
    <div className={`${i}`} key={i}></div>);
}
  return (
    <div className="user-game-board">
      {innerGridArr}
    </div>
  )
}

export default PlayerBoard;