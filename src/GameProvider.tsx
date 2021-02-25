import React, {useContext, useState} from 'react';
import Player from './factories/playerFactory';

const HumanPlayerContext = React.createContext(Player.prototype); 
export const humanPlayer = () => useContext(HumanPlayerContext);

//Change Game Level
const GameContext = React.createContext(0);
const ChangeGameContext = React.createContext(()=>{})
export const currentGameLevel = () => useContext(GameContext);
export const changeGameLevel = () => useContext(ChangeGameContext);

//Decalre winner
const WinnerContext = React.createContext('You');
const ChangeGameWinner = React.createContext(()=>{});
export const gameWinner = () => useContext(WinnerContext);
export const changeGameWinner = () => useContext(ChangeGameWinner);
const playerOne = new Player();

interface GameProps {
  children: any;
}
export const GameProvider = ({children}:GameProps) => {
  const [gameLevel, setGameLevel] = useState(0);
  const [winningPlayer, setWinner] = useState("You");
  const changeLevel = () => setGameLevel(gameLevel + 1);
  const changeWinner = () => setWinner('Computer');
  return (
    <div>
      <GameContext.Provider value={gameLevel}>
        <ChangeGameContext.Provider value={changeLevel}>
          <HumanPlayerContext.Provider value={playerOne}>
            <WinnerContext.Provider value={winningPlayer}>
              <ChangeGameWinner.Provider value={changeWinner}>
                {children}
              </ChangeGameWinner.Provider>
            </WinnerContext.Provider>
          </HumanPlayerContext.Provider>
        </ChangeGameContext.Provider>
      </GameContext.Provider>
    </div>
  )
}