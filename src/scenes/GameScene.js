import 'phaser';

import firebase from 'firebase/app';
import 'firebase/database';
import Dice from '../objects/Dice';
import config from '../config/config';

import io from 'socket.io-client';

import MyBoard from '../objects/MyBoard';
import ChessPiece from '../objects/ChessPiece';

let tile;
let counter

export default class GameScene extends Phaser.Scene {
  constructor(scene) {
    super('Game');
    this.board = null;
  }

  preload() {
    // load images
    this.load.image('blueButton1', 'assets/blue_button02.png');
    this.load.image('blueButton2', 'assets/blue_button03.png');
  }

  create() {
    // CREATING BOARD
    // const board = new MyBoard(this);
    this.board = new MyBoard(this);
    this.socket = io();
    if (this.socket.lifeTiles === undefined) {
      this.socket.lifeTiles = [];
      this.socket.career = {};
      this.socket.salary = {};
      this.socket.home = {};
      this.socket.bank = 0;
      this.socket.roll = 0;
      this.socket.gamePiece = new ChessPiece(this.board, {
        x: 0,
        y: 4,
      });
    }
    this.board.addChess(this.socket.gamePiece);
    console.log('BOARD', this.board);

    // const path = this.socket.gamePiece.monopoly.getPath(20);
    // this.socket.gamePiece.moveAlongPath(path);

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

    this.gameDice = new Dice(
      this,
      config.width - 50,
      config.height - 50,
      'blueButton1',
      'blueButton2',
      'Spin!'
    ).setScale(0.5);
   
  }

  getCurrentTile(updatedCoords) {
    const curTile = this.board.chessToTileXYZ(updatedCoords);
    alert(
      this.board.tileXYZToChess(curTile.x, curTile.y, 0).data.list.description
    );
    return curTile;
  }

  movePiece() {
    const path = this.socket.gamePiece.monopoly.getPath(this.socket.roll);
    this.socket.gamePiece.moveAlongPath(path);

    // return this.getCurrentTile(updatedCoords);
  }

  update() {
    if (this.socket.roll !== 0) {
      counter = this.socket.roll
      // this.getCurrentTile();
      this.movePiece();
      this.socket.roll = 0;
    }
    if(this.currentTile !== tile ){
      tile = this.currentTile
      counter --
      if(counter ===0){
        console.log("in counter", tile)
        this.getCurrentTile(tile)
      }
    }
  }
 
}
