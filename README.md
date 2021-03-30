# Game of Life: Developer Edition

Welcome to the Game of Life with a twist! In this edition, we will discover the world of web development. This multiplayer game accepts up to four players. Each player starts at the same point and moves forward on the board using the 'spin' button on their board. A player can only spin within their turn. The player with the highest 'bank accout + life tiles' wins.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command             | Description                                                                     |
| ------------------- | ------------------------------------------------------------------------------- |
| `npm install`       | Install project dependencies                                                    |
| `npm run start-dev` | Build project and open web server running project                               |
| `npm run build`     | Builds code bundle with production settings (minification, uglification, etc..) |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm run start-dev`.

After starting the development server with `npm run start-dev`, you can edit any files in your project and webpack will automatically recompile and reload your server (available at `http://localhost:8080` by default).

## Customizing the Template

### Babel

You can write modern ES6+ JavaScript and Babel will transpile it to a version of JavaScript that you want your project to support. The targeted browsers are set in the `.babelrc` file and the default currently targets all browsers with total usage over "0.25%" but excludes IE11 and Opera Mini.

```
"browsers": [
 ">0.25%",
 "not ie 11",
 "not op_mini all"
]
```

### Webpack

If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can modify the `webpack.config.js` file for cross-project changes.

## Deploying Code

After you run the `npm run start-dev` command, your code will be built into a single bundle located at `dist/bundle.min.js` along with any other assets you project depended.

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://mycoolserver.com`), you should be able to open `http://mycoolserver.com/index.html` and play your game.
