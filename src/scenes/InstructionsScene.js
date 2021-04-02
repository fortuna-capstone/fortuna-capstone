import 'phaser';

import MessageBox from '../objects/MessageBox';

export default class InstructionsScene extends Phaser.Scene {
  constructor(scene) {
    super('Instructions');
  }

  preload() {
    this.load.image('messageBox', 'assets/message_box.png');
    this.load.image('blueButton1', 'assets/blue_button02.png');
    console.log('IS THIS WORKING');
  }

  create() {
    let scene = this;
    // let welcome = this.add.image(400, 300, 'box');

    let text = this.add
      .text(0, 0, 'WELCOME TO GAME OF LIFE: DEVELOPER EDITION!', {
        fontSize: '32px',
        fill: '#fff',
        wordWrap: { width: 220 },
        align: 'center',
      })
      .setDepth(6);

    Phaser.Display.Align.In.TopCenter(text);
    text.y = 210;
    console.log('IS THIS WORKING');
  }
}
