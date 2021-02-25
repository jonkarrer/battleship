import React, {useRef, useEffect, useState} from 'react'
import Computer from '../factories/computerFactory';
import {humanPlayer} from '../GameProvider';

const ComputerBoard: React.FC = () => {

  let computerPlayer:Computer;
  let readyPlayerOne = humanPlayer();
  let compTurnOverlay:any = useRef(0);
  let playerTurnOverlay:any = useRef(0);

  const playerCellRefs: Array<any> = [];
  for (let n = 0; n < 90; n++) {
    playerCellRefs[n] = useRef(0);
  }
  const computerCellRefs: Array<any> = [];
  for (let n = 0; n < 90; n++) {
    computerCellRefs[n] = useRef(0);
  }

  useEffect(() => {
    computerPlayer = new Computer();
    computerPlayer.initComputerPlayer();
  });

  const humanTurn = (evt:any) => {
    const targetCellRef = parseInt(evt.target.className);
    let humanAttack:string = computerPlayer.computerBoard.receiveAttack(targetCellRef);
    humanAttack;
    if (humanAttack === "hit") {
      countSunkComputerShips();
      computerCellRefs[targetCellRef].current.style.background = "red";
    } else {
      console.log(computerPlayer.computerBoard.shipYard);
      computerCellRefs[targetCellRef].current.style.background = "green";
      setTimeout(() => {
        compTurnOverlay.current.style.display="flex"; 
        playerTurnOverlay.current.style.display="none";
      }, 300);
      setTimeout(computerTurn, 2000);//Change turns because human missed.
    };
  }

  function computerTurn() {
    const randomCoordinate = Math.floor(Math.random() * 90);
    readyPlayerOne.humanBoard.receiveAttack(randomCoordinate);
    let computerAttack:string = readyPlayerOne.humanBoard.receiveAttack(randomCoordinate);
    //Loop through ships and then each ships coordinates prop.
    if (computerAttack === "hit") {
      countSunkPlayerShips();
      playerCellRefs[randomCoordinate].current.style.background = "red";
      setTimeout(computerTurn, 2500);
    } else {
      playerCellRefs[randomCoordinate].current.style.background = "green";
      setTimeout(() => {
        compTurnOverlay.current.style.display="none"; 
        playerTurnOverlay.current.style.display="flex"
      }, 1000);

    };
  };
  const [playerShipsLeft, setPlayerSunkBoats] = useState(5);
  function countSunkPlayerShips() {
    let playerShipCount:boolean = readyPlayerOne.humanBoard.countSunkShips();
    playerShipCount;
    if (playerShipCount) {
      console.log('Game Over');
    } else {
      for(let ship of computerPlayer.computerBoard.shipYard) {
        if (ship.hasSank) {
        setPlayerSunkBoats(playerShipsLeft - 1); 
        };
      };
    };
  }
  const [computerShipsLeft, setCompSunkBoats] = useState(5);
  function countSunkComputerShips() {
    let computerShipCount:boolean = computerPlayer.computerBoard.countSunkShips();
    computerShipCount;

    if (computerShipCount) {
      console.log('Game Over');
    } else {
      for(let ship of computerPlayer.computerBoard.shipYard) {
        if (ship.hasSank) {
        setCompSunkBoats(computerShipsLeft - 1); 
        };
      };
    };
  }

  const playerBoardCells: Array<JSX.Element> = [];
  for (let i=0; i < 90; i++) {
    playerBoardCells.push(
      <div 
      className={`${i}`} 
      key={i} 
      ref= {playerCellRefs[i]}
      ></div>);
  }
  
  const computerBoardCells: Array<JSX.Element> = [];
  for (let i=0; i < 90; i++) {
    computerBoardCells.push(
      <div 
        className={`${i}`} 
        ref={computerCellRefs[i]}
        onClick={humanTurn}
        key={i} 
      ></div>);
  }
  return (
    <React.Fragment>
    <div className="boat-count-cell">
      <div className="user-boat-count">Player Boats: {playerShipsLeft}</div>
      <div className="comp-boat-count">Computer Boats: {computerShipsLeft}</div>
    </div>
    <div className="game-board-cell">
      <div className="user-game-board">
      <div className="player-turn-overlay" ref={playerTurnOverlay}>
          Your Turn
      </div>
        {playerBoardCells}
      </div>
      <div className='comp-game-board'>
        <div className="computer-turn-overlay" ref={compTurnOverlay}>
          Computer Turn
        </div>
        {computerBoardCells}
      </div>
    </div>
    </React.Fragment>
  )
}

export default ComputerBoard;