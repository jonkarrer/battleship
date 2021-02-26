import React, {useState} from "../../_snowpack/pkg/react.js";
import GameBoard from "./SetUpBoard.js";
import "./Setup.css.proxy.js";
const Setup = () => {
  const [shipPlacementAxis, setAxis] = useState("Horizontal");
  return /* @__PURE__ */ React.createElement("div", {
    className: "Setup"
  }, /* @__PURE__ */ React.createElement("section", {
    className: "setup"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "game-cell"
  }, /* @__PURE__ */ React.createElement(GameBoard, null)), /* @__PURE__ */ React.createElement("div", {
    className: "placeships-cell"
  }, "Place Ships")), /* @__PURE__ */ React.createElement("div", {
    className: "boat-1-setup"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "./assets/4.jpg",
    alt: "boat"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "boat-2-setup"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "./assets/5.jpg",
    alt: "boat"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "boat-3-setup"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "./assets/2.jpg",
    alt: "boat"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "boat-4-setup"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "./assets/3.jpg",
    alt: "boat"
  })));
};
export default Setup;
