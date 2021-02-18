// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Setup {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  height: 100vh;\n  width: 100vw;\n}\n.setup-grid {\n  display: grid;\n  grid-template-rows: auto auto;\n  height: 100%;\n  width: 90vw;\n}\n.game-cell-flex {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.game-board {\n  border: red solid thin;\n  height: 500px;\n  width: 500px;\n  z-index: 1;\n}\n.boat-selection {\n  border: red solid thin;\n  height: 500px;\n  width: 500px;\n  z-index: 1;\n}\n.placeships-cell {\n  font-size: 75px;\n  text-align: center;\n  z-index: 1;\n}\n.boat-1-setup {\n  position: absolute;\n}\n.boat-2-setup {\n  position: absolute;\n  top: 0;\n  right: 20px;\n}\n.boat-2-setup img {\n  height: 250px;\n  width: 250px;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}