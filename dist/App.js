import React from "../_snowpack/pkg/react.js";
import Home from "./Home/Home.js";
import Setup from "./Setup/Setup.js";
import Game from "./Game/Game.js";
import EndGame from "./EndGame/EndGame.js";
import {currentGameLevel} from "./GameProvider.js";
function App() {
  const contextGameLevel = currentGameLevel();
  if (contextGameLevel === 0) {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Home, null));
  } else if (contextGameLevel === 1) {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Setup, null));
  } else if (contextGameLevel === 2) {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Game, null));
  } else {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(EndGame, null));
  }
}
export default App;
