import React from 'react';
import Home from './Home/Home'
import Setup from './Setup/Setup'
import './App.css';

interface AppProps {}

function App({}: AppProps) {
 
  return (
    <div className="App">
      <Home />
      <Setup />
    </div>
  );
}

export default App;
