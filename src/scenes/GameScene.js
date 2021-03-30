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
import PlayerInfo from '../objects/PlayerInfo';

let tile;
let counter;
let board;
let playerInfo;
let camera;
let turn;

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
    this.otherPlayersBody = [];

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

    this.socket.on('turnStarted', function (turnCounter) {
      console.log('TURN STARTED?', turnCounter);
      turn = turnCounter;
    });
    this.socket.on('playerLeft', function (playerId) {
      scene.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy();
          console.log(scene.otherPlayers);
        }
      });
    });

    this.socket.on('playerMoved', function (playerInfo) {
      scene.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.setPosition(playerInfo.x, playerInfo.y);
        }
      });
    });
    this.socket.on('gotPaid', function (playerInfo) {
      scene.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.playerInfo.bankAccount = playerInfo.bankAccount;
        }
      });
    });
    this.socket.on('gotCareer', function (playerInfo) {
      scene.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.playerInfo.career = playerInfo.career;
        }
      });
    });
    this.socket.on('gotHouse', function (playerInfo) {
      scene.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.playerInfo.house = playerInfo.house;
        }
      });
    });
    this.socket.on('gotLifeTiles', function (playerInfo) {
      scene.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.playerInfo.lifeTiles = playerInfo.lifeTiles;
        }
      });
    });
    this.socket.on('gotSalary', function (playerInfo) {
      scene.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.playerInfo.salary = playerInfo.salary;
        }
      });
    });

    // bootcamp or college
    this.messageBox = new DecisionBox(
      this,
      0,
      0,
      'messageBox',
      'blueButton1',
      'blueButton2',
      'Where do you want to start?',
      'Go to College',
      'Go to Bootcamp',
      2,
      4,
      (decision) => {
        this.player.gamePiece.monopoly.setFace(decision);
        this.socket.emit('startGame');
      }
    );
    this.gameDice = new Dice(
      this,
      phaserConfig.width - 50,
      phaserConfig.height - 50,
      'blueButton1',
      'blueButton2',
      'Spin!'
    ).setScale(0.5).setScrollFactor(0);


    camera = this.cameras.main.setBounds(0, 0, 8000, 360);

    this.currentTurn = 0;
  }

  movePiece() {
    console.log('SOCKET CLIENT SIDE', this.socket);
    console.log(this.player);
    if (this.player) {
      const path = this.player.gamePiece.monopoly.getPath(counter);
      let updatedPath = [];
      for (let i = 0; i < path.length; i++) {
        let currentTileCost = path[i].cost;
        updatedPath.push(path[i]);
        if (currentTileCost === 0) {
          break;
        }
      }
      this.player.gamePiece.moveAlongPath(updatedPath, this.scene, camera);
    }
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

      this.socket.on('startTurn', function (turnCounter, player = this.player) {
        console.log('TURNNNN', turnCounter);
        console.log('THISSS', this);
      });
    }

    if (this.player) {
      camera.startFollow(this.player.gamePiece);
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

      let bankAccount = this.player.bankAccount;
      if (
        this.player.oldBalance &&
        bankAccount != this.player.oldBalance.bankAccount
      ) {
        this.socket.emit('payday', { bankAccount: this.player.bankAccount });
      }
      this.player.oldBalance = {
        bankAccount: this.player.bankAccount,
      };
      let career = this.player.career;
      if (this.player.oldCareer && career != this.player.oldCareer.career) {
        this.socket.emit('career', { career: this.player.career });
      }
      this.player.oldCareer = {
        career: this.player.career,
      };
      let house = this.player.house;
      if (this.player.oldHouse && house != this.player.oldHouse.house) {
        this.socket.emit('house', { house: this.player.house });
      }
      this.player.oldHouse = {
        house: this.player.house,
      };
      let lifeTiles = this.player.lifeTiles;
      if (
        this.player.oldLifeTiles &&
        lifeTiles != this.player.oldLifeTiles.lifeTiles
      ) {
        this.socket.emit('lifeTiles', { lifeTiles: this.player.lifeTiles });
      }
      this.player.oldLifeTiles = {
        lifeTiles: this.player.lifeTiles,
      };
      let salary = this.player.salary;
      if (this.player.oldSalary && salary != this.player.oldSalary.salary) {
        this.socket.emit('salary', { salary: this.player.salary });
      }
      this.player.oldSalary = {
        salary: this.player.salary,
      };
      if (turn) {
        if (turn !== this.player.turn) {
          this.gameDice.button.disableInteractive();
        } else {
          this.gameDice.button.setInteractive();
        }
      }

      if (this.currentTile !== tile) {
        tile = this.currentTile;
        counter--;
        if (!counter || !tile.cost) {
          let activeTile = tilemap[tile.y][tile.x];


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
            this.socket.emit('endTurn');
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
            this.socket.emit('endTurn');
          }
          console.log('PLAYER', this);
        }

        let action = activeTile.operation;
        this.messageBox = new MessageBox(
          this,
          camera.midPoint,
          0,
          'messageBox',
          'blueButton1',
          'blueButton2',
          activeTile.description,
          () => action(this.scene)
        );
        this.socket.emit('endTurn');

      }
    }
  }
}

function addPlayer(scene, player) {
  if (!scene.player) {
    scene.player = player;
    scene.player.gamePiece = new ChessPiece(board, {
      x: 1,
      y: 5,
    });
    scene.player.isTurn++;
  }
}

function addOtherPlayers(scene, playerInfo) {
  let otherPlayerBody = playerInfo;
  const otherPlayer = scene.add
    .sprite(playerInfo.x, playerInfo.y, 'otherPlayer')
    .setScale(0.5);
  otherPlayer.playerId = playerInfo.playerId;
  otherPlayer.playerInfo = playerInfo;
  scene.otherPlayers.add(otherPlayer);
  scene.otherPlayersBody.push(otherPlayerBody);
}


// else if (this.player.isTurn === false) {
//   this.messageBox = new MessageBox(
//     this,
//     0,
//     0,
//     'messageBox',
//     'blueButton1',
//     'blueButton2',
//     'Please wait for your turn!'
//   );
// }


