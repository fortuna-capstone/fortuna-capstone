import 'phaser';

import firebase from 'firebase/app';
import 'firebase/database';

import {
  Board,
  HexagonGrid,
  QuadGrid,
} from 'phaser3-rex-plugins/plugins/board-components.js';

export default class GameScene extends Phaser.Scene {
  constructor(scene) {
    super('Game');
  }

  preload() {
    // load images
  }

  create() {
    // const dbRefObject = firebase.database().ref().child('HOUSES');
    // dbRefObject.on('value', (snap) => console.log(snap.val()));

    // firebase
    //   .database()
    //   .ref()
    //   .child('Houses')
    //   .child('Fancy House')
    //   .get()
    //   .then(function (snapshot) {
    //     console.log('THIS IS THE FANCY HOUSE', snapshot.val());
    //   });

    // CREATING BOARD
    // 0: red
    // 1: orange
    // 2: life
    // 3: green
    const tiles = [
      '111    ',
      '2 2   0',
      '1 032 1',
      '2 2 1 3',
      '011 1 2',
      '    112',
      '       ',
    ];

    const COLORMAP = [0xff0000, 0xffa500, 0xffc0cb, 0x00cc00];

    let gridded = {
      grid: {
        gridType: 'quadGrid',
        x: 130,
        y: 30,
        cellWidth: 60,
        cellHeight: 60,
        type: 'orthogonal',
      },
      width: 7,
      height: 7,
    };

    const board = this.rexBoard.add.board(gridded);

    for (let tileX = 0; tileX < board.width; tileX++) {
      for (let tileY = 0; tileY < board.height; tileY++) {
        let symbol = tiles[tileX][tileY];
        if (symbol === ' ') {
          continue;
        }
        let cost = 1;
        if (symbol === '0') {
          cost = 0;
        }
        this.rexBoard.add
          .shape(board, tileY, tileX, 0, COLORMAP[symbol])
          .setStrokeStyle(1, 0xffffff, 1).setData('cost', cost);
      }
    }

    let gameObj = this.add.circle(0, 0, 10, 0x000000);
    board.addChess(gameObj, 0, 4, 2);

    gameObj.monopoly = this.rexBoard.add.monopoly(gameObj, {
      face: 3,
      pathTileZ: 0,
      costCallback: function(curTileXY, preTileXY, monopoly) {
        const board = monopoly.board;
        return board.tileXYZToChess(curTileXY.x, curTileXY.y, 0).getData('cost');
      }
    })

    gameObj.moveTo = this.rexBoard.add.moveTo(gameObj);

    const path = gameObj.monopoly.getPath(20);

    const moveAlongPath = path => {
      if (!path.length) {
          return;
      }
      let tile = path.shift();
      gameObj.moveTo.moveTo(tile);
      if (!tile.cost) {
        return;
      }
      gameObj.moveTo.once('complete', () => {
        moveAlongPath(path);
      }, gameObj);
      gameObj.monopoly.setFace(gameObj.moveTo.destinationDirection);
      return gameObj;
    }

    moveAlongPath(path)

  }
}
