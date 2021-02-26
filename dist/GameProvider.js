import React, {useContext, useState} from "../_snowpack/pkg/react.js";
import Player from "./factories/playerFactory.js";
const HumanPlayerContext = React.createContext(Player.prototype);
export const humanPlayer = () => useContext(HumanPlayerContext);
const GameContext = React.createContext(0);
const ChangeGameContext = React.createContext(() => {
});
export const currentGameLevel = () => useContext(GameContext);
export const changeGameLevel = () => useContext(ChangeGameContext);
const WinnerContext = React.createContext("You");
const ChangeGameWinner = React.createContext(() => {
});
export const gameWinner = () => useContext(WinnerContext);
export const changeGameWinner = () => useContext(ChangeGameWinner);
const playerOne = new Player();
export const GameProvider = ({children}) => {
  const [gameLevel, setGameLevel] = useState(0);
  const [winningPlayer, setWinner] = useState("You");
  const changeLevel = () => setGameLevel(gameLevel + 1);
  const changeWinner = () => setWinner("Computer");
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(GameContext.Provider, {
    value: gameLevel
  }, /* @__PURE__ */ React.createElement(ChangeGameContext.Provider, {
    value: changeLevel
  }, /* @__PURE__ */ React.createElement(HumanPlayerContext.Provider, {
    value: playerOne
  }, /* @__PURE__ */ React.createElement(WinnerContext.Provider, {
    value: winningPlayer
  }, /* @__PURE__ */ React.createElement(ChangeGameWinner.Provider, {
    value: changeWinner
  }, children))))));
};
