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

    const tiles = [
      '111 11 111',
      '000 00 000',
      '111 11 111',
      '000 00 000',
      '111 11 111',
      '000 00 000',
      '111 11 111',
      '000 00 000',
      '111 11 111',
      '000 00 000',
    ];

    let gridded = {
      grid: {
        gridType: 'quadGrid',
        x: 130,
        y: 30,
        cellWidth: 60,
        cellHeight: 60,
        type: 'orthogonal',
      },
      width: 10,
      height: 10,
      randomValue: 'TEST',
    };

    // const board = new Board(this, gridded);

    const board = this.rexBoard.add.board(gridded);
    console.log('BOARD', board);

    for (let i = 0; i < board.width; i++) {
      for (let j = 0; j < board.height; j++) {
        let number = tiles[i][j];
        let color;
        if (number === '1') {
          color = 0xffc0cb;
        } else if (number === '0') {
          color = 0x4caf50;
        } else {
          color = 0xdddddd;
        }
        this.rexBoard.add
          .shape(board, j, i, 0, color)
          .setStrokeStyle(1, 0xffffff, 1);
      }
    }

    // this.rexBoard.add.shape(board, 0xffc0cb);

    // board.addChess();
  }
}
