import 'phaser';
import config from './config/config';
import GameScene from './scenes/GameScene';

import firebase from 'firebase/app';
import 'firebase/database';

import firebaseConfig from './config/firebaseConfig';
firebase.initializeApp(firebaseConfig);

// const dbRefObject = firebase.database().ref();
// dbRefObject.on('value', (snap) => console.log(snap.val()));

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Game', GameScene);
    this.scene.start('Game');
  }
}

window.game = new Game(config);
