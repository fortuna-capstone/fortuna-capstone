import 'phaser';

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
import HouseDecision from '../objects/HouseDecision';

import { calculateWinner } from '../objects/operations';

let tile;
let counter;
let board;
let playerInfo;
let camera;
let turn;

let playing = true;

let playerTwoInfo;
let playerThreeInfo;

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
    let scene = this;

    // CREATING BOARD
    this.board = new MyBoard(this);
    this.socket = io();
    this.otherPlayersBody = [];
    this.dataArrays = {};

    this.otherPlayers = this.add.group();
    this.socket.on('currentPlayers', function (players) {
      Object.keys(players).forEach(function (id) {
        if (players[id].playerId === scene.socket.id) {
          addPlayer(scene, players[id]);
        } else {
          addOtherPlayers(scene, players[id]);
        }
      });
    });
    this.socket.on('newPlayer', function (playerInfo) {
      addOtherPlayers(scene, playerInfo);
    });
    this.socket.on('turnStarted', function (turnCounter) {
      turn = turnCounter;
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
    this.socket.on('gotPlayer', function (playerInfo) {
      scene.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.playerInfo = playerInfo;
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
    this.socket.on('playerRetired', function (playerInfo) {
      scene.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.playerInfo.retired = true;
          otherPlayer.playerInfo.retirement = playerInfo.retirement;
        }
      });
    });
    this.socket.on('salaryOptions', function (salaryOptions) {
      scene.dataArrays.salaryArray = salaryOptions;
    });
    this.socket.on('careerOptions', function (careerOptions) {
      scene.dataArrays.careerArray = careerOptions;
    });
    this.socket.on('tileOptions', function (tileOptions) {
      scene.dataArrays.tileArray = tileOptions;
    });
    this.socket.on('houseOptions', function (houseOptions) {
      scene.dataArrays.houseArray = houseOptions;
    
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
    )
      .setScale(0.5)
      .setScrollFactor(0);

    camera = this.cameras.main.setBounds(0, 0, 8000, 360);

    this.currentTurn = 0;
  }

  movePiece() {
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
    // if (this.messageBox) {
    //   this.gameDice.button.disableInteractive();
    // } else {
    //   this.gameDice.button.setInteractive();
    // }
 
    
    if (this.socket.roll !== 0) {
      counter = this.socket.roll;

      this.movePiece();
      this.socket.roll = 0;
    }

    if (this.otherPlayers.getChildren()[0]) {
      let player = this.otherPlayers.getChildren()[0];
      playerTwoInfo.text.setText(
        `bank account: ${player.playerInfo.bankAccount} \ncareer: ${
          player.playerInfo.career.description
            ? player.playerInfo.career.description
            : 'unemployed'
        } \nsalary: ${
          player.playerInfo.salary.amount
            ? player.playerInfo.salary.amount
            : 'No income'
        } \nlife tiles: ${player.playerInfo.lifeTiles.length}`
      );
    }
    if (this.otherPlayers.getChildren()[1]) {
      let player = this.otherPlayers.getChildren()[1];
      playerThreeInfo.text.setText(
        `bank account: ${player.playerInfo.bankAccount} \ncareer: ${
          player.playerInfo.career.description
            ? player.playerInfo.career.description
            : 'unemployed'
        } \nsalary: ${
          player.playerInfo.salary.amount
            ? player.playerInfo.salary.amount
            : 'No income'
        } \nlife tiles: ${player.playerInfo.lifeTiles.length}`
      );
    }
    if (this.player) {
      console.log(this.player.turn)
    if(this.player.turn >3){
      this.scene.start('Waiting')
    }
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
      let house = this.player.house;
      let career = this.player.career;
      let lifeTiles = this.player.lifeTiles;
      let salary = this.player.salary;
     
      if (

        this.player.oldPlayer &&
        (bankAccount != this.player.oldPlayer.bankAccount ||
          career != this.player.oldPlayer.career ||
          house != this.player.oldPlayer.house ||
          lifeTiles.length != this.player.oldPlayer.lifeTiles.length ||
          salary != this.player.oldPlayer.salary)

      ) {
        this.socket.emit('updatePlayer', this.player, this.dataArrays);
      }
      this.player.oldPlayer = {
        bankAccount: this.player.bankAccount,
        career: this.player.career,
        house: this.player.house,
        lifeTiles: [...this.player.lifeTiles],
        salary: this.player.salary,
      };
      if (turn) {
        if (turn === this.player.turn && this.player.skip) {
          this.socket.emit('endTurn');
        }
        if (turn !== this.player.turn) {
          this.gameDice.button.disableInteractive();
        } else {
          this.gameDice.button.setInteractive();
        }
      }

      let retired = this.player.retired;
      if (retired && playing) {
        this.socket.emit('retire', this.player);
        playing = false;
      }
      let notRetired = this.otherPlayersBody.filter((item) => !item.retired);

      if (this.player.retired && !notRetired.length) {
        calculateWinner(this.scene);
      }
    }

    if (this.currentTile !== tile) {
      tile = this.currentTile;
      counter--;
      if (!counter || !tile.cost) {
        let activeTile = tilemap[tile.y][tile.x];

        let action = activeTile.operation;

        if (tile.x === 11 && tile.y === 5) {
          this.messageBox = new HouseDecision(
            this,
            camera.midPoint,
            0,
            'messageBox',
            'blueButton1',
            'blueButton2',
            activeTile.description,
            (house) => action(this.scene, house)
          );
          this.socket.emit('endTurn');
        } else {
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
}
function addPlayer(scene, player) {
  if (!scene.player) {
    scene.player = player;
    scene.player.gamePiece = new ChessPiece(board, {
      x: 1,
      y: 5,
    });
    playerInfo = new PlayerInfo(scene, player, 20, 510);
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

  if (scene.otherPlayers.getChildren()[0] && !playerTwoInfo) {
    playerTwoInfo = new PlayerInfo(scene, playerInfo, 20, 20);
  }
  if (scene.otherPlayers.getChildren()[1] && !playerThreeInfo) {
    playerThreeInfo = new PlayerInfo(scene, playerInfo, 550, 20);
  }
}
