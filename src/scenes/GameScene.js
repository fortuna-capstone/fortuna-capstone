import 'phaser';

import firebase from 'firebase/app';
import 'firebase/database';

import Dice from '../objects/Dice';
import phaserConfig from '../config/phaserConfig';

import io from 'socket.io-client';

import MyBoard from '../objects/MyBoard';
import ChessPiece from '../objects/ChessPiece';
import tilemap from '../objects/tilemap';
import MessageBox from '../objects/MessageBox';
import DecisionBox from '../objects/DecisionBox';
import { pickCareer } from '../objects/operations';
import PlayerInfo from '../objects/PlayerInfo';

let tile;
let counter;
let board;
let playerInfo;

export default class GameScene extends Phaser.Scene {
  constructor(scene) {
    super('Game');
    this.board = null;
  }

  preload() {
    // load images
    this.load.image('blueButton1', 'assets/blue_button02.png');
    this.load.image('blueButton2', 'assets/blue_button03.png');
    this.load.image('messageBox', 'assets/message_box.png');
    this.load.image('otherPlayer', 'assets/grey_box.png');
  }

  create() {
    board = new MyBoard(this);
    var scene = this;

    // CREATING BOARD
    // const board = new MyBoard(this);
    this.board = new MyBoard(this);
    this.socket = io();
    this.otherPlayersBody = []

    this.otherPlayers = this.add.group();
    this.socket.on('currentPlayers', function (players) {
      Object.keys(players).forEach(function (id) {
        if (players[id].playerId === scene.socket.id) {
          addPlayer(scene, players[id]);
        } else {
          addOtherPlayers(scene, players[id]);
        }

      });
      playerInfo = new PlayerInfo(scene, scene.player);
    });
    this.socket.on('newPlayer', function (playerInfo) {
      addOtherPlayers(scene, playerInfo);
    });
    this.socket.on('playerLeft', function (playerId) {
      scene.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy();

        }
      });
    });
    this.socket.on('playerMoved', function (playerInfo) {
      scene.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.setPosition(playerInfo.x, playerInfo.y);
        }

      })
    })
    this.socket.on('gotPaid', function(playerInfo){
      scene.otherPlayers.getChildren().forEach(function(otherPlayer){
        if(playerInfo.playerId === otherPlayer.playerId){
          console.log("otherplayer", otherPlayer)
          console.log("playerInfo", playerInfo)
          otherPlayer.playerInfo.bankAccount = playerInfo.bankAccount
        }
      })
    })

  

    // bootcamp or college
    this.messageBox = new DecisionBox(
      this,
      0,
      0,
      'messageBox',
      'blueButton1',
      'blueButton2',
      'College or Bootcamp?',
      'Go to College',
      'Go to Bootcamp',
      3,
      4,
      (decision) => {
        this.player.gamePiece.monopoly.setFace(decision);
      }
    );

    this.gameDice = new Dice(
      this,
      phaserConfig.width - 50,
      phaserConfig.height - 50,
      'blueButton1',
      'blueButton2',
      'Spin!'
    ).setScale(0.5);
  }

  movePiece() {
    console.log(this.player);
    if (this.player) {
      const path = this.player.gamePiece.monopoly.getPath(this.socket.roll);
      let updatedPath = [];
      for (let i = 0; i < path.length; i++) {
        let currentTileCost = path[i].cost;
        updatedPath.push(path[i]);
        if (currentTileCost === 0) {
          break;
        }
      }
      this.player.gamePiece.moveAlongPath(updatedPath, this.scene);
    }
    // return this.getCurrentTile(updatedCoords);
  }

  update() {
    if (this.messageBox) {
      this.gameDice.button.disableInteractive();
    } else {
      this.gameDice.button.setInteractive();
    }
    if (this.socket.roll !== 0) {
      counter = this.socket.roll;

      this.movePiece();
      this.socket.roll = 0;
    }
    if (this.player) {
      playerInfo.text.setText(
        `bank account: ${this.player.bankAccount} \ncareer: ${
          this.player.career.description
            ? this.player.career.description
            : 'unemployed'
        } \nsalary: ${
          this.player.salary.amount ? this.player.salary.amount : 'No income'
        } \nlife tiles: ${this.player.lifeTiles.length}`
      );
      let x = this.player.gamePiece.x;
      let y = this.player.gamePiece.y;
      if (
        this.player.gamePiece.oldPosition &&
        (x !== this.player.gamePiece.oldPosition.x ||
          y !== this.player.gamePiece.oldPosition.y)
      ) {
        this.socket.emit('playerMovement', {
          x: this.player.gamePiece.x,
          y: this.player.gamePiece.y,
        });
      }
      this.player.gamePiece.oldPosition = {
        x: this.player.gamePiece.x,
        y: this.player.gamePiece.y,
      };
    
    let bankAccount = this.player.bankAccount
    if(this.player.oldBalance &&(bankAccount !=this.player.oldBalance.bankAccount)){
      
      this.socket.emit('payday', {bankAccount: this.player.bankAccount})
      console.log(this.otherPlayers)
    }
    this.player.oldBalance = {
      bankAccount : this.player.bankAccount,
    }
  }

    if (this.currentTile !== tile) {
      tile = this.currentTile;
      counter--;
      if (!counter || !tile.cost) {

        let activeTile = tilemap[tile.y][tile.x]

        let action = activeTile.operation;
        // action(this.scene)

        if (tile.x === 2 && tile.y === 2) {
          this.messageBox = new MessageBox(
            this,
            0,
            0,
            'messageBox',
            'blueButton1',
            'blueButton2',
            'Choose a Career',
            () => action(this.scene)
          );
        } else {
          this.messageBox = new MessageBox(
            this,
            0,
            0,
            'messageBox',
            'blueButton1',
            'blueButton2',
            activeTile.description,
            () => action(this.scene)
          );
        }
        console.log('PLAYER', this.player);
      }
    }
  }
}
function addPlayer(scene, player) {
  if (!scene.player) {
    scene.player = player;
    scene.player.gamePiece = new ChessPiece(board, {
      x: 0,
      y: 4,
    });
  }
}

function addOtherPlayers(scene, playerInfo){
  let otherPlayerBody = playerInfo
  const otherPlayer = scene.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setScale(.5)
  otherPlayer.playerId = playerInfo.playerId
  otherPlayer.playerInfo = playerInfo
  scene.otherPlayers.add(otherPlayer);
  scene.otherPlayersBody.push(otherPlayerBody)
}
