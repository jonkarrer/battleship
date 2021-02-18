import React from 'react';
import ReactDOM from 'react-dom';
import {GameProvider} from './GameProvider';
import App from './App';
import './index.css';

ReactDOM.render(
  <GameProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GameProvider>,
  document.getElementById('root'),
);

if (import.meta.hot) {
  import.meta.hot.accept();
}
