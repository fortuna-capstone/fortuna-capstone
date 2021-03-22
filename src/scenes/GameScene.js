import 'phaser';

import firebase from 'firebase/app';
import 'firebase/database';

import {
  Board,
  HexagonGrid,
  QuadGrid,
} from 'phaser3-rex-plugins/plugins/board-components.js';

import { io } from 'socket.io-client';
export default class GameScene extends Phaser.Scene {
  constructor(scene) {
    super('Game');
  }

  preload() {
    // load images
  }

  create() {
    this.socket = io('http://localhost:8080');
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

    for (let i = 0; i < board.width; i++) {
      for (let j = 0; j < board.height; j++) {
        let number = tiles[i][j];
        let color;
        if (number === '0') {
          color = 0xff0000;
        } else if (number === '1') {
          color = 0xffa500;
        } else if (number === '2') {
          color = 0xffc0cb;
        } else if (number === '3') {
          color = 0x00cc00;
        } else {
          continue;
        }
        this.rexBoard.add
          .shape(board, j, i, 1, color)
          .setStrokeStyle(1, 0xffffff, 1);
      }
    }

    // const board = new Board(this, gridded);
    let gameObj = this.add.circle(0, 0, 10, 0x000000);
    let chess = board.addChess(gameObj, 0, 4, 2);
    board.setInteractive();
    board.on('pointerdown', function (pointer, board) {
      console.log('clicked');
    });
    setTimeout(() => {
      board.moveChess(gameObj, 0, 2, 2);
    }, 2000);
    console.log('CHESS', chess);
  }
}
