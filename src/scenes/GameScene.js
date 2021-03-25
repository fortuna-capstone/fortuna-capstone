import 'phaser';

import firebase from 'firebase/app';
import 'firebase/database';

import Dice from '../objects/Dice';
import config from '../config/config';

import io from 'socket.io-client';

import MyBoard from '../objects/MyBoard';
import ChessPiece from '../objects/ChessPiece';
import tilemap from '../objects/tilemap';

let tile;
let counter;

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
    const board = new MyBoard(this);

    // CREATING BOARD
    // const board = new MyBoard(this);
    this.board = new MyBoard(this);
    this.socket = io();
    if (this.socket.lifeTiles === undefined) {
      this.socket.lifeTiles = [];
      this.socket.career = {};
      this.socket.salary = {};
      this.socket.home = {};
      this.socket.bank = 500;
      this.socket.roll = 0;
      this.socket.gamePiece = new ChessPiece(this.board, {
        x: 0,
        y: 4,
      });
    }

    //     this.board.addChess(this.socket.gamePiece);
    //     console.log('BOARD', this.board);

    // const path = this.socket.gamePiece.monopoly.getPath(20);
    // this.socket.gamePiece.moveAlongPath(path);
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

    this.gameDice = new Dice(
      this,
      config.width - 50,
      config.height - 50,
      'blueButton1',
      'blueButton2',
      'Spin!'
    ).setScale(0.5);
  }

  movePiece() {
    const path = this.socket.gamePiece.monopoly.getPath(this.socket.roll);
    let updatedPath = [];
    for (let i = 0; i < path.length; i++) {
      let currentTileCost = path[i].cost;
      updatedPath.push(path[i]);
      if (currentTileCost === 0) {
        break;
      }
    }
    this.socket.gamePiece.moveAlongPath(updatedPath);

    // return this.getCurrentTile(updatedCoords);
  }

  update() {
    if (this.socket.roll !== 0) {
      counter = this.socket.roll;
      // this.getCurrentTile();
      this.movePiece();
      this.socket.roll = 0;
    }
    if (this.currentTile !== tile) {
      tile = this.currentTile;
      counter--;
      if (!counter || !tile.cost) {
        let activeTile = tilemap[tile.y][tile.x];
        alert(activeTile.description);
        let action = activeTile.operation;
        action(this.scene);
        console.log('AFTER', this.socket);
      }
    }
  }
}
