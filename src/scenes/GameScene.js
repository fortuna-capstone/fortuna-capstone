import 'phaser';

import firebase from 'firebase/app';
import 'firebase/database';

import Dice from '../objects/Dice';
import config from '../config/config';

import io from 'socket.io-client';

import MyBoard from '../objects/MyBoard';
import ChessPiece from '../objects/ChessPiece';
import tilemap from '../objects/tilemap';
import MessageBox from '../objects/MessageBox';
import DecisionBox from '../objects/DecisionBox';

let tile;
let counter;
let board

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
    this.load.image('otherPlayer', 'assets/grey_box.png')
  }

  create() {
    board = new MyBoard(this);
    var scene = this
    
    // CREATING BOARD
    // const board = new MyBoard(this);
    this.board = new MyBoard(this);
    this.socket = io();
    this.otherPlayersBody = []


    this.otherPlayers = this.add.group()
    this.socket.on('currentPlayers', function (players) {
      Object.keys(players).forEach(function (id) {
        if (players[id].playerId === scene.socket.id) {
          addPlayer(scene, players[id]);
        }else {
          addOtherPlayers(scene, players[id])
        }
      })
    })
    this.socket.on('newPlayer', function(playerInfo){
      console.log(playerInfo)
      addOtherPlayers(scene, playerInfo)
    })
    this.socket.on('playerLeft', function(playerId){
      scene.otherPlayers.getChildren().forEach(function(otherPlayer){
        if(playerId === otherPlayer.playerId){
          otherPlayer.destroy()
        }
      })
    })
    this.socket.on('playerMoved', function(playerInfo){
      scene.otherPlayers.getChildren().forEach(function(otherPlayer){
        if(playerInfo.playerId === otherPlayer.playerId){
          otherPlayer.setPosition(playerInfo.x, playerInfo.y)
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

    new DecisionBox(
      this,
      0,
      0,
      'messageBox',
      'blueButton1',
      'blueButton2',
      'Make a choice',
      (decision) => {
        this.player.gamePiece.monopoly.setFace(decision)
      }
    )


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
    if(this.player){
    const path = this.player.gamePiece.monopoly.getPath(this.socket.roll);
    let updatedPath = [];
    for (let i = 0; i < path.length; i++) {
      let currentTileCost = path[i].cost;
      updatedPath.push(path[i]);
      if (currentTileCost === 0) {
        break;
      }
    }
    this.player.gamePiece.moveAlongPath(updatedPath);
  }
    // return this.getCurrentTile(updatedCoords);
  }

  update() {
    if (this.socket.roll !== 0) {
      counter = this.socket.roll;
      console.log(this)
      this.movePiece();
      this.socket.roll = 0;
    }
    if(this.player){
    let x = this.player.gamePiece.x
    let y = this.player.gamePiece.y
    if (this.player.gamePiece.oldPosition && (x !== this.player.gamePiece.oldPosition.x || y !== this.player.gamePiece.oldPosition.y)) {
      this.socket.emit('playerMovement', { x: this.player.gamePiece.x, y: this.player.gamePiece.y});
    }
    this.player.gamePiece.oldPosition = {
      x : this.player.gamePiece.x,
      y: this.player.gamePiece.y
    }
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
        
        if (tile.x === 2 && tile.y === 2) {
          new MessageBox(
            this,
            0,
            0,
            'messageBox',
            'blueButton1',
            'blueButton2',
            'Choose a career'
          )
        } else {
          new MessageBox(
            this,
            0,
            0,
            'messageBox',
            'blueButton1',
            'blueButton2',
            activeTile.description
          )
        }
        let action = activeTile.operation
        action(this.scene)
      }
    }
}
}
function addPlayer(scene, player)  {
  if(!scene.player){
  scene.player = player
  scene.player.gamePiece = new ChessPiece(board, {
        x: 0,
        y: 4,
      },
      'messageBox',
      'blueButton1',
      'blueButton2'
  )};
}
function addOtherPlayers(scene, playerInfo){
  let otherPlayerBody = playerInfo
  const otherPlayer = scene.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setScale(.5)
  otherPlayer.playerId = playerInfo.playerId
  otherPlayer.playerInfo = playerInfo
  scene.otherPlayers.add(otherPlayer);
  scene.otherPlayersBody.push(otherPlayerBody)
}