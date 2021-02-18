import React, {useContext, useState} from 'react'

const GameContext = React.createContext(0);
const ChangeGameContext = React.createContext(()=>{})
interface GameProps {
  children: any;
}
export const GameProvider = ({children}:GameProps) => {
  const [gameLevel, setGameLevel] = useState(0);
  const changeLevel = () => setGameLevel(gameLevel + 1);
  return (
    <div>
      <GameContext.Provider value={gameLevel}>
        <ChangeGameContext.Provider value={changeLevel}>
        {children}
        </ChangeGameContext.Provider>
      </GameContext.Provider>
    </div>
  )
}
