import 'phaser';
import phaserConfig from './config/phaserConfig';
import GameScene from './scenes/GameScene';
import WaitingScene from './scenes/WaitingScene';
import TitleScene from './scenes/TitleScene';
import InstructionsScene from './scenes/InstructionsScene';

class Game extends Phaser.Game {
  constructor() {
    super(phaserConfig);
    this.scene.add('Instructions', InstructionsScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Waiting', WaitingScene);
    this.scene.start('Title');
  }
}

window.game = new Game(phaserConfig);
