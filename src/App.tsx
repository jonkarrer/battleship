import React from 'react';
import Home from './Home/Home';
import Setup from './Setup/Setup';
import Game from './Game/Game';
import EndGame from './EndGame/EndGame';
import {currentGameLevel} from './GameProvider';

function App() {
  const contextGameLevel = currentGameLevel();
  if(contextGameLevel === 0) {
    return (
      <div>
        <Home />
      </div>
    )
  } else if (contextGameLevel === 1) {
    return (
      <div>
        <Setup />
      </div>
    )
  } else if (contextGameLevel === 2) {
    return (
      <div>
        <Game />
      </div>
    );
  } else {
    return (
      <div>
        <EndGame />
      </div>
    )
  }
  
}

export default App;
