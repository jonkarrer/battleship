import React from 'react';
import Home from './Home/Home';
import Setup from './Setup/Setup';
import Game from './Game/Game';
import {currentGameLevel} from './GameProvider';


interface AppProps {}
function App({}: AppProps) {
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
  } else {
    return (
      <div>
        <Game />
      </div>
    );
  }
  
}

export default App;
