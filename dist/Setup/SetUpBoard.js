import React, {useState, useRef, useEffect} from "../../_snowpack/pkg/react.js";
import {humanPlayer, changeGameLevel} from "../GameProvider.js";
const SetUpBoard = () => {
  const startGame = changeGameLevel();
  const readyPlayerOne = humanPlayer();
  const [eventHoverColor, setEventColor] = useState("rgba(100, 100, 100, .6)");
  const [shipLength, setShipLength] = useState(4);
  const gameCellRefs = [];
  for (let n = 0; n < 90; n++) {
    gameCellRefs[n] = useRef(0);
  }
  useEffect(() => {
    function turnOffCellsOnEdgeOfBoard() {
      if (shipLength === 4) {
        for (let i = 7; i < 90; i += 10) {
          gameCellRefs[i].current.style.pointerEvents = "none";
        }
        for (let i = 8; i < 90; i += 10) {
          gameCellRefs[i].current.style.pointerEvents = "none";
        }
        for (let i = 9; i < 90; i += 10) {
          gameCellRefs[i].current.style.pointerEvents = "none";
        }
      } else if (shipLength === 3) {
        for (let i = 7; i < 90; i += 10) {
          gameCellRefs[i].current.style.pointerEvents = "auto";
        }
      } else if (shipLength === 2) {
        for (let i = 8; i < 90; i += 10) {
          gameCellRefs[i].current.style.pointerEvents = "auto";
        }
        ;
      }
      ;
    }
    ;
    turnOffCellsOnEdgeOfBoard();
  }, [shipLength]);
  const mouseEnterCell = (evt) => {
    const targetCellRef = parseInt(evt.target.className);
    if (gameCellRefs[targetCellRef].current.style.background === "red") {
      return;
    } else {
      for (let i = 0; i < shipLength; i++) {
        gameCellRefs[targetCellRef + i].current.style.background = "green";
      }
      ;
    }
    ;
  };
  const mouseLeaveCell = (evt) => {
    const targetCellRef = parseInt(evt.target.className);
    setEventColor("rgba(100, 100, 100, .6)");
    if (gameCellRefs[targetCellRef].current.style.background === "red") {
      return;
    } else {
      evt.target.style.background = eventHoverColor;
      for (let i = 0; i < shipLength; i++) {
        gameCellRefs[targetCellRef + i].current.style.background = eventHoverColor;
      }
    }
  };
  const placeShipOnTarget = (evt) => {
    evt.target.style.pointerEvents = "none";
    const targetCellRef = parseInt(evt.target.className);
    readyPlayerOne.placeShip(targetCellRef, shipLength);
    colorInShipOnBoard(targetCellRef);
    setEventColor("red");
  };
  function colorInShipOnBoard(targetCellRef) {
    if (shipLength === 4) {
      if (targetCellRef < 3) {
        topLeftPlacement();
      } else if (targetCellRef > 85) {
        bottomRightPlacement();
      } else if (targetCellRef % 10 === 6) {
        rightEdgePlacement();
      } else {
        normalPlacement();
      }
    } else if (shipLength === 3) {
      if (targetCellRef < 2) {
        topLeftPlacement();
      } else if (targetCellRef > 86) {
        bottomRightPlacement();
      } else if (targetCellRef % 10 === 7) {
        rightEdgePlacement();
      } else {
        normalPlacement();
      }
    } else {
      if (targetCellRef < 1) {
        topLeftPlacement();
      } else if (targetCellRef > 87) {
        bottomRightPlacement();
      } else if (targetCellRef % 10 === 8) {
        rightEdgePlacement();
      } else {
        normalPlacement();
      }
    }
    function normalPlacement() {
      for (let i = 0; i < shipLength; i++) {
        gameCellRefs[targetCellRef + i].current.style.background = "red";
        gameCellRefs[targetCellRef + i].current.style.pointerEvents = "none";
        gameCellRefs[targetCellRef + (i + 1)].current.style.pointerEvents = "none";
        gameCellRefs[targetCellRef - i].current.style.pointerEvents = "none";
      }
    }
    function topLeftPlacement() {
      for (let i = 0; i < shipLength; i++) {
        gameCellRefs[targetCellRef + i].current.style.background = "red";
        gameCellRefs[targetCellRef + i].current.style.pointerEvents = "none";
        gameCellRefs[targetCellRef + (i + 1)].current.style.pointerEvents = "none";
        gameCellRefs[0].current.style.pointerEvents = "none";
        gameCellRefs[1].current.style.pointerEvents = "none";
        gameCellRefs[2].current.style.pointerEvents = "none";
        gameCellRefs[3].current.style.pointerEvents = "none";
      }
    }
    function bottomRightPlacement() {
      for (let i = 0; i < shipLength; i++) {
        gameCellRefs[targetCellRef + i].current.style.background = "red";
        gameCellRefs[targetCellRef - i].current.style.pointerEvents = "none";
      }
    }
    function rightEdgePlacement() {
      for (let i = 0; i < shipLength; i++) {
        gameCellRefs[targetCellRef + i].current.style.background = "red";
        gameCellRefs[targetCellRef - i].current.style.pointerEvents = "none";
      }
    }
    reduceShipLength();
  }
  let controlWholeBoard = useRef(0);
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
      controlWholeBoard.current.style.display = "flex";
      setTimeout(startGame, 2e3);
    }
  }
  const innerGridArr = [];
  for (let i = 0; i < 90; i++) {
    innerGridArr.push(/* @__PURE__ */ React.createElement("div", {
      className: `${i}`,
      ref: gameCellRefs[i],
      onClick: placeShipOnTarget,
      onMouseOut: mouseLeaveCell,
      onMouseEnter: mouseEnterCell,
      key: i
    }));
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "game-board"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "startGame",
    ref: controlWholeBoard
  }, "Starting Game"), innerGridArr);
};
export default SetUpBoard;
