import 'phaser';

import MessageBox from '../objects/MessageBox';

export default class InstructionsScene extends Phaser.Scene {
  constructor(scene) {
    super('Instructions');
  }

  preload() {
    this.load.image('messageBox', 'assets/message_box.png');
    this.load.image('blueButton1', 'assets/blue_button02.png');
  }

  create() {
    // this.messageBox = new MessageBox(this, 0, 0, 'messageBox', 'blueButton1');
    // this.scene.add.text(0, 0, 'WHAT"S HEREEEE', {
    //   fontSize: '32px',
    //   fill: '#fff',
    // });
    this.text = new MessageBox();
  }
}
