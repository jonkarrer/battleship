import React, {useState, useRef, useEffect} from 'react'
import {humanPlayer} from '../GameProvider';

interface GameBoardProps {
  axis: string;
}
const GameBoard: React.FC<GameBoardProps> = ({axis}) => {
  const readyPlayerOne = humanPlayer();
  const [eventHoverColor, setEventColor] = useState('white');
  const [shipLength, setShipLength] = useState(4);

  //need multiple varaible names for useRef hook to append to game cells. 
  const gameCellRefs: Array<any> = [];
  for (let n = 0; n < 90; n++) {
    gameCellRefs[n] = useRef(0);
  }
  
  useEffect(() => {
    function turnOffCellsOnEdgeOfBoard() {
      if (shipLength === 4) {
        //turn of columns 7-9 cells' event listeners off
        for (let i=7; i < 90; i += 10) {
          gameCellRefs[i].current.style.pointerEvents = "none";
        }
        for (let i=8; i < 90; i += 10) {
          gameCellRefs[i].current.style.pointerEvents = "none";
        }
        for (let i=9; i < 90; i += 10) {
          gameCellRefs[i].current.style.pointerEvents = "none";
        }
      } else if (shipLength === 3) {
        //Turn column 7 back on
        for (let i=7; i < 90; i += 10) {
          gameCellRefs[i].current.style.pointerEvents = "auto";
        }
      } else {
        //Turn column 8 back on
        for (let i=8; i < 90; i += 10) {
          gameCellRefs[i].current.style.pointerEvents = "auto";
        }
      }
    }
    console.log(readyPlayerOne.humanBoard.shipYard);
    turnOffCellsOnEdgeOfBoard();
  },[shipLength]);
  
  const mouseEnterCell = (evt:any) => {
    const targetCellRef = parseInt(evt.target.className);
    if (gameCellRefs[targetCellRef].current.style.background === "red") {
      return
    } else {
      for (let i=0; i < shipLength; i++) {
        gameCellRefs[targetCellRef + i].current.style.background = "green";
      } 
    }
  }

  const mouseLeaveCell = (evt:any) => {
    const targetCellRef = parseInt(evt.target.className);
    setEventColor('white');
    if (gameCellRefs[targetCellRef].current.style.background === "red") {
      return
    } else {
      evt.target.style.background = eventHoverColor;
      for (let i=0; i < shipLength; i++) {
        gameCellRefs[targetCellRef + i ].current.style.background = eventHoverColor;
      } 
    }
  }

  const placeShipOnTarget = (evt:any) => {
    evt.target.style.pointerEvents = "none";
    const targetCellRef = parseInt(evt.target.className);

    readyPlayerOne.placeShip(axis, targetCellRef, shipLength);

    colorInShipOnBoard(targetCellRef);
    setEventColor('red'); //Place red ship
  }
  function colorInShipOnBoard(targetCellRef:number) {
    if (shipLength === 4) {
      if (targetCellRef < 3) {
        topLeftPlacement();
      } else if (targetCellRef > 85) {
        bottomRightPlacement();
      }else if (targetCellRef % 10 === 6) {
        rightEdgePlacement()
      }else {
        normalPlacement();
      }
    } else if (shipLength === 3) {
      if (targetCellRef < 2) {
        topLeftPlacement();
      } else if (targetCellRef > 86) {
        bottomRightPlacement();
      }else if (targetCellRef % 10 === 7) {
        rightEdgePlacement()
      }else {
        normalPlacement();
      }
    }else {
      if (targetCellRef < 1) {
        topLeftPlacement();
      } else if (targetCellRef > 87) {
        bottomRightPlacement();
      }else if (targetCellRef % 10 === 8) {
        rightEdgePlacement()
      }else {
        normalPlacement();
      }
    }
    function normalPlacement() {
      for (let i=0; i < shipLength; i++) {
        // Color i number squares to the right of click event
        gameCellRefs[targetCellRef + i ].current.style.background = "red";
        // i+1 turns off one square to right the ship.
        gameCellRefs[targetCellRef + (i + 1)].current.style.pointerEvents = "none";
        // Turn off squares to left of boat equal to lenght of the boat. 
        gameCellRefs[targetCellRef - i ].current.style.pointerEvents = "none";
      }
    }
    function topLeftPlacement() {
      for (let i=0; i < shipLength; i++) {
        // Color i number squares to the right of click event
        gameCellRefs[targetCellRef + i ].current.style.background = "red";
        // i+1 turns off the square behind the ship. Prevent overlap. 
        gameCellRefs[targetCellRef + (i + 1)].current.style.pointerEvents = "none";
      }
    }
    function bottomRightPlacement() {
      for (let i=0; i < shipLength; i++) {
        // Color i number squares to the right of click event
        gameCellRefs[targetCellRef + i ].current.style.background = "red"; 
         // Turn off squares to left of boat equal to lenght of the boat. 
         gameCellRefs[targetCellRef - i ].current.style.pointerEvents = "none";
      }
    }
    function rightEdgePlacement() {
      for (let i=0; i < shipLength; i++) {
        // Color i number squares to the right of click event
        gameCellRefs[targetCellRef + i ].current.style.background = "red";
        // Turn off squares to left of boat equal to lenght of the boat. 
        gameCellRefs[targetCellRef - i ].current.style.pointerEvents = "none";
      }
    }
    reduceShipLength();
  }
  let allThreeShipsPlaced = useRef(1);
  function reduceShipLength() {
    if (shipLength === 4) {
      setShipLength(shipLength - 1);
    } else if (shipLength === 3) {
        if (allThreeShipsPlaced.current === 3) {
          setShipLength(shipLength -1)
        } else {
          allThreeShipsPlaced.current = allThreeShipsPlaced.current + 1;
        }
    }

  }

  const innerGridArr: Array<JSX.Element> = [];
  for (let i=0; i < 90; i++) {
    innerGridArr.push(
      <div 
        className={`${i}`} 
        ref= {gameCellRefs[i]}
        onClick={placeShipOnTarget}
        onMouseOut={mouseLeaveCell} 
        onMouseEnter={mouseEnterCell} 
        key={i} 
      >{i}</div>);
  }
  return (
    <div className="game-board">
      {innerGridArr}
    </div>
  )
}

export default GameBoard;