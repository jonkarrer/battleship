import React, {useContext, useState} from 'react';
import Player from './factories/playerFactory';

//Game Flow Control
const HumanPlayerContext = React.createContext(Player.prototype); 
export const humanPlayer = () => useContext(HumanPlayerContext);

//Change Game Level
const GameContext = React.createContext(0);
const ChangeGameContext = React.createContext(()=>{})
export const currentGameLevel = () => useContext(GameContext);
export const changeGameLevel = () => useContext(ChangeGameContext);

interface GameProps {
  children: any;
}
const playerOne = new Player();

export const GameProvider = ({children}:GameProps) => {
  const [gameLevel, setGameLevel] = useState(0);
  const changeLevel = () => setGameLevel(gameLevel + 1);
  return (
    <div>
      <GameContext.Provider value={gameLevel}>
        <ChangeGameContext.Provider value={changeLevel}>
          <HumanPlayerContext.Provider value={playerOne}>
            {children}
          </HumanPlayerContext.Provider>
        </ChangeGameContext.Provider>
      </GameContext.Provider>
    </div>
  )
}