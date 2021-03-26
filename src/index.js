import 'phaser';
import phaserConfig from './config/phaserConfig';
import GameScene from './scenes/GameScene';
import TitleScene from './scenes/TitleScene';

// import firebase from 'firebase/app';
// import firebaseConfig from './config/firebaseConfig';
// firebase.initializeApp(firebaseConfig);

// import db from './config/firebaseConfig';

class Game extends Phaser.Game {
  constructor() {
    super(phaserConfig);
    this.scene.add('Title', TitleScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Title');
  }
}

window.game = new Game(phaserConfig);
