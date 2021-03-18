import 'phaser';

import firebase from 'firebase/app';
import 'firebase/database';

import config from '../config/config';
import Board from './Board';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images

    this.load.image('logo', 'src/assets/flowers.png');

    // const board = this.scene.scene.rexBoard.add.board(config);
  }

  create() {
    console.log('THIS IS THE GAME SCENE');
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

    // this.add.image(400, 300, 'logo');

    // const board = this.scene.scene.rexBoard.add.board({
    //   grid: {
    //     gridType: 'quadGrid',
    //     x: 0,
    //     y: 0,
    //     cellWidth: 10,
    //     cellHeight: 10,
    //     type: 'orthogonal', // 'orthogonal'|'isometric'
    //   },
    //   width: 100,
    //   height: 100,
    // });
    const board = new Board(this.scene.scene);
    // console.log('THIS IS THE CREATE BOARD BOARD', board);
  }
}
