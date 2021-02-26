// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".EndGame {\n  height: 100vh;\n  width: 100vw;\n  background: black;\n  position: absolute;\n  z-index: 5;\n  left: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n}\n.winner {\n  font-size: 6em;\n  padding-bottom: 50px;\n}\n.reset-button {\n  font-size: 4em;\n  border: red solid thin;\n  padding: 20px;\n}\n.reset-button:hover {\n  cursor:pointer;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}