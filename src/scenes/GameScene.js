import 'phaser';

import firebase from 'firebase/app';
import 'firebase/database';

import { Board, HexagonGrid, QuadGrid } from 'phaser3-rex-plugins/plugins/board-components.js';

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

    let gridded = {
      grid: {
          gridType: 'quadGrid',
          x: 50,
          y: 100,
          cellWidth: 20,
          cellHeight: 20,
          type: 'orthogonal',
          fillColor: '#000'
      },
      width: 200,
      height: 200
    }
    const board = new Board(this, gridded);
  

    this.rexBoard.add.board(gridded)
    
    this.rexBoard.add.shape(board, 1, 1, 1, 0xffc0cb)
    this.rexBoard.add.shape(board, 2, 2, 1, 0x3f51b5)
  }
}
