import React, {useRef, useEffect} from "../../_snowpack/pkg/react.js";
import Computer from "../factories/computerFactory.js";
import {humanPlayer, changeGameLevel, changeGameWinner} from "../GameProvider.js";
const ComputerBoard = () => {
  let endGame = changeGameLevel();
  let winner = changeGameWinner();
  let readyPlayerOne = humanPlayer();
  let compTurnOverlay = useRef(0);
  let playerTurnOverlay = useRef(0);
  const playerCellRefs = [];
  for (let n = 0; n < 90; n++) {
    playerCellRefs[n] = useRef(0);
  }
  ;
  const computerCellRefs = [];
  for (let n = 0; n < 90; n++) {
    computerCellRefs[n] = useRef(0);
  }
  ;
  let computerPlayer;
  useEffect(() => {
    computerPlayer = new Computer();
    computerPlayer.initComputerPlayer();
  });
  const humanTurn = (evt) => {
    const targetCellRef = parseInt(evt.target.className);
    let humanAttack = computerPlayer.computerBoard.receiveAttack(targetCellRef);
    humanAttack;
    if (humanAttack === "hit") {
      computerCellRefs[targetCellRef].current.style.background = "red";
    } else {
      computerCellRefs[targetCellRef].current.style.background = "green";
      setTimeout(() => {
        compTurnOverlay.current.style.display = "flex";
        playerTurnOverlay.current.style.display = "none";
      }, 200);
      setTimeout(computerTurn, 1e3);
    }
    ;
    countSunkComputerShips();
  };
  function countSunkComputerShips() {
    let computerShipCount = computerPlayer.computerBoard.countSunkShips();
    computerShipCount;
    if (computerShipCount === true) {
      endGame();
    }
    ;
  }
  function computerAttackMaker() {
    let randomCoord = Math.floor(Math.random() * 89);
    const checkAttack = () => {
      for (let coord of readyPlayerOne.humanBoard.missedShotsTracker) {
        if (randomCoord != coord) {
          continue;
        } else {
          randomCoord = Math.floor(Math.random() * 89);
          checkAttack();
        }
        ;
      }
      ;
    };
    checkAttack();
    return randomCoord;
  }
  function computerTurn() {
    const randomCoordinate = computerAttackMaker();
    if (readyPlayerOne.humanBoard.receiveAttack(randomCoordinate) === "hit") {
      playerCellRefs[randomCoordinate].current.style.background = "red";
      setTimeout(computerTurn, 1e3);
    } else {
      playerCellRefs[randomCoordinate].current.style.background = "green";
      setTimeout(() => {
        compTurnOverlay.current.style.display = "none";
        playerTurnOverlay.current.style.display = "flex";
      }, 1e3);
    }
    ;
    countSunkPlayerShips();
  }
  function countSunkPlayerShips() {
    let playerShipCount = readyPlayerOne.humanBoard.countSunkShips();
    playerShipCount;
    if (playerShipCount) {
      winner();
      endGame();
    }
    ;
  }
  const playerBoardCells = [];
  for (let i = 0; i < 90; i++) {
    playerBoardCells.push(/* @__PURE__ */ React.createElement("div", {
      className: `${i}`,
      key: i,
      ref: playerCellRefs[i]
    }));
  }
  const computerBoardCells = [];
  for (let i = 0; i < 90; i++) {
    computerBoardCells.push(/* @__PURE__ */ React.createElement("div", {
      className: `${i}`,
      ref: computerCellRefs[i],
      onClick: humanTurn,
      key: i
    }));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "game-board-cell"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "user-game-board"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "player-turn-overlay",
    ref: playerTurnOverlay
  }, "Your Turn"), playerBoardCells), /* @__PURE__ */ React.createElement("div", {
    className: "comp-game-board"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "computer-turn-overlay",
    ref: compTurnOverlay
  }, "Computer Turn"), computerBoardCells)));
};
export default ComputerBoard;
