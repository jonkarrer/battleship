# BattleShip Game

## Summary

I am aware that React + Typescript is overkill for this project. I am using them to practice for large projects. This web-app is created to improve my Testing skills in Jest. This READ.MD will be used to describe the process, and some of the unique lessons I learned. Along with Jest, I want to improve my skills with React, Typescript, and Snowpack. I have never used Jest with React, so this may be a dense project.

## Create react with snopack development

1. install snowpack with typescript template

    ```bash
    npx create-snowpack-app react-snowpack --template @snowpack/app-template-react-typescript
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
