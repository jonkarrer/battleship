# BattleShip Game

## Live preview

<https://github.com/jonkarrer/battleship#readme>

## Description

I am aware that React + Typescript is overkill for this project. I am using them to practice for large projects. This web-app is created to improve my Testing skills in Jest. This READ.MD will be used to describe the process, and some of the unique lessons I learned. Along with Jest, I want to improve my skills with React, Typescript, and Snowpack. I have never used Jest with React, so this may be a dense project.

## Create react with snopack development

1. install snowpack with typescript template

    ```bash
    npx create-snowpack-app battleship --template @snowpack/app-template-react-typescript
    ```

### Install git-hub, gh-pages, webpack

1. Set git-hub repository normally
2. Install gh-pages plugin

    ```bash
    npm install gh-pages
    ```

3. Install webpack plugin

    ```bash
    npm install --save-dev @snowpack/plugin-webpack
    ```

### Adjust package.json

1. check dependencies in package.json. "gh-pages" should appear
2. in global package.json add this line

    ```javascript
    "homepage": "http://jonkarrer.github.io/capstone-project" 
    ```

3. next add

    ```javascript
    "scripts": {
          "predeploy": "npx snowpack build",
          "deploy": "gh-pages -d build"
    }
    ```

### Adjust snowpack config

1. in snowpack config add

    ```javascript
        plugins: [
            '@snowpack/plugin-webpack'
        ],
        buildOptions: [
            baseUrl: '/capstone-project'.
        ]
    ```

2. Double check for all all dependencies.

### Deploy app to gh-pages

```bash
npm run deploy
```

### Set-up Jest with Typescript

1. Install jest, ts-jest, and @types/jest

    ```bash
    npm i jest -D
    npm i ts-jest -D
    npm i @types/jest -D
    ```

2. Check devDependencies for the 3 packages.
3. Change "test" under scripts to "jest".  

   ```javascript
        "scripts": {
        "test": "jest \"src/**/*.test.tsx\""
        }
    ```

4. Make a jest.config.js file and insert this

     ```javascript
        module.exports = {
            "roots": [
                "<rootDir>/src"
            ],
            "testMatch": [
                "**/__tests__/**/*.+(ts|tsx|js)",
                "**/?(*.)+(spec|test).+(ts|tsx|js)"
            ],
            "transform": {
                "^.+\\.(ts|tsx)$": "ts-jest"
            },
        }
    ```

## Creation Notes

### Create page swaps

1. Created a Context Api in the GameProvider.tsx file. Here is the snapshot

    ```javascript
        import React, {useContext, useState} from 'react'

        const GameContext = React.createContext(0); //Typescript forces an inital value
        const ChangeGameContext = React.createContext(()=>{})

        export const currentGameLevel = () => useContext(GameContext);
        export const changeGameLevel = () => useContext(ChangeGameContext);

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
    ```

2. I wrapped the index.tsx in the GameProvider element to give all children access to the values.

3. Each page is assigned a number. Home = 0, Setup = 1, Game = 2. These numbers are in the useState() hook.

4. useContext() captures the present values from the GameProvider, gameLevel and changeLevel and passes them to the children.

5. In App.tsx I use if/else statement to render the component I want. The default page is Home/0.

6. I use click functions in the children to call changeLevel. This will update the state and render the new page.

## Creating a Context API for Player.prototype for use in the SetUp component

1. In GameProvider.tsx we will initialize the context

    ```javascript
        const HumanPlayerContext = React.createContext(Player.prototype); 
        export const humanPlayer = () => useContext(HumanPlayerContext);
    ```

2. Initialized the new Player.prototype to pass the the .Provider value={}

    ```javascript
        const playerOne = new Player();
    ```

3. Then I wrapped the children prop with the HumanPlayerContext.Provider.

    ```javascript
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
    ```

4. Pull the context into the SetUp component and apply it.

    ```javascript
        import {changeGameLevel, humanPlayer} from '../GameProvider';
        const Setup: React.FC = () => {
            const readyPlayerOne:any = humanPlayer();
        for (let i=0; i < 90; i++) {
            gameBoardArr.push(
                <div key={i} onClick={() => {
                    readyPlayerOne.placeShip(shipPlacementAxis, i, 4);
                    }
                }>{i}</div>);
        }
    ```

