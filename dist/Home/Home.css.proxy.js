// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Home {\n  display: flex;\n  justify-content: center;\n  align-items: flex-end;\n  position: relative;\n  height: 100vh;\n  width: 100vw;\n}\n.home-menu-grid {\n  display: grid;\n  grid-template-rows: 25% 25% auto;\n  height: 80vh;\n}\n.new-game-cell {\n  font-size: 45px;\n  text-align: center;\n  z-index: 1;\n}\n.rules-cell {\n  font-size: 45px;\n  text-align: center;\n  z-index: 1;\n}\n.new-game-cell, .rules-cell:hover {\n  cursor: pointer;\n}\n.battleship-cell {\n  font-size: 75px;\n  text-align: center;\n  z-index: 1;\n}\n.source-code-link a {\n  position: absolute;\n  text-decoration: none;\n  top: 0;\n  right: 20px;\n  font-size: 30px;\n  color: grey;\n}\n.boat-1-homepage {\n  position: absolute;\n  left: 0;\n}\n.boat-2-homepage {\n  position: absolute;\n  left: 30%;\n  top: 0;\n}\n.boat-2-homepage img {\n  height: 200px;\n  width: 200px;\n}\n.boat-3-homepage {\n  position: absolute;\n  right: 0;\n  top: 10%;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}