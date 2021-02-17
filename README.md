# BattleShip Game

## Summary

This web-app is created to improve my Testing skills in Jest. This READ.MD will be used to describe the process, and some of the unique lessons I learned. Along with Jest, I want to improve my skills with React, Typescript, and Snowpack. I have never used Jest with React, so this may be a dense project.

## Create react with snopack development

1. install snowpack with typescript template

    ```bash
    npx create-snowpack-app react-snowpack --template @snowpack/app-template-react-typescript
    ```

## Install git-hub, gh-pages, webpack

1. Set git-hub repository normally
2. Install gh-pages plugin

    ```bash
    npm install gh-pages
    ```

3. Install webpack plugin

    ```bash
    npm install --save-dev @snowpack/plugin-webpack
    ```

## Adjust package.json

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

## Adjust snowpack config

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

## Deploy app to gh-pages

```bash
npm run deploy
```

## Set-up Jest with Typescript

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

### npm test

Launches the application test runner.
Run with the `--watch` flag (`npm test -- --watch`) to run in interactive watch mode.
