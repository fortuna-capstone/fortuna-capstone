import 'phaser';

import firebase from 'firebase/app';
import 'firebase/database';
import Dice from '../objects/Dice'
import config from '../config/config'

import io from 'socket.io-client';

import MyBoard from '../objects/MyBoard';
import ChessPiece from '../objects/ChessPiece';

export default class GameScene extends Phaser.Scene {
  constructor(scene) {
    super('Game');
  }

  preload() {
    // load images
    this.load.image('blueButton1', 'assets/blue_button02.png')
    this.load.image('blueButton2', 'assets/blue_button03.png')
  }

  create() {
    this.socket = io();
    if(this.socket.lifeTiles === undefined){
      this.socket.lifeTiles = []
      this.socket.career = {}
      this.socket.salary = {}
      this.socket.home = {}
      this.socket.bank = 0
      this.socket.roll = 0
    }
    console.log(this.socket)
    
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
    const chess = new ChessPiece(board, {
      x: 0,
      y: 4,
    });

    console.log('CHESS', chess)

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

      const path = chess.monopoly.getPath(20);
      chess.moveAlongPath(path)

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
    // const board = new Board(this, gridded);
    // let gameObj = this.add.circle(0, 0, 10, 0x000000);
    // let chess = board.addChess(gameObj, 0, 4, 2);
    // board.setInteractive();
    // board.on('pointerdown', function (pointer, board) {
    //   console.log('clicked');
    // });
    // setTimeout(() => {
    //   board.moveChess(gameObj, 0, 2, 2);
    // }, 2000);
    this.gameDice = new Dice(this, config.width-50, config.height-50, 'blueButton1', 'blueButton2', "Spin!").setScale(.5)

  }
  update(){
  } 
}
