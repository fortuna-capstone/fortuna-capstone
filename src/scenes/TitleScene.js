import 'phaser';
import Button from '../objects/Button';
import phaserConfig from '../config/phaserConfig';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }
  preload() {
    this.load.image('blueButton1', 'assets/blue_button02.png');
    this.load.image('blueButton2', 'assets/blue_button03.png');
    this.load.image('titleScene', 'assets/titleScene.png');
  }
  create() {
    this.add.image(400, 300, 'titleScene').setScale(4);

    this.gameButton = new Button(
      this,
      phaserConfig.width / 2 - 100,
      phaserConfig.height / 2,
      'blueButton1',
      'blueButton2',
      'Play',
      () => this.scene.start('Game')
    );
    this.instructionButton = new Button(
      this,
      phaserConfig.width / 2 + 100,
      phaserConfig.height / 2,
      'blueButton1',
      'blueButton2',
      'Info',
      () => this.scene.start('Instructions')
    );
  }
}
