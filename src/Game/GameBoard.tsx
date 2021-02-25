import React, {useRef, useEffect} from 'react'
import Computer from '../factories/computerFactory';
import {humanPlayer, changeGameLevel} from '../GameProvider';


const ComputerBoard: React.FC = () => {

  let endGame = changeGameLevel();
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

  let computerPlayer:Computer;
  useEffect(() => {
    computerPlayer = new Computer();
    computerPlayer.initComputerPlayer();
  });

  const humanTurn = (evt:any) => {
    const targetCellRef = parseInt(evt.target.className);
    let humanAttack:string = computerPlayer.computerBoard.receiveAttack(targetCellRef);
    humanAttack;
    if (humanAttack === "hit") {
      computerCellRefs[targetCellRef].current.style.background = "red";
    } else {
      computerCellRefs[targetCellRef].current.style.background = "green";
      setTimeout(() => {
        compTurnOverlay.current.style.display="flex"; 
        playerTurnOverlay.current.style.display="none";
      }, 300);
      setTimeout(computerTurn, 2000);//Change turns because human missed.
    };
    countSunkComputerShips();
  }
  function computerTurn() {
    const randomCoordinate = Math.floor(Math.random() * 90);
    let computerAttack:string = readyPlayerOne.humanBoard.receiveAttack(randomCoordinate);
    computerAttack;
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

  function countSunkPlayerShips() {
    let playerShipCount:boolean = readyPlayerOne.humanBoard.countSunkShips();
    playerShipCount;
    if (playerShipCount) {
      endGame();
    };
  }
  function countSunkComputerShips() {
    let computerShipCount:any = computerPlayer.computerBoard.countSunkShips();
    computerShipCount;
    if (computerShipCount === true) {
      endGame();
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