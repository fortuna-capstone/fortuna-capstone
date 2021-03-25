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
  }
  create() {
    this.gameButton = new Button(
      this,
      phaserConfig.width / 2,
      phaserConfig.height / 2 - 100,
      'blueButton1',
      'blueButton2',
      'Play',
      'Game'
    );
  }
}
