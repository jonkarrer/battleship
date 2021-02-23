import React from 'react';
import Home from './Home/Home';
import Setup from './Setup/Setup';
import Game from './Game/Game';
import {currentGameLevel} from './GameProvider';


interface AppProps {}
function App({}: AppProps) {
  if(currentGameLevel() === 0) {
    return (
      <div>
        <Home />
      </div>
    )
  } else if (currentGameLevel() === 1) {
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
