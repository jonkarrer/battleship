import React from 'react';
import Home from './Home/Home';
import Setup from './Setup/Setup';
import Game from './Game/Game';
import './App.css';

interface AppProps {}

function App({}: AppProps) {

  return (
    <div className="App">
      <Home />
      <Setup />
      <Game />
    </div>
  );
}

export default App;
