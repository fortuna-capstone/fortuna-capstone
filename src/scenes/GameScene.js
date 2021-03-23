import 'phaser';

import firebase from 'firebase/app';
import 'firebase/database';

import io from 'socket.io-client';

import MyBoard from '../objects/MyBoard';

export default class GameScene extends Phaser.Scene {
  constructor(scene) {
    super('Game');
  }

  preload() {
    // load images
  }

  create() {
    this.socket = io();
    console.log(this.socket);
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
    const board = new MyBoard(this);

    //   let gameObj = this.add.circle(0, 0, 10, 0x000000);
    //   board.addChess(gameObj, 0, 4, 2);

    //   gameObj.monopoly = this.rexBoard.add.monopoly(gameObj, {
    //     face: 3,
    //     pathTileZ: 0,
    //     costCallback: function (curTileXY, preTileXY, monopoly) {
    //       const board = monopoly.board;
    //       return board
    //         .tileXYZToChess(curTileXY.x, curTileXY.y, 0)
    //         .getData('cost');
    //     },
    //   });

    //   gameObj.moveTo = this.rexBoard.add.moveTo(gameObj);

    //   const path = gameObj.monopoly.getPath(20);

    //   const moveAlongPath = (path) => {
    //     if (!path.length) {
    //       return;
    //     }
    //     let tile = path.shift();
    //     gameObj.moveTo.moveTo(tile);
    //     if (!tile.cost) {
    //       return;
    //     }
    //     gameObj.moveTo.once(
    //       'complete',
    //       () => {
    //         moveAlongPath(path);
    //       },
    //       gameObj
    //     );
    //     gameObj.monopoly.setFace(gameObj.moveTo.destinationDirection);
    //     return gameObj;
    //   };

    //   moveAlongPath(path);
  }
}
