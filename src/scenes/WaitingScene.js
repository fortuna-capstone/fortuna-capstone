import 'phaser';

export default class WaitingScene extends Phaser.Scene {
  constructor() {
    super('Waiting');
  }
  preload() {
    this.load.image('box', 'assets/waitingScene.png');
  }
  create() {
    this.add.image(400,300, 'box').setScale(4)
    
  }
}