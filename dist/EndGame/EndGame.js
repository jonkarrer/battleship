import React from "../../_snowpack/pkg/react.js";
import "./EndGame.css.proxy.js";
import {gameWinner} from "../GameProvider.js";
const EndGame = () => {
  const winner = gameWinner();
  return /* @__PURE__ */ React.createElement("div", {
    className: "EndGame"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "winner"
  }, " ", winner, " won "), /* @__PURE__ */ React.createElement("div", {
    className: "reset-button",
    onClick: () => window.location.reload()
  }, "Reset"));
};
export default EndGame;
