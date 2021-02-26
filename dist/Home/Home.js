import React from "../../_snowpack/pkg/react.js";
import {changeGameLevel} from "../GameProvider.js";
import "./Home.css.proxy.js";
const Home = () => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "Home"
  }, /* @__PURE__ */ React.createElement("section", {
    className: "home-menu-grid"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "new-game-cell",
    onClick: changeGameLevel()
  }, /* @__PURE__ */ React.createElement("h2", null, "New Game")), /* @__PURE__ */ React.createElement("div", {
    className: "rules-cell"
  }, /* @__PURE__ */ React.createElement("h2", null, "Rules")), /* @__PURE__ */ React.createElement("div", {
    className: "battleship-cell"
  }, /* @__PURE__ */ React.createElement("h1", null, "BATTLESHIP"))), /* @__PURE__ */ React.createElement("div", {
    className: "boat-1-homepage"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "./assets/1.jpg",
    alt: "boat"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "boat-2-homepage"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "./assets/2.jpg",
    alt: "boat"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "boat-3-homepage"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "./assets/3.jpg",
    alt: "boat"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "source-code-link"
  }, /* @__PURE__ */ React.createElement("a", {
    href: "https://github.com/jonkarrer/battleship"
  }, "Source Code")));
};
export default Home;
