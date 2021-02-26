import React, {useState, useRef, useEffect} from 'react'
import {humanPlayer, changeGameLevel} from '../GameProvider';

interface SetUpBoardProps {
  axis: string;
}
const SetUpBoard: React.FC<SetUpBoardProps> = ({axis}) => {
  const startGame = changeGameLevel();
  const readyPlayerOne = humanPlayer();
  const [eventHoverColor, setEventColor] = useState('rgba(100, 100, 100, .6)');
  const [shipLength, setShipLength] = useState(4);
  const [changeCellTurn, setCellTurn] = useState(4);
  //need multiple varaible names for useRef hook to append to game cells. 
  const gameCellRefs: Array<any> = [];
  for (let n = 0; n < 90; n++) {
    gameCellRefs[n] = useRef(0);
  }
  useEffect(() => {
    function turnOffCellsOnEdgeOfBoard() {
      if (shipLength === 4) {
        //turn off columns' 7-9 cells' event listeners off
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
      } else if (shipLength === 2) {
        //Turn column 8 back on
        for (let i=8; i < 90; i += 10) {
          gameCellRefs[i].current.style.pointerEvents = "auto";
        };
      };
    };
    function turnOffHorizontalCells() {
      for (let i=7; i < 90; i += 10) {
        gameCellRefs[i].current.style.pointerEvents = "auto";
      };
      for (let i=8; i < 90; i += 10) {
        gameCellRefs[i].current.style.pointerEvents = "auto";
      };
      for (let i=9; i < 90; i += 10) {
        gameCellRefs[i].current.style.pointerEvents = "auto";
      };
      if (shipLength === 4) {
        //turn off columns' 7-9 cells' event listeners off
        for (let i=60; i < 90; i ++) {
          gameCellRefs[i].current.style.pointerEvents = "none";
        };
      } else if (shipLength === 3) {
        for (let i=60; i < 90; i ++) {
          gameCellRefs[i].current.style.pointerEvents = "auto";
        };
        for (let i=70; i < 90; i ++) {
          gameCellRefs[i].current.style.pointerEvents = "none";
        };
      } else if (shipLength === 2) {
        //Turn column 8 back on
        for (let i=60; i < 90; i ++) {
          gameCellRefs[i].current.style.pointerEvents = "auto";
        };
        for (let i=80; i < 90; i ++) {
          gameCellRefs[i].current.style.pointerEvents = "none";
        };
      };
    }
    if (axis === "Horizontal") {
      turnOffCellsOnEdgeOfBoard();
    } else {
      turnOffHorizontalCells();
    };
    
  },[shipLength, changeCellTurn]);
  
  const mouseEnterCell = (evt:any) => {
    const targetCellRef = parseInt(evt.target.className);
    setCellTurn(changeCellTurn + 1);
    if ( axis === 'Horizontal') {
      if (gameCellRefs[targetCellRef].current.style.background === "red") {
        return
      } else {
        for (let i=0; i < shipLength; i++) {
          gameCellRefs[targetCellRef + i].current.style.background = "green";
        }; 
      };
    } else {
      if (shipLength === 4) {
        if (targetCellRef < 60) {
          if (gameCellRefs[targetCellRef].current.style.background === "red") {
            return
          } else {
            for (let i=0; i < shipLength * 10; i+=10) {
              gameCellRefs[targetCellRef + i].current.style.background = "blue";
            }; 
          };
        } 
      } else if (shipLength === 3) {
        if (targetCellRef < 70) {
          if (gameCellRefs[targetCellRef].current.style.background === "red") {
            return
          } else {
            for (let i=0; i < shipLength * 10; i+=10) {
              gameCellRefs[targetCellRef + i].current.style.background = "blue";
            }; 
          };
        } 
      } else {
        if (targetCellRef < 80) {
          if (gameCellRefs[targetCellRef].current.style.background === "red") {
            return
          } else {
            for (let i=0; i < shipLength * 10; i+=10) {
              gameCellRefs[targetCellRef + i].current.style.background = "blue";
            }; 
          };
        } 
      }
    }
  }

  const mouseLeaveCell = (evt:any) => {
    const targetCellRef = parseInt(evt.target.className);
    
    setEventColor('rgba(100, 100, 100, .6)');
    if (axis === 'Horizontal') {
      if (gameCellRefs[targetCellRef].current.style.background === "red") {
        return
      } else {
        evt.target.style.background = eventHoverColor;
        for (let i=0; i < shipLength; i++) {
          gameCellRefs[targetCellRef + i ].current.style.background = eventHoverColor;
        } 
      }
    } else {
      if (gameCellRefs[targetCellRef].current.style.background === "red") {
        return
      } else {
        evt.target.style.background = eventHoverColor;
        for (let i=0; i < shipLength * 10; i+=10) {
          gameCellRefs[targetCellRef + i].current.style.background = eventHoverColor;
        } 
      }
    }
  }

  const placeShipOnTarget = (evt:any) => {
    evt.target.style.pointerEvents = "none";
    const targetCellRef = parseInt(evt.target.className);
    readyPlayerOne.placeShip(axis, targetCellRef, shipLength);
    setEventColor('red');
    if (axis === "Horizontal") {
      colorHorizontalShip(targetCellRef);
    } else {
      colorVerticalShip(targetCellRef);
    }
  }
  function colorHorizontalShip(targetCellRef:number) {
    if (shipLength === 4) {
      if (targetCellRef < 3) {
        topLeftPlacement();
      } else if (targetCellRef > 85) {
        bottomPlacement();
      }else if (targetCellRef % 10 === 6) {
        rightEdgePlacement()
      }else {
        normalPlacement();
      }
    } else if (shipLength === 3) {
      if (targetCellRef < 2) {
        topLeftPlacement();
      } else if (targetCellRef > 86) {
        bottomPlacement();
      }else if (targetCellRef % 10 === 7) {
        rightEdgePlacement()
      }else {
        normalPlacement();
      }
    }else {
      if (targetCellRef < 1) {
        topLeftPlacement();
      } else if (targetCellRef > 87) {
        bottomPlacement();
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
        gameCellRefs[0].current.style.pointerEvents = "none";
        gameCellRefs[1].current.style.pointerEvents = "none";
        gameCellRefs[2].current.style.pointerEvents = "none";
      }
    }
    function bottomPlacement() {
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
  function colorVerticalShip(targetCellRef:number) {
    if (shipLength === 4) {
      if (targetCellRef < 10) {
        topPlacement();
      } else if (targetCellRef > 50 ) {
        bottomPlacement();
      } else {
        normalPlacement();
      }
    } else if (shipLength === 3) {
      if (targetCellRef < 10) {
        topPlacement();
      } else if (targetCellRef > 60 ) {
        bottomPlacement();
      } else {
        normalPlacement();
      }
    }else {
      if (targetCellRef < 10) {
        topPlacement();
      } else if (targetCellRef > 70) {
        bottomPlacement();
      } else {
        normalPlacement();
      }
    }
    function normalPlacement() {
      for (let i=0; i < shipLength * 10; i+=10) {
        // Color i number squares to the right of click event
        gameCellRefs[targetCellRef + i ].current.style.background = "red";
        // Turn off cell under ship.
        gameCellRefs[targetCellRef + (shipLength * 10 + 10)].current.style.pointerEvents = "none";
        // Turn off square above boat. 
        gameCellRefs[targetCellRef - (10) ].current.style.pointerEvents = "none";
      }
    }
    function topPlacement() {
      for (let i=0; i < shipLength * 10; i+=10) {
        // Color i number squares to the right of click event
        gameCellRefs[targetCellRef + i ].current.style.background = "red";
        // Turn off cell under ship.
        gameCellRefs[targetCellRef + (shipLength * 10 + 10)].current.style.pointerEvents = "none";
      }
    }
    function bottomPlacement() {
      for (let i=0; i < shipLength * 10; i+=10) {
        // Color i number squares to the right of click event
        gameCellRefs[targetCellRef + i ].current.style.background = "red"; 
        // Turn off squares to left of boat equal to lenght of the boat. 
        gameCellRefs[targetCellRef - (10) ].current.style.pointerEvents = "none";
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
          setShipLength(shipLength - 1);
        } else {
          allThreeShipsPlaced.current = allThreeShipsPlaced.current + 1;
        }
    } else if (shipLength === 2) {
      setTimeout(startGame, 2000)
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
      ></div>);
  }
  return (
    <div className="game-board">
      {innerGridArr}
    </div>
  )
}

export default SetUpBoard;