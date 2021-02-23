import React, {useContext, useState} from 'react'
import Ship from './factories/shipFactory';
import GameBoard from './factories/gameBoardFactory';
import Player from './factories/playerFactory';
import Computer from './factories/computerFactory';

//Game Flow Control
const HumanPlayerContext = React.createContext(Player.prototype);
const ComputerPlayerContext = React.createContext(Computer.prototype);
export const humanPlayer = () => useContext(HumanPlayerContext);
export const computerPlayer = () => useContext(ComputerPlayerContext);
//Change Game Level
const GameContext = React.createContext(0);
const ChangeGameContext = React.createContext(()=>{})
export const currentGameLevel = () => useContext(GameContext);
export const changeGameLevel = () => useContext(ChangeGameContext);

interface GameProps {
  children: any;
}
const playerOne = new Player();
const playerTwo = new Computer();
playerOne.initHumanPlayer();
playerTwo.initComputerPlayer();

export const GameProvider = ({children}:GameProps) => {
 

  const [gameLevel, setGameLevel] = useState(0);
  const changeLevel = () => setGameLevel(gameLevel + 1);
  return (
    <div>
      <GameContext.Provider value={gameLevel}>
        <ChangeGameContext.Provider value={changeLevel}>
          <HumanPlayerContext.Provider value={playerOne}>
            <ComputerPlayerContext.Provider value={playerTwo}>
              {children}
            </ComputerPlayerContext.Provider>
          </HumanPlayerContext.Provider>
        </ChangeGameContext.Provider>
      </GameContext.Provider>
    </div>
  )
}