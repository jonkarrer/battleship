// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Game {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  height: 100vh;\n  width: 100vw;\n}\n.game-grid {\n  display: grid;\n  grid-template-rows: auto auto auto;\n  height: 100%;\n  width: 90%;\n}\n.boat-count-cell {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-size: 25px;\n}\n.game-board-cell {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.user-game-board {\n  border: red solid thin;\n  height: 500px;\n  width: 500px;\n  z-index: 1;\n}\n.turn-tracker {\n  font-size: 25px;\n}\n.comp-game-board {\n  border: red solid thin;\n  height: 500px;\n  width: 500px;\n  z-index: 1;\n}\n.fire-cannons-cell {\n  font-size: 75px;\n  text-align: center;\n  z-index: 1;\n}\n.boat-1-game {\n  position: absolute;\n  bottom: 0;\n  right: 20px;\n}\n.boat-2-game {\n  position: absolute;\n  bottom: 0;\n  left: 20px;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}