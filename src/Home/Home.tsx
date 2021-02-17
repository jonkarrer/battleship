import React from 'react'
import './Home.css'

 const Home: React.FC = () => {
  return (
    <div className="Home">
      <section className="home-menu-grid">
        <div className="new-game-cell"><h2>New Game</h2></div>
        <div className="rules-cell"><h2>Rules</h2></div>
        <div className="battleship-cell"><h1>BattleShip</h1></div>
      </section>
      <div className="boat-1-homepage"><img src="./assets/1.jpg" alt="boat"/></div>
      <div className="boat-2-homepage"><img src="./assets/2.jpg" alt="boat"/></div>
      <div className="boat-3-homepage"><img src="./assets/3.jpg" alt="boat"/></div>
      <div className="source-code-link">
        <a href="https://github.com/jonkarrer/battleship">Source Code</a>
      </div>
    </div>
  )
}
export default Home;