import React from "../../_snowpack/pkg/react.js";
import GameBoard from "./GameBoard.js";
import "./Game.css.proxy.js";
const Game = () => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "Game"
  }, /* @__PURE__ */ React.createElement("section", {
    className: "game-grid"
  }, /* @__PURE__ */ React.createElement(GameBoard, null), /* @__PURE__ */ React.createElement("div", {
    className: "fire-cannons-cell"
  }, "Fire Cannons")), /* @__PURE__ */ React.createElement("div", {
    className: "boat-1-game"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "./assets/2.jpg",
    alt: "boat"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "boat-2-game"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "./assets/5.jpg",
    alt: "boat"
  })));
};
export default Game;
