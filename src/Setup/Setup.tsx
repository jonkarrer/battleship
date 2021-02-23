import React, {useEffect} from 'react'
import {changeGameLevel} from '../GameProvider';
import './Setup.css'

const gameBoardArr: Array<number> = 
[
0,0,0,0,0,0,0,0,0,0, //a[0-0]
0,0,0,0,0,0,0,0,0,0, //b[0-9]
0,0,0,0,0,0,0,0,0,0, //c[0-9]
0,0,0,0,0,0,0,0,0,0, //d[0-9]
0,0,0,0,0,0,0,0,0,0, //e[0-9]
0,0,0,0,0,0,0,0,0,0, //f[0-9]
0,0,0,0,0,0,0,0,0,0, //g[0-9]
0,0,0,0,0,0,0,0,0,0, //h[0-9]
0,0,0,0,0,0,0,0,0,0  //I[0-9]
]
 const Setup: React.FC = () => {
   useEffect(() => {

   })
  
  return (
    <div className="Setup">
      <section className="setup">
        <div className="game-cell">
          <div className="game-board">{gameBoardArr.map((item, index) => (<div key={index}>{item}</div>))}</div>
          <div className="boat-selection">Lots of ships</div>
        </div>
        <div className="placeships-cell">Place Ships</div>
        <div className="options-cell">
          <div>Reset</div>
          <div>Randomize Ships</div>
          <div onClick={changeGameLevel()}>START!</div>
        </div>
      </section>
      <div className="boat-1-setup"><img src="./assets/4.jpg" alt="boat"/></div>
      <div className="boat-2-setup"><img src="./assets/5.jpg" alt="boat"/></div>
    </div>
  )
}

export default Setup;