5. !!! Super Important 'Gotcha' with useContext() hook. You HAVE to assign the context, humanPlayer(), to a variable inside the body of the funtion BEFORE using it. If not, a hook error will occur.

### Making the cells on the gameboard interactive

1. Made an empty array, innerGridArr

2. Made a loop that pushed div elements into array.

3. Each div element was assigned multiple attributes to be used in the gameBoard component logic.

    ```javascript
        const innerGridArr: Array<JSX.Element> = [];
        for (let i=0; i < 90; i++) {
            innerGridArr.push(
            <div 
                className={`${i}`} 
                ref= {gameCellRefs[i]}
                onClick={placeShipOnTarget}
                onMouseOut={mouseLeaveCell} 
                onMouseEnter={mouseEnterCell} 
                key={i} 
            ></div>);
        }
    ```

4. I then put the array in JSX to render in browser.

    ```javascript
        return (
            <div className="game-board">
            {innerGridArr}
            </div>
        )
    ```

### Setting up 90 useRef() hooks on game cells

1. Made an empty array, then assigned each index a useRef(0)

    ```javascript
        const gameCellRefs: Array<any> = [];
        for (let n = 0; n < 90; n++) {
            gameCellRefs[n] = useRef(0);
        }
    ```

2. This aligned with my innerGridArr. Now each innerGridArr element has a ref equal to one index in my gameCellRefs array.

3. The reason for this is to access each cell individually when the user interacts with the board.

### Ship hover effect on board

1. I utilized the mouseEnter and mouseOut event handlers in react.

2. I wanted the cursor to be the "left end" of the ship being placed. The target of the cursor has a reference number. I used that to acces the properties of the element.

3. onMouseEnter - From the cursor, target reference number, I added a loop that colored all cells to the right of the cursor.

4. onMouseOut - The logic was flipped to turn those cells back to original grey color. This creates the hover effect.

### Ship placement horizontal logic

1. I needed the target squares to permantly show a ship has been placed.

2. I utilized the onClick event in React.

3. This click event does alot of heavy lifting. I needed to talk to my back end and I needed to visually show the ship placement.

    ```javascript
        const placeShipOnTarget = (evt:any) => {
            evt.target.style.pointerEvents = "none";
            const targetCellRef = parseInt(evt.target.className);

            readyPlayerOne.placeShip(axis, targetCellRef, shipLength);

            colorInShipOnBoard(targetCellRef);
            setEventColor('red'); //Place red ship
        }
    ```

4. First I needed to disable the event listeners so mouseEnter and mouseOut would not affect the permanent placement.

5. Second I needed to tell my back end logic that a ship has been placed. The backed needs the axis, a useState() value, the target cell, and how long the ship is, another useState() value. Refer to playerFactory.ts.

6. Third I needed to color in where the ship has been placed. I passed the clicked cell to that function.

7. Lastly I needed to change the state of the event color. Why? I had conflicts with mouseOut event coloring the ships back to grey. I clicked, then moved the mouse and the color would change. This changes the mouseOut color to the color I needed the placed ship to be so it does not change to grey.

### Make an algorithm for the computer attack

1. The computer needs to take a random number from player board and send attack.

2. The attack cannot be one that has already been taken. This would cause a double shot.

3. Here is the solution I developed

    ```javascript
        function attackMaker() {
            let randomCoord:number = Math.floor(Math.random() * 89);
            const checkAttack = () => {
                for (let coord of readyPlayerOne.humanBoard.missedShotsTracker) {
                    if (randomCoord != coord) {
                        continue
                    } else {
                    randomCoord =  Math.floor(Math.random() * 89);
                        checkAttack();
                    }
                }
            }
            checkAttack();
            return randomCoord;
        }
    ```

4. The randomCoord is then used in the comuterTurn funtion to apply the attack properly.

### For later

1. Make computer smarter

2. Bug test
