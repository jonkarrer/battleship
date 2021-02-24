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
    console.log(computerPlayer.computerBoard.shipYard);
